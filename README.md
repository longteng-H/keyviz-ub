<p align="center">
  <img src="public/logo.svg" alt="Keyviz-UB" width="120">
</p>

<h1 align="center">keyviz-UserBuild</h1>

<p align="center">
  <strong>基于 <a href="https://github.com/mulaRahul/keyviz">Keyviz</a> v2.1.1 的用户更新版本</strong>
</p>

<p align="center">
  <a href="#中文">中文</a> · <a href="#english">English</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.0.1-blue?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/license-GPL--3.0-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/tauri-v2-orange?style=flat-square" alt="Tauri">
  <img src="https://img.shields.io/badge/react-19-61DAFB?style=flat-square" alt="React">
  <img src="https://img.shields.io/badge/platform-Windows-lightgrey?style=flat-square" alt="Platform">
</p>

---

## 中文

> **声明：** 本项目为 **keyviz-UserBuild**（用户更新版），基于 [mulaRahul/keyviz](https://github.com/mulaRahul/keyviz)（GPL-3.0 许可证）进行修改和扩展。上游项目的所有原始代码版权归 Rahul Mula 及其贡献者所有。

### ✨ 新增功能

| 功能 | 说明 |
|------|------|
| 🌐 **完整国际化** | 支持英文/简体中文，包括设置界面和系统托盘菜单 |
| 🔍 **按键缩放/偏移** | 支持按键显示区域的缩放和位置微调 |
| ⚙️ **缩放设置 UI** | 设置界面中可调节缩放比例和偏移量 |

### 🐛 修复项

| 问题 | 修复 |
|------|------|
| Toggle 快捷键失效 | Rust/TS 侧 Key Name 不一致 (`Shift` → `ShiftLeft`) |
| 按键延迟消失 | `tick()` 竞态条件使用过期快照 |
| Replace 模式不显示 | `push()` 未创建新引用，Zustand 无法检测 |
| 鼠标移动异常 | 直接变异数组，改用 spread |
| Scroll linger 不一致 | 统一使用 `get()` 读取实时状态 |

### 🚀 优化项

- Rust 侧事件处理原子化（单次 Mutex 锁）
- Toggle 快捷键比较改为排序后比较（顺序无关）
- 按键显示名称支持国际化
- 错误处理改进（避免 emit panic）

### 📦 版本信息

| 项目 | 值 |
|------|-----|
| 产品名称 | keyviz-UserBuild |
| 版本 | v0.0.1 |
| 基于 | Keyviz v2.1.1 |
| 技术栈 | Tauri v2 + React 19 + TypeScript + Vite |

### 🔧 构建

```bash
# 安装依赖
npm install

# 开发模式
npm run tauri dev

# 生产构建
npm run tauri build
```

构建产物位于 `src-tauri/target/release/bundle/`

### 🙏 致谢

- 原始项目：[mulaRahul/keyviz](https://github.com/mulaRahul/keyviz)
- 原作者：[Rahul Mula](https://github.com/mulaRahul)
- 许可证：[GPL-3.0](LICENSE)

---

## English

> **Disclaimer:** This is **keyviz-UserBuild** — a user-updated version based on [mulaRahul/keyviz](https://github.com/mulaRahul/keyviz) (GPL-3.0 License). All original code copyrights belong to Rahul Mula and its contributors.

### ✨ Additions

| Feature | Description |
|---------|-------------|
| 🌐 **Full i18n** | English + Simplified Chinese, including settings UI and system tray |
| 🔍 **Key Zoom/Offset** | Scale and offset controls for key overlay |
| ⚙️ **Scale Settings UI** | Adjust scale, offsetX, offsetY in settings panel |

### 🐛 Bug Fixes

| Issue | Fix |
|-------|-----|
| Toggle shortcut not working | Rust/TS key name mismatch (`Shift` → `ShiftLeft`) |
| Keys linger too long | `tick()` stale snapshot race condition |
| Replace mode not displaying | `push()` missing new reference for Zustand |
| Mouse move glitch | Direct array mutation, fixed with spread |
| Scroll linger inconsistent | Unified to use `get()` for live state |

### 🚀 Optimizations

- Atomic event processing (single Mutex lock in Rust)
- Order-insensitive toggle shortcut comparison
- Localized key display names
- Improved error handling (no more emit panics)

### 📦 Version Info

| Item | Value |
|------|-------|
| Product | keyviz-UserBuild |
| Version | v0.0.1 |
| Based on | Keyviz v2.1.1 |
| Stack | Tauri v2 + React 19 + TypeScript + Vite |

### 🔧 Build

```bash
npm install
npm run tauri dev    # Development
npm run tauri build  # Production
```

Build artifacts: `src-tauri/target/release/bundle/`

### 🙏 Credits

- Upstream: [mulaRahul/keyviz](https://github.com/mulaRahul/keyviz)
- Author: [Rahul Mula](https://github.com/mulaRahul)
- License: [GPL-3.0](LICENSE)
