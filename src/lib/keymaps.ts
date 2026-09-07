import { platform } from "@tauri-apps/plugin-os";
import { MouseLeftClickIcon, MouseMiddleClickIcon, MouseRightClickIcon, MouseRightDragIcon, MouseScrollDownIcon, MouseScrollUpIcon, ReturnIcon } from "@/components/ui/icons";
import { ArrowBigUpDashIcon, ArrowBigUpIcon, ArrowDownIcon, ArrowDownToLineIcon, ArrowLeftIcon, ArrowLeftRightIcon, ArrowRightIcon, ArrowRightToLineIcon, ArrowUpIcon, ArrowUpToLineIcon, ChevronUpIcon, CircleArrowOutUpLeftIcon, CommandIcon, DeleteIcon, Grid2X2Icon, ImageIcon, LockIcon, LucideIcon, MouseIcon, MoveDownRightIcon, MoveUpLeftIcon, OptionIcon, PauseIcon, SpaceIcon, SparkleIcon, Volume2Icon, VolumeXIcon } from "lucide-react";
import i18n from "@/i18n";

// ───────────── Platform Logic ─────────────
const currentPlatform = platform();

interface SwitchPlatformConfig<T> {
    windows: T;
    macos: T;
    linux?: T;
}

function switchPlatform<T>(config: SwitchPlatformConfig<T>): T {
    if (currentPlatform === 'macos') {
        return config.macos;
    } else if (currentPlatform === 'linux' && config.linux !== undefined) {
        return config.linux!;
    }
    return config.windows;
}

// ───────────── Key mapping ─────────────
export interface DisplayData {
    // textual representation
    label: string;
    // label key for i18n
    labelKey?: string;
    // short label if any like ctrl for control
    shortLabel?: string;
    // short label key for i18n
    shortLabelKey?: string;
    // glyph representation if any like ⌃ for control
    glyph?: string;
    // secondary symbol if any like @ for digit 2
    symbol?: string;
    // icon path if can be represented with iconography
    icon?: LucideIcon;
    // category
    category?: "modifier" | "letter" | "digit" | "punctuation" | "function" | "arrow" | "navigation" | "special" | "numpad" | "mouse";
}

