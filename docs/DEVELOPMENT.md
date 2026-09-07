# 开发文档 / Development Guide

> 本文档定义 Keyviz-UB 项目的开发规范、架构说明和修改记录。
>
> This document defines the development standards, architecture, and modification log for the Keyviz-UB project.

---

## 项目架构 / Project Architecture

```
keyviz-2.1.1/
├── src-tauri/                  # Rust 后端 (Tauri v2)
│   ├── src/
│   │   ├── app/
│   │   │   ├── event.rs        # 全局输入监听、事件发射
│   │   │   └── state.rs        # AppState、快捷键、托盘菜单
│   │   ├── lib.rs              # Tauri 入口、窗口管理
│   │   └── main.rs             # 程序入口
│   ├── tauri.conf.json         # Tauri 配置
│   └── Cargo.toml              # Rust 依赖
├── src/                        # React 前端
│   ├── stores/
│   │   ├── key_event.ts        # 按键事件状态管理 (Zustand)
│   │   ├── key_style.ts        # 按键样式状态管理
│   │   ├── sync.ts             # 跨窗口状态同步
│   │   └── storage.ts          # Tauri 持久化存储适配
│   ├── components/
│   │   ├── key-overlay.tsx     # 按键覆盖层渲染
│   │   ├── keycaps/            # 各风格按键组件
│   │   └── settings/           # 设置界面组件
│   ├── pages/
│   │   ├── visualization.tsx   # 主可视化页面
│   │   └── settings.tsx        # 设置页面
│   ├── types/
│   │   └── event.ts            # TypeScript 类型定义
│   ├── lib/
│   │   ├── keymaps.ts          # 按键名称映射、i18n
│   │   └── key-style.ts        # 样式计算
│   └── i18n/                   # 国际化语言包
├── docs/                       # 项目文档
│   ├── README.md               # 项目说明（双语）
│   └── DEVELOPMENT.md          # 开发文档（本文件）
└── package.json                # Node.js 依赖
```

---

## 数据流 / Data Flow

```
OS Input → rdev (Rust) → Tauri Event → TypeScript Store → React Render
                │                                    │
                ├── pressed_keys (Vec<String>)       ├── pressedKeys (string[])
                ├── key_tracker (HashMap)            ├── groups (KeyGroup[])
                └── toggle_shortcut                  └── settings (persisted)
```

### 核心组件交互 / Core Component Interaction

1. **Rust 后端** (`event.rs`): 通过 `rdev::listen()` 捕获全局键盘/鼠标事件
2. **Tauri 事件桥**: 通过 `app_handle.emit("input-event", ...)` 发送到前端
3. **Zustand Store** (`key_event.ts`): 处理按键逻辑，维护 `groups` 渲染状态
4. **React 渲染** (`key-overlay.tsx`): 使用 `AnimatePresence` 渲染按键组

---

## 开发规范 / Development Standards

### 1. 状态管理 / State Management

**Zustand 不可变更新模式：**

```typescript
// ✅ 正确：创建新引用
groups[last] = { ...groups[last], keys: [...groups[last].keys, key] };

// ❌ 错误：直接变异（Zustand 检测不到变化）
groups[last].keys.push(key);
```

**规则：**
- 数组更新必须创建新数组
- 对象更新必须创建新对象
- 使用 `get()` 读取最新状态（避免快照竞态）
- `tick()` 等定时函数中，每次 filter 都应重新 `get()` 读取 `pressedKeys`

### 2. 命名约定 / Naming Conventions

| 类型 | 约定 | 示例 |
|------|------|------|
| TypeScript 接口 | PascalCase | `KeyEventState`, `KeyGroup` |
| TypeScript 类型 | PascalCase | `EventPayload`, `RawKeyEvent` |
| Zustand Store | camelCase | `useKeyEvent`, `useKeyStyle` |
| Rust 结构体 | PascalCase | `AppState`, `PressedKeyTracker` |
| Rust 函数 | snake_case | `start_listener`, `emit_stale_releases` |
| CSS 类名 | Tailwind utility | `text-sm`, `font-semibold` |

