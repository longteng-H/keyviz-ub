use std::collections::HashMap;
use std::time::Instant;

use serde::Deserialize;
use tauri::{image::Image, include_image, Emitter, Wry};
use tauri_plugin_store::StoreExt;

/// Keys that have been pressed for longer than this are considered stale
/// (release event was likely missed by the input hook).
const KEY_STALE_TIMEOUT_MS: u128 = 1000;

pub struct PressedKeyTracker {
    /// key_name -> press timestamp
    timestamps: HashMap<String, Instant>,
}

impl PressedKeyTracker {
    pub fn new() -> Self {
        Self {
            timestamps: HashMap::new(),
        }
    }

    pub fn record_press(&mut self, key_name: &str) {
        self.timestamps.insert(key_name.to_string(), Instant::now());
    }

    pub fn record_release(&mut self, key_name: &str) {
        self.timestamps.remove(key_name);
    }

    /// Returns keys that have been pressed longer than KEY_STALE_TIMEOUT_MS
    /// without a release event (likely missed by the hook).
    pub fn drain_stale(&mut self) -> Vec<String> {
        let now = Instant::now();
        let stale_keys: Vec<String> = self
            .timestamps
            .iter()
            .filter(|(_, pressed_at)| {
                now.duration_since(**pressed_at).as_millis() > KEY_STALE_TIMEOUT_MS
            })
            .map(|(k, _)| k.clone())
            .collect();

        for key in &stale_keys {
            self.timestamps.remove(key);
        }

        stale_keys
    }

    pub fn clear(&mut self) {
        self.timestamps.clear();
    }
}

pub struct AppState {
    pub listening: bool,
    pub pressed_keys: Vec<String>,
    pub key_tracker: PressedKeyTracker,
    pub toggle_shortcut: Vec<String>,
    pub language: String,

    pub monitor_name: Option<String>,
    pub monitor_scale: f64,
    pub monitor_position: (i32, i32),
}

impl Default for AppState {
    fn default() -> Self {
        Self {
            listening: true,
            pressed_keys: vec![],
            key_tracker: PressedKeyTracker::new(),
            toggle_shortcut: vec!["ShiftLeft".to_string(), "F10".to_string()],
            language: "en".to_string(),
            monitor_name: None,
            monitor_scale: 1.0,
            monitor_position: (0, 0),
        }
    }
}

impl AppState {
    pub fn new(app: &tauri::AppHandle) -> Self {
        let mut toggle_shortcut = vec!["ShiftLeft".to_string(), "F10".to_string()];
        let mut language = "en".to_string();

        // load saved config from store
        if let Ok(store) = app.store("store.json") {
            if let Some(value) = store.get("key_event_store") {
                // the value comes in as a String: "{\"state\": ...}"
                if let Some(json_str) = value.as_str() {
                    // parse the inner string
                    match serde_json::from_str::<KeyEventStore>(json_str) {
                        Ok(parsed) => {
                            toggle_shortcut = parsed.state.toggle_shortcut;
                        }
                        Err(e) => eprintln!("Failed to parse inner config JSON: {}", e),
                    }
                }
            }
            // load language preference
            if let Some(lang_value) = store.get("language") {
                if let Some(lang_str) = lang_value.as_str() {
                    language = lang_str.to_string();
                }
            }
        }

        Self {
            listening: true,
            pressed_keys: vec![],
            key_tracker: PressedKeyTracker::new(),
            toggle_shortcut,
            language,
            monitor_name: None,
            monitor_scale: 1.0,
            monitor_position: (0, 0),
        }
    }

    pub fn set_language(&mut self, lang: String) {
        self.language = lang;
    }

    pub fn save_language(&self, app: &tauri::AppHandle, lang: &str) {
        if let Ok(store) = app.store("store.json") {
            store.set("language", lang);
            let _ = store.save();
        }
    }

    pub fn get_tray_text(&self, key: &str) -> String {
        let text = match (key, self.language.as_str()) {
            ("stop", "zh-CN") => "停止",
            ("start", "zh-CN") => "开始",
            ("settings", "zh-CN") => "设置",
            ("quit", "zh-CN") => "退出",
            ("stop", _) => "Stop",
            ("start", _) => "Start",
            ("settings", _) => "Settings",
            ("quit", _) => "Quit",
            _ => key,
        };
        text.to_string()
    }

    pub fn toggle_listener(&mut self, app: &tauri::AppHandle, toggle: &tauri::menu::MenuItem<Wry>) {
        self.listening = !self.listening;

        if self.listening {
            eprintln!("🟢 Listening enabled");
            toggle.set_text(self.get_tray_text("stop")).unwrap();
            app.tray_by_id("keyviz-tray")
                .unwrap()
                .set_icon(Some(Image::from(include_image!("icons/tray.png"))))
                .unwrap();
        } else {
            eprintln!("🔴 Listening disabled");
            toggle.set_text(self.get_tray_text("start")).unwrap();
            app.tray_by_id("keyviz-tray")
                .unwrap()
                .set_icon(Some(Image::from(include_image!("icons/tray-disabled.png"))))
                .unwrap();
        }

        app.emit_to("main", "listening-toggle", self.listening)
            .unwrap();
    }
}

#[derive(Debug, Deserialize)]
struct KeyEventStore {
    pub state: KeyEventState,
    // pub version: u32,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct KeyEventState {
    // pub drag_threshold: u32,
    // pub filter_hotkeys: bool,
    // pub ignore_modifiers: Vec<String>,
    // pub show_event_history: bool,
    // pub max_history: u32,
    // pub linger_duration_ms: u32,
    // pub show_mouse_events: bool,
    pub toggle_shortcut: Vec<String>,
}