// We use the string names from the provided Rust enum as keys
export const keymaps: Record<string, DisplayData> = {
    // ───────────── Function keys ─────────────
    F1: { label: "F1", category: "function" },
    F2: { label: "F2", category: "function" },
    F3: { label: "F3", category: "function" },
    F4: { label: "F4", category: "function" },
    F5: { label: "F5", category: "function" },
    F6: { label: "F6", category: "function" },
    F7: { label: "F7", category: "function" },
    F8: { label: "F8", category: "function" },
    F9: { label: "F9", category: "function" },
    F10: { label: "F10", category: "function" },
    F11: { label: "F11", category: "function" },
    F12: { label: "F12", category: "function" },
    // ───────────── Navigation ─────────────
    PrintScreen: {
        label: "print screen",
        labelKey: "special.PrintScreen",
        shortLabel: "prt scrn",
        shortLabelKey: "shortLabel.PrintScreen",
        icon: ImageIcon,
    },
    Pause: {
        label: "pause break",
        labelKey: "special.Pause",
        shortLabel: "pause",
        shortLabelKey: "shortLabel.Pause",
        icon: PauseIcon,
    },
    Backspace: {
        label: switchPlatform({
            windows: "backspace",
            macos: "delete",
        }),
        labelKey: "special.Backspace",
        shortLabel: switchPlatform({
            windows: "back",
            macos: "del",
        }),
        shortLabelKey: "shortLabel.Backspace",
        glyph: "⌫",
        icon: DeleteIcon,
        category: "special",
    },
    Tab: {
        label: "tab",
        labelKey: "special.Tab",
        glyph: "⇆",
        icon: ArrowLeftRightIcon,
        category: "special",
    },
    Space: {
        label: "space",
        labelKey: "special.Space",
        glyph: "⎵",
        icon: SpaceIcon,
    },
    Return: {
        label: switchPlatform({
            windows: "enter",
            macos: "return",
        }),
        labelKey: "special.Return",
        glyph: "↩",
        icon: ReturnIcon,
        category: "special",
    },
    Apps: {
        label: "menu",
        labelKey: "special.Apps",
        glyph: "☰",
    },
    Insert: {
        label: "insert",
        labelKey: "special.Insert",
        shortLabel: "ins",
        shortLabelKey: "shortLabel.Insert",
        glyph: "⇥",
        icon: ArrowRightToLineIcon,
        category: "special",
    },
    Delete: {
        label: "delete",
        labelKey: "special.Delete",
        shortLabel: "del",
        shortLabelKey: "shortLabel.Delete",
        glyph: "⌦",
        icon: DeleteIcon,
        category: "special",
    },
    Home: {
        label: "home",
        labelKey: "special.Home",
        glyph: "⇱",
        icon: MoveUpLeftIcon,
        category: "navigation",
    },
    End: {
        label: "end",
        labelKey: "special.End",
        glyph: "⇲",
        icon: MoveDownRightIcon,
        category: "navigation",
    },
    PageUp: {
        label: "page up",
        labelKey: "special.PageUp",
        shortLabel: "pg up",
        shortLabelKey: "shortLabel.PageUp",
        glyph: "⤒",
        icon: ArrowUpToLineIcon,
        category: "navigation",
    },
    PageDown: {
        label: "page down",
        labelKey: "special.PageDown",
        shortLabel: "pg dn",
        shortLabelKey: "shortLabel.PageDown",
        glyph: "⤓",
        icon: ArrowDownToLineIcon,
        category: "navigation",
    },
    UpArrow: {
        label: "up",
        labelKey: "navigation.UpArrow",
        glyph: "↑",
        icon: ArrowUpIcon,
        category: "arrow",
    },
    DownArrow: {
        label: "down",
        labelKey: "navigation.DownArrow",
        glyph: "↓",
        icon: ArrowDownIcon,
        category: "arrow",
    },
    LeftArrow: {
        label: "left",
        labelKey: "navigation.LeftArrow",
        glyph: "←",
        icon: ArrowLeftIcon,
        category: "arrow",
    },
    RightArrow: {
        label: "right",
        labelKey: "navigation.RightArrow",
        glyph: "→",
        icon: ArrowRightIcon,
        category: "arrow",
    },
    CapsLock: {
        label: "caps lock",
        labelKey: "modifiers.CapsLock",
        glyph: "⇪",
        icon: ArrowBigUpDashIcon,
    },
    ScrollLock: {
        label: "scroll lock",
        labelKey: "locks.ScrollLock",
        glyph: "🖱",
        icon: MouseIcon,
    },
    NumLock: {
        label: "num lock",
        labelKey: "locks.NumLock",
        icon: LockIcon,
    },
    Escape: {
        label: "escape",
        labelKey: "special.Escape",
        shortLabel: "esc",
        shortLabelKey: "shortLabel.Escape",
        glyph: "⎋",
        icon: CircleArrowOutUpLeftIcon,
        category: "special",
    },

    // ───────────── Digits ──────────────
    Num1: {
        label: "1",
        symbol: "!",
        category: "digit",
    },
    Num2: {
        label: "2",
        symbol: "@",
        category: "digit",
    },
    Num3: {
        label: "3",
        symbol: "#",
        category: "digit",
    },
    Num4: {
        label: "4",
        symbol: "$",
        category: "digit",
    },
    Num5: {
        label: "5",
        symbol: "%",
        category: "digit",
    },
    Num6: {
        label: "6",
        symbol: "^",
        category: "digit",
    },
    Num7: {
        label: "7",
        symbol: "&",
        category: "digit",
    },
    Num8: {
        label: "8",
        symbol: "*",
        category: "digit",
    },
    Num9: {
        label: "9",
        symbol: "(",
        category: "digit",
    },
    Num0: {
        label: "0",
        symbol: ")",
        category: "digit",
    },
    // ───────────── Letters ─────────────
    KeyA: { label: "A", category: "letter" },
    KeyB: { label: "B", category: "letter" },
    KeyC: { label: "C", category: "letter" },
    KeyD: { label: "D", category: "letter" },
    KeyE: { label: "E", category: "letter" },
    KeyF: { label: "F", category: "letter" },
    KeyG: { label: "G", category: "letter" },
    KeyH: { label: "H", category: "letter" },
    KeyI: { label: "I", category: "letter" },
    KeyJ: { label: "J", category: "letter" },
    KeyK: { label: "K", category: "letter" },
    KeyL: { label: "L", category: "letter" },
    KeyM: { label: "M", category: "letter" },
    KeyN: { label: "N", category: "letter" },
    KeyO: { label: "O", category: "letter" },
    KeyP: { label: "P", category: "letter" },
    KeyQ: { label: "Q", category: "letter" },
    KeyR: { label: "R", category: "letter" },
    KeyS: { label: "S", category: "letter" },
    KeyT: { label: "T", category: "letter" },
    KeyU: { label: "U", category: "letter" },
    KeyV: { label: "V", category: "letter" },
    KeyW: { label: "W", category: "letter" },
    KeyX: { label: "X", category: "letter" },
    KeyY: { label: "Y", category: "letter" },
    KeyZ: { label: "Z", category: "letter" },
    // ───────────── Punctuation ─────────────
    BackQuote: {
        label: "`",
        symbol: "~",
        category: "punctuation",
    },
    Minus: {
        label: "-",
        symbol: "_",
        category: "punctuation",
    },
    Equal: {
        label: "=",
        symbol: "+",
        category: "punctuation",
    },
    LeftBracket: {
        label: "[",
        symbol: "{",
        category: "punctuation",
    },
    RightBracket: {
        label: "]",
        symbol: "}",
        category: "punctuation",
    },
    BackSlash: {
        label: "\\",
        symbol: "|",
        category: "punctuation",
    },
    SemiColon: {
        label: ";",
        symbol: ":",
        category: "punctuation",
    },
    Quote: {
        label: "'",
        symbol: "\"",
        category: "punctuation",
    },
    Comma: {
        label: ",",
        symbol: "<",
        category: "punctuation",
    },
    Dot: {
        label: ".",
        symbol: ">",
        category: "punctuation",
    },
    Slash: {
        label: "?",
        symbol: "/",
        category: "punctuation",
    },
    // ───────────── Numpad ─────────────
    KpDivide: { label: "/", category: "punctuation" },
    KpMultiply: { label: "*", category: "punctuation" },
    KpMinus: { label: "-", category: "punctuation" },
    KpPlus: { label: "+", category: "punctuation" },
    KpEqual: { label: "=", category: "punctuation" },
    KpComma: { label: ",", category: "punctuation" },
    KpReturn: {
        label: "Enter",
        glyph: "↩",
        category: "numpad",
    },
    KpDecimal: {
        label: ".",
        symbol: "del",
        category: "numpad",
    },
    Kp0: {
        label: "0",
        symbol: "ins",
        category: "numpad",
    },
    Kp1: {
        label: "1",
        symbol: "end",
        category: "numpad",
    },
    Kp2: {
        label: "2",
        symbol: "▼",
        category: "numpad",
    },
    Kp3: {
        label: "3",
        symbol: "pg dn",
        category: "numpad",
    },
    Kp4: {
        label: "4",
        symbol: "◀",
        category: "numpad",
    },
    Kp5: {
        label: "5",
        symbol: " ",
        category: "numpad",
    },
    Kp6: {
        label: "6",
        symbol: "▶",
        category: "numpad",
    },
    Kp7: {
        label: "7",
        symbol: "home",
        category: "numpad",
    },
    Kp8: {
        label: "8",
        symbol: "▲",
        category: "numpad",
    },
    Kp9: {
        label: "9",
        symbol: "pg up",
        category: "numpad",
    },
    // ───────────── Media ─────────────
    VolumeUp: {
        label: "volume up",
        labelKey: "media.VolumeUp",
        shortLabel: "vol +",
        shortLabelKey: "shortLabel.VolumeUp",
        icon: Volume2Icon,
    },
    VolumeDown: {
        label: "volume down",
        labelKey: "media.VolumeDown",
        shortLabel: "vol -",
        shortLabelKey: "shortLabel.VolumeDown",
        icon: Volume2Icon,
    },
    VolumeMute: {
        label: "mute",
        labelKey: "media.VolumeMute",
        icon: VolumeXIcon,
    },

    // ───────────── Mouse Events ─────────────
    Left: {
        label: "left click",
        labelKey: "mouse.Left",
        shortLabel: "left",
        shortLabelKey: "shortLabel.Left",
        icon: MouseLeftClickIcon,
        category: "mouse",
    },
    Middle: {
        label: "middle click",
        labelKey: "mouse.Middle",
        shortLabel: "middle",
        shortLabelKey: "shortLabel.Middle",
        icon: MouseMiddleClickIcon,
        category: "mouse",
    },
    Right: {
        label: "right click",
        labelKey: "mouse.Right",
        shortLabel: "right",
        shortLabelKey: "shortLabel.Right",
        icon: MouseRightClickIcon,
        category: "mouse",
    },
    Drag: {
        label: "drag",
        labelKey: "mouse.Drag",
        icon: MouseRightDragIcon,
        category: "mouse",
    },
    ScrollUp: {
        label: "scroll up",
        labelKey: "mouse.ScrollUp",
        shortLabel: "scroll",
        shortLabelKey: "shortLabel.ScrollUp",
        icon: MouseScrollUpIcon,
        category: "mouse",
    },
    ScrollDown: {
        label: "scroll down",
        labelKey: "mouse.ScrollDown",
        shortLabel: "scroll",
        shortLabelKey: "shortLabel.ScrollDown",
        icon: MouseScrollDownIcon,
        category: "mouse",
    },
};

