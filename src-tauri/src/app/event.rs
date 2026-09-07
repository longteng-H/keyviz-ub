use std::{sync::Mutex, thread};

use rdev::{listen, Button, EventType};
use serde::Serialize;
use tauri::{menu::MenuItem, AppHandle, Emitter, Manager, Wry};

use crate::app::state::AppState;

#[derive(Debug, Clone, Serialize)]
#[serde(tag = "type")]
pub enum InputEvent {
    KeyEvent { pressed: bool, name: String },
    MouseButtonEvent { pressed: bool, button: MouseButton },
    MouseMoveEvent { x: f64, y: f64 },
    MouseWheelEvent { delta_x: i64, delta_y: i64 },
}

#[derive(Debug, Clone, Serialize)]
pub enum MouseButton {
    Left,
    Right,
    Middle,
    Other,
}

pub fn map_mouse_button(button: Button) -> MouseButton {
    match button {
        Button::Left => MouseButton::Left,
        Button::Right => MouseButton::Right,
        Button::Middle => MouseButton::Middle,
        _ => MouseButton::Other,
    }
}

/// Emit synthetic key release events for keys that have been pressed too long.
/// This handles cases where an external app captures the keyboard and rdev
/// misses the KeyRelease events.
fn emit_stale_releases(app_handle: &AppHandle, stale_keys: Vec<String>) {
    for key_name in &stale_keys {
        let _ = app_handle.emit_to(
            "main",
            "input-event",
            InputEvent::KeyEvent {
                pressed: false,
                name: key_name.clone(),
            },
        );
    }
}

pub fn start_listener(app_handle: AppHandle, toggle_menu_item: MenuItem<Wry>) {
    thread::spawn(move || {
        eprintln!("Starting global input listener...");

        if let Err(err) = listen(move |event| {
            // ───────────── Single lock acquisition for atomicity ─────────────
            let state = app_handle.state::<Mutex<AppState>>();
            let mut app_state = state.lock().unwrap();

            // ───────────── Step 1: Stale key cleanup ─────────────
            let stale_keys = app_state.key_tracker.drain_stale();
            if !stale_keys.is_empty() {
                for stale_key in &stale_keys {
                    app_state.pressed_keys.retain(|k| k != stale_key);
                }
                if app_state.listening {
                    let stale_for_emit = stale_keys.clone();
                    drop(app_state);
                    emit_stale_releases(&app_handle, stale_for_emit);
                    app_state = state.lock().unwrap();
                }
            }

            // ───────────── Step 2: Normal event processing ─────────────
            // track pressed keys
            if let EventType::KeyPress(key) = event.event_type {
                let key_name = format!("{:?}", key);
                // If the name contains parenthesis (like "RawKey(123)", "Unknown()"), ignore it.
                if key_name.contains('(') {
                    return;
                }
                // if key is already marked as pressed, ignore repeat
                if app_state.pressed_keys.contains(&key_name) {
                    return;
                }
                // record key as pressed with timestamp
                app_state.pressed_keys.push(key_name.clone());
                app_state.key_tracker.record_press(&key_name);
                // check if toggle shortcut is pressed (order-insensitive)
                let mut sorted_pressed = app_state.pressed_keys.clone();
                let mut sorted_shortcut = app_state.toggle_shortcut.clone();
                sorted_pressed.sort();
                sorted_shortcut.sort();
                if sorted_pressed == sorted_shortcut {
                    app_state.toggle_listener(&app_handle, &toggle_menu_item);

                    if !app_state.listening {
                        // emit key releases for all pressed keys
                        let pressed_keys: Vec<String> = app_state.pressed_keys.clone();
                        app_state.key_tracker.clear();
                        app_state.pressed_keys.clear();
                        drop(app_state);
                        for key_name in &pressed_keys {
                            let _ = app_handle.emit_to(
                                "main",
                                "input-event",
                                InputEvent::KeyEvent {
                                    pressed: false,
                                    name: key_name.clone(),
                                },
                            );
                        }
                        return;
                    }
                }
            } else if let EventType::KeyRelease(key) = event.event_type {
                let key_name = format!("{:?}", key);
                if key_name.contains('(') {
                    return;
                }
                // remove key from pressed keys
                app_state.pressed_keys.retain(|k| k != &key_name);
                app_state.key_tracker.record_release(&key_name);
            }

            // emit event if listening
            if !app_state.listening {
                return;
            }
            let input_event = match event.event_type {
                EventType::KeyPress(key) => Some(InputEvent::KeyEvent {
                    pressed: true,
                    name: format!("{:?}", key),
                }),
                EventType::KeyRelease(key) => Some(InputEvent::KeyEvent {
                    pressed: false,
                    name: format!("{:?}", key),
                }),
                EventType::ButtonPress(button) => Some(InputEvent::MouseButtonEvent {
                    pressed: true,
                    button: map_mouse_button(button),
                }),
                EventType::ButtonRelease(button) => Some(InputEvent::MouseButtonEvent {
                    button: map_mouse_button(button),
                    pressed: false,
                }),
                EventType::MouseMove { x, y } => {
                    // Convert Physical -> Logical
                    #[cfg(target_os = "macos")]
                    let (logical_x, logical_y) = (
                        x - app_state.monitor_position.0 as f64,
                        y - app_state.monitor_position.1 as f64,
                    );

                    #[cfg(not(target_os = "macos"))]
                    let (logical_x, logical_y) = {
                        let (offset_x, offset_y) = app_state.monitor_position;
                        (x - offset_x as f64, y - offset_y as f64)
                    };

                    Some(InputEvent::MouseMoveEvent {
                        x: logical_x,
                        y: logical_y,
                    })
                }
                EventType::Wheel { delta_x, delta_y } => {
                    Some(InputEvent::MouseWheelEvent { delta_x, delta_y })
                }
            };

            drop(app_state); // Release lock before emitting
            let _ = app_handle.emit("input-event", input_event);
        }) {
            eprintln!("rdev listen failed: {:?}", err);
        }
    });
}
