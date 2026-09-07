# Keyviz-UB

> Based on [Keyviz](https://github.com/mulaRahul/keyviz) v2.1.1

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Tauri](https://img.shields.io/badge/Tauri-v2-blue.svg)](https://v2.tauri.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)

**[English](#english) | [中文](#中文)**

---

<details open id="english">
<summary><h2>English</h2></summary>

### Disclaimer

This project is modified and extended from [mulaRahul/keyviz](https://github.com/mulaRahul/keyviz) (GPL-3.0 License). All original code copyrights belong to Rahul Mula and its contributors.

### Modifications

1. **Rust toggle shortcut key name fix** (`state.rs`) — Default key changed from `"Shift"` to `"ShiftLeft"` to match TypeScript side.

2. **tick() race condition fix** (`key_event.ts`) — Fixed stale snapshot causing keys to linger when `onKeyRelease` fires during `tick()`.

3. **Replace mode re-render fix** (`key_event.ts`) — `push()` now creates new array references so Zustand detects changes.

4. **onMouseMove mutation fix** (`key_event.ts`) — Spread operator used to avoid direct array mutation.

5. **scroll linger consistency fix** (`key_event.ts`) — Unified to use `get()` for live state reads.

### Additions

1. **Full i18n** — English + Simplified Chinese via `react-i18next`, including settings UI and Rust tray menu.

2. **Key zoom/offset** — CSS `transform` based scale and offset controls for key overlay.

3. **Key style settings UI** — Scale, offsetX, offsetY adjustment controls.

### Optimizations

1. **Atomic event processing** — Single Mutex lock in Rust event handler.

2. **Order-insensitive toggle** — Sorted shortcut comparison.

3. **Localized key names** — `getKeyDisplayData()` function for i18n support.

4. **Error handling** — `emit().unwrap()` replaced with `let _ = emit()`.

### Version Info

| Item | Value |
|------|-------|
| Product | Keyviz-UB |
| Version | v0.0.1 |
| Based on | Keyviz v2.1.1 |
| License | GPL-3.0 |
| Stack | Tauri v2 + React 19 + TypeScript + Vite |

### Build

```bash
npm install
npm run tauri dev    # Development
npm run tauri build  # Production
```

Build artifacts: `src-tauri/target/release/bundle/`

### Credits

- Upstream: [mulaRahul/keyviz](https://github.com/mulaRahul/keyviz)
- Author: [Rahul Mula](https://github.com/mulaRahul)

</details>

---

<details id="zh">
<summary><h2>中文</h2></summary>

### 声明

本项目基于 [mulaRahul/keyviz](https://github.com/mulaRahul/keyviz)（GPL-3.0 许可证）进行修改和扩展。上游项目的所有原始代码版权归 Rahul Mula 及其贡献者所有。

### 修改项

1. **Rust 侧 Toggle 快捷键 Key Name 修复** (`state.rs`) — 默认值从 `"Shift"` 改为 `"ShiftLeft"`，与 TypeScript 侧保持一致。

2. **tick() 竞态条件修复** (`key_event.ts`) — 修复 `onKeyRelease` 在 `tick()` 执行期间触发时，过期快照导致按键延迟消失的问题。

3. **Replace 模式 re-render 修复** (`key_event.ts`) — `push()` 现在创建新数组引用，使 Zustand 能检测到变化。

4. **onMouseMove 变异修复** (`key_event.ts`) — 使用 spread 避免直接变异数组。

5. **scroll linger 一致性修复** (`key_event.ts`) — 统一使用 `get()` 读取最新状态。

### 新增项

1. **完整国际化** — 使用 `react-i18next` 支持英文和简体中文，包括设置界面和 Rust 托盘菜单。

2. **按键缩放/偏移** — 基于 CSS `transform` 的按键显示区域缩放和偏移控制。

3. **按键样式设置 UI** — 缩放比例、X 偏移、Y 偏移调节控件。

### 优化项

1. **事件处理原子性** — Rust 侧单次 Mutex 锁获取。

2. **Toggle 快捷键顺序无关** — 排序后比较。

3. **按键名称国际化** — `getKeyDisplayData()` 函数支持本地化。

4. **错误处理** — `emit().unwrap()` 改为 `let _ = emit()`。

### 版本信息

| 项目 | 值 |
|------|-----|
| 产品名称 | Keyviz-UB |
| 版本 | v0.0.1 |
| 基于 | Keyviz v2.1.1 |
| 许可证 | GPL-3.0 |
| 技术栈 | Tauri v2 + React 19 + TypeScript + Vite |

### 构建

```bash
npm install
npm run tauri dev    # 开发模式
npm run tauri build  # 生产构建
```

构建产物位于 `src-tauri/target/release/bundle/`

### 致谢

- 原始项目：[mulaRahul/keyviz](https://github.com/mulaRahul/keyviz)
- 原作者：[Rahul Mula](https://github.com/mulaRahul)

</details>