// ───────────── Apply Mappings for Modifiers ─────────────

// Control
['ControlLeft', 'ControlRight'].forEach((key) => {
    keymaps[key] = {
        label: "control",
        labelKey: "modifiers.ControlLeft",
        shortLabel: "ctrl",
        shortLabelKey: "shortLabel.ControlLeft",
        glyph: "⌃",
        icon: ChevronUpIcon,
        category: "modifier",
    };
});

// Meta
['MetaLeft', 'MetaRight'].forEach((key) => {
    keymaps[key] = {
        ...switchPlatform({
            windows: {
                label: "win",
                labelKey: "modifiers.MetaLeft",
                glyph: "\u229E",
                icon: Grid2X2Icon,
                category: "modifier" as const,
            },
            macos: {
                label: "command",
                labelKey: "modifiers.MetaLeft",
                shortLabel: "cmd",
                shortLabelKey: "shortLabel.MetaLeft",
                glyph: "⌘",
                icon: CommandIcon,
                category: "modifier" as const,
            },
            linux: {
                label: "Meta",
                labelKey: "modifiers.MetaLeft",
                glyph: "✦",
                icon: SparkleIcon,
                category: "modifier" as const,
            },
        }),
    };
});

// Alt
['Alt'].forEach((key) => {
    keymaps[key] = {
        label: switchPlatform({
            windows: "alt",
            macos: "option",
        }),
        labelKey: "modifiers.Alt",
        shortLabel: switchPlatform({
            windows: "alt",
            macos: "opt",
        }),
        shortLabelKey: "shortLabel.Alt",
        glyph: "⌥",
        icon: OptionIcon,
        category: "modifier",
    };
});

