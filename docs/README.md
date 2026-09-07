# Keyviz-UB

> **基于 [Keyviz](https://github.com/mulaRahul/keyviz) v2.1.1 的修改版本**
>
> **A modified version based on [Keyviz](https://github.com/mulaRahul/keyviz) v2.1.1**

---

## 声明 / Disclaimer

本项目基于 [mulaRahul/keyviz](https://github.com/mulaRahul/keyviz)（GPL-3.0 许可证）进行修改和扩展。上游项目的所有原始代码版权归 Rahul Mula 及其贡献者所有。

This project is modified and extended from [mulaRahul/keyviz](https://github.com/mulaRahul/keyviz) (GPL-3.0 License). All original code copyrights belong to Rahul Mula and its contributors.

我们对上游项目的修改、新增和优化项如下：

The following sections describe our modifications, additions, and optimizations to the upstream project.

---

## 修改项 / Modifications

### 1. Rust 侧 Toggle 快捷键 Key Name 修复
**文件**: `src-tauri/src/app/state.rs`

上游 Rust 代码中 `toggle_shortcut` 默认值为 `["Shift", "F10"]`，而 TypeScript 侧使用 `["ShiftLeft", "F10"]`，导致首次安装时快捷键切换功能可能失效。已修复为一致的 `"ShiftLeft"`。

The upstream Rust code used `"Shift"` as the default toggle shortcut key name, while the TypeScript side uses `"ShiftLeft"`, causing the toggle shortcut to potentially fail on first install. Fixed to use consistent `"ShiftLeft"`.

### 2. 按键显示竞态条件修复
**文件**: `src/stores/key_event.ts` - `tick()` 函数

`tick()` 在过滤按键时使用了快照 `state.pressedKeys`，但如果 `onKeyRelease` 在 `tick()` 执行期间被处理，会使用过期的快照导致按键延迟消失。修复为每次过滤时重新读取最新的 `pressedKeys`。

The `tick()` function used a snapshot `state.pressedKeys` when filtering keys, but if `onKeyRelease` was processed during `tick()` execution, the stale snapshot would cause keys to linger longer than expected. Fixed to re-read the latest `pressedKeys` on each filter evaluation.

### 3. Replace 模式按键不触发 Re-render 修复
**文件**: `src/stores/key_event.ts` - `onKeyPress()` 函数

Replace 模式下 `groups[last].keys.push(key)` 直接变异数组，Zustand 检测不到变化导致 React 不 re-render，按键不显示。修复为创建新数组引用。

In replace mode, `groups[last].keys.push(key)` directly mutated the array, which Zustand couldn't detect, preventing React from re-rendering and causing keys to not display. Fixed to create new array references.

### 4. onMouseMove 直接变异修复
**文件**: `src/stores/key_event.ts` - `onMouseMove()` 函数

`groups[last].keys = groups[last].keys.filter(...)` 直接变异了 keys 数组。修复为使用 spread 创建新对象。

`groups[last].keys = groups[last].keys.filter(...)` directly mutated the keys array. Fixed to create a new object using spread.

### 5. tick() scroll linger 一致性修复
**文件**: `src/stores/key_event.ts` - `tick()` 函数

scroll linger 部分使用快照 `state.pressedKeys`，而 key linger 使用 `get().pressedKeys`（实时值），行为不一致。统一为使用 `get()` 读取最新状态。

The scroll linger section used a snapshot `state.pressedKeys` while the key linger section used `get().pressedKeys` (live value), causing inconsistent behavior. Unified to use `get()` for reading the latest state.

---

## 新增项 / Additions

### 1. 国际化 (i18n)
**目录**: `src/i18n/`

- 使用 `react-i18next` 实现完整国际化
- 支持语言：英文 (en)、简体中文 (zh-CN)
- 命名空间：`common`、`settings`、`keys`
- 语言切换组件：`LanguageToggle`
- 设置界面全部翻译
- Rust 侧托盘菜单本地化

Full internationalization using `react-i18next`. Supports English and Simplified Chinese. Includes settings UI translation and Rust tray menu localization.

### 2. 按键缩放/偏移功能
**文件**: `src/lib/key-style.ts`, `src/components/key-overlay.tsx`

新增 CSS `transform: translate(offsetX, offsetY) scale(scale)` 方式实现的按键显示区域缩放和偏移控制，不影响现有组件样式。

Added key overlay zoom and offset control using CSS `transform: translate(offsetX, offsetY) scale(scale)`, without affecting existing component styles.

### 3. 按键样式缩放设置
**文件**: `src/components/keycap.tsx`

在设置界面中新增按键缩放比例 (scale)、X 偏移 (offsetX)、Y 偏移 (offsetY) 的调节控件。

Added UI controls for key scale, offsetX, and offsetY settings in the settings panel.

---

## 优化项 / Optimizations

### 1. Rust 侧事件处理原子性优化
**文件**: `src-tauri/src/app/event.rs`

将 Rust 侧的两个独立 Mutex lock acquisition 合并为单次锁获取，确保事件处理的原子性。

Merged two separate Mutex lock acquisitions into a single lock acquisition for atomic event processing.

### 2. Toggle 快捷键比较优化
**文件**: `src-tauri/src/app/event.rs`

Toggle 快捷键比较改为排序后比较（order-insensitive），避免因按键顺序不同导致匹配失败。

Toggle shortcut comparison changed to sorted comparison (order-insensitive) to prevent matching failures due to different key orderings.

### 3. 按键显示名称 i18n 支持
**文件**: `src/lib/keymaps.ts`

新增 `getKeyDisplayData()` 函数，支持按键显示名称的国际化本地化，替代直接访问 `keymaps` 对象。

Added `getKeyDisplayData()` function for localized key display names, replacing direct access to the `keymaps` object.

### 4. 错误处理改进
**文件**: `src-tauri/src/app/event.rs`

将 `app_handle.emit().unwrap()` 改为 `let _ = app_handle.emit()`，避免 emit 失败时 panic。

Changed `app_handle.emit().unwrap()` to `let _ = app_handle.emit()` to prevent panics on emit failure.

---

## 版本信息 / Version Info

| 项目 | 值 |
|------|-----|
| 产品名称 | Keyviz-UB |
| 版本 | v0.0.1 |
| 基于 | Keyviz v2.1.1 |
| 上游仓库 | https://github.com/mulaRahul/keyviz |
| 许可证 | GPL-3.0 |
| 技术栈 | Tauri v2 (Rust) + React 19 + TypeScript + Vite |

---

## 构建 / Build

### 环境要求 / Requirements

- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://www.rust-lang.org/tools/install) (stable)
- [Tauri CLI](https://v2.tauri.app/start/prerequisites/)

### 构建步骤 / Build Steps

```bash
# 安装依赖
npm install

# 开发模式
npm run tauri dev

# 生产构建
npm run tauri build
```

### Windows 构建注意事项 / Windows Build Notes

Rust 需要安装在非默认路径时，需要设置环境变量：

When Rust is installed at a non-default path, set environment variables:

```powershell
$env:RUSTUP_HOME="D:\Rust\rustup"
$env:CARGO_HOME="D:\Rust\cargo"
$env:PATH="D:\Rust\cargo\bin;D:\Rust\rustup\bin;" + $env:PATH
$env:HTTP_PROXY=""
$env:HTTPS_PROXY=""
```

构建产物位于 `src-tauri/target/release/bundle/`。

Build artifacts are located at `src-tauri/target/release/bundle/`.

---

## 致谢 / Credits

- 原始项目：[mulaRahul/keyviz](https://github.com/mulaRahul/keyviz)
- 原作者：[Rahul Mula](https://github.com/mulaRahul)
- 许可证：GPL-3.0
