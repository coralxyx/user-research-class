# 小红书模拟平台

一个模拟小红书界面的平台，可以收集和分析用户行为数据（点击、点赞、收藏等）。

## 功能特性

- 🎨 **模拟小红书界面**：精美的UI设计，还原小红书的使用体验
- 📊 **数据收集**：自动记录用户的点击、点赞、收藏行为
- 📈 **数据分析**：查看用户行为统计和操作顺序
- 💾 **数据导出**：支持导出JSON和CSV格式的数据

## 技术栈

- **前端**：React + TypeScript + Vite
- **后端**：Node.js + Express
- **数据存储**：JSON文件

## 安装和运行

### 1. 安装依赖

```bash
npm run install:all
```

### 2. 启动开发服务器

```bash
npm run dev
```

这将同时启动前端（http://localhost:3000）和后端（http://localhost:3001）服务器。

### 3. 单独启动

如果需要单独启动：

**前端：**
```bash
npm run dev:frontend
```

**后端：**
```bash
npm run dev:backend
```

## 项目结构

```
assg/
├── frontend/          # 前端代码
│   ├── src/
│   │   ├── components/    # React组件
│   │   ├── pages/         # 页面组件
│   │   ├── services/      # API服务
│   │   └── types/         # TypeScript类型定义
│   └── package.json
├── backend/           # 后端代码
│   ├── server.js      # Express服务器
│   ├── data/          # 数据存储目录
│   └── package.json
└── package.json       # 根配置文件
```

## 数据收集

系统会自动收集以下用户行为数据：

1. **点击行为**：用户点击帖子的记录
2. **点赞行为**：用户点赞帖子的记录
3. **收藏行为**：用户收藏帖子的记录
4. **操作顺序**：记录用户操作的先后顺序

所有数据存储在 `backend/data/actions.json` 文件中。

## 数据查看

访问 http://localhost:3000/data 可以查看所有用户的行为数据，包括：

- 用户列表和统计信息
- 每个用户的详细操作记录
- 点击顺序分析
- 数据导出功能（JSON/CSV）

## 开发说明

- 用户ID会自动生成并存储在浏览器的localStorage中
- 每次操作都会实时记录到后端
- 数据文件会在首次运行时自动创建

"# user-research-class" 