// Shift
['ShiftLeft', 'ShiftRight'].forEach((key) => {
    keymaps[key] = {
        label: "shift",
        labelKey: "modifiers.ShiftLeft",
        shortLabel: "shift",
        shortLabelKey: "shortLabel.ShiftLeft",
        glyph: "⇧",
        icon: ArrowBigUpIcon,
        category: "modifier",
    };
});

// ───────────── Helper Functions ─────────────

/**
 * Get the localized label for a key
 */
export function getKeyLabel(keyName: string, useShortLabel: boolean = false): string {
    const keyData = keymaps[keyName];
    if (!keyData) return keyName;

    const t = i18n.getFixedT(null, 'keys');

    // Try to get localized label
    if (useShortLabel && keyData.shortLabelKey) {
        const translated = t(keyData.shortLabelKey);
        // If translation exists and is different from key, use it
        if (translated && translated !== keyData.shortLabelKey) {
            return translated;
        }
    }

    if (keyData.labelKey) {
        const translated = t(keyData.labelKey);
        // If translation exists and is different from key, use it
        if (translated && translated !== keyData.labelKey) {
            return translated;
        }
    }

    // Fallback to default label
    return useShortLabel ? (keyData.shortLabel ?? keyData.label) : keyData.label;
}

/**
 * Get the DisplayData with localized labels
 */
export function getKeyDisplayData(keyName: string): DisplayData {
    const keyData = keymaps[keyName];
    if (!keyData) {
        return { label: keyName };
    }

    return {
        ...keyData,
        label: getKeyLabel(keyName, false),
        shortLabel: getKeyLabel(keyName, true),
    };
}