### 3. Rust 侧编码规范 / Rust Standards

- 使用 `eprintln!` 输出调试信息（非 `println!`）
- 使用 `let _ = app_handle.emit(...)` 忽略 emit 结果（避免 panic）
- Mutex lock 范围尽量小，emit 前必须 `drop(app_state)`
- Toggle 快捷键比较使用排序后比较（order-insensitive）

### 4. TypeScript 侧编码规范 / TypeScript Standards

- 使用 `get()` 而非 `state` 引用读取最新状态（避免闭包捕获旧值）
- 避免直接变异数组/对象
- 事件处理函数命名以 `on` 开头：`onKeyPress`, `onKeyRelease`
- 设置 setter 命名以 `set` 开头：`setFilter`, `setLingerDurationMs`

### 5. 提交规范 / Commit Convention

```
<type>(<scope>): <subject>

type:
  feat     - 新功能
  fix      - 修复 bug
  refactor - 重构
  docs     - 文档
  style    - 样式/格式
  test     - 测试
  chore    - 构建/工具

scope:
  rust     - Rust 后端
  ts       - TypeScript 前端
  i18n     - 国际化
  ui       - 界面样式

示例 / Examples:
  fix(ts): 按键显示竞态条件修复
  feat(i18n): 新增简体中文支持
  refactor(rust): 合并 Mutex lock 提升原子性
```

---

## 已知问题 / Known Issues

| # | 问题 | 状态 | 说明 |
|---|------|------|------|
| 1 | History mode + Ctrl + Scroll | 已知 | `key_event.ts:331` 注释标记 |
| 2 | Date.now() 毫秒级 React key 冲突 | 低概率 | 极速连击时可能 <1ms 间隔 |

---

## 修改日志 / Changelog

### v0.0.1 (2026-09-07)

**修复 / Fixed:**
- Rust 侧 toggle shortcut key name 与 TypeScript 侧不一致
- `tick()` 中 `pressedKeys` 快照竞态导致按键偶尔不消失
- Replace 模式 `push()` 直接变异导致按键不显示
- `onMouseMove` 中 `groups[last].keys` 直接变异
- `tick()` scroll linger 与 key linger 状态读取不一致

**新增 / Added:**
- 完整国际化支持 (en, zh-CN)
- 按键缩放/偏移控制
- 设置窗口标题和版本显示更新

**优化 / Changed:**
- Rust 侧事件处理原子性（单次 Mutex lock）
- Toggle 快捷键排序比较
- 移除死代码和调试输出

---

## 构建命令速查 / Build Commands

```bash
# TypeScript 检查
npx tsc --noEmit

# 开发模式
npm run tauri dev

# 生产构建
npm run tauri build

# 仅构建前端
npm run build

# Windows 环境变量（Rust 非默认路径时）
$env:RUSTUP_HOME="D:\Rust\rustup"
$env:CARGO_HOME="D:\Rust\cargo"
$env:PATH="D:\Rust\cargo\bin;D:\Rust\rustup\bin;" + $env:PATH
$env:HTTP_PROXY=""
$env:HTTPS_PROXY=""
```

---

## 备份策略 / Backup Strategy

每次重大修改前创建备份，命名格式：

```
keyviz-backup-YYYYMMDD-HHMMSS
```

排除目录：`node_modules`, `target`, `dist`, `.next`

使用 `robocopy` 进行增量备份：

```powershell
$ts = Get-Date -Format "yyyyMMdd-HHmmss"
$dest = "F:\ai开发\keyiz\keyviz-backup-$ts"
robocopy "F:\ai开发\keyiz\keyviz-2.1.1" $dest /E /XD node_modules target .next dist src-tauri\target
```
