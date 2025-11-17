# Vercel 部署配置指南

## 🎉 完整部署方案

现在前端和后端都可以部署到 Vercel 了！后端已转换为 Vercel Serverless Functions。

---

## 🚀 快速部署步骤

### 方法1：通过 Vercel CLI（推荐）

1. **安装 Vercel CLI**（如果还没安装）：
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**：
   ```bash
   vercel login
   ```

3. **在项目根目录部署**：
   ```bash
   vercel
   ```
   
   首次部署会提示：
   - 是否链接到现有项目？选择 `N`（创建新项目）
   - 项目名称：输入你的项目名称
   - 目录：直接回车（使用当前目录）
   - 覆盖设置：直接回车（使用默认配置）

4. **部署到生产环境**：
   ```bash
   vercel --prod
   ```

### 方法2：通过 GitHub 集成（推荐用于持续部署）

1. **将代码推送到 GitHub**：
   ```bash
   git add .
   git commit -m "准备部署到 Vercel"
   git push origin main
   ```

2. **在 Vercel 网站部署**：
   - 访问 https://vercel.com
   - 点击 "Add New Project"
   - 导入你的 GitHub 仓库
   - Vercel 会自动检测配置（`vercel.json`）
   - 点击 "Deploy"

---

## 📁 项目结构

部署后的项目结构：
```
/
├── api/                    # Serverless Functions
│   ├── posts.js           # GET /api/posts
│   ├── posts/
│   │   └── [id].js        # GET /api/posts/:id
│   ├── track.js           # POST /api/track
│   ├── data.js            # GET /api/data
│   └── utils/
│       └── data.js        # 数据工具函数
├── frontend/              # 前端代码
│   ├── src/
│   └── dist/              # 构建输出
├── backend/
│   └── data/              # 数据文件（posts.json, actions.json）
├── vercel.json            # Vercel 配置
└── package.json
```

---

## ⚙️ 配置说明

### vercel.json 配置

```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

- **buildCommand**: 构建前端项目
- **outputDirectory**: 前端构建输出目录
- **rewrites**: SPA 路由重写规则

### API 路由

所有 API 路由都在 `api/` 目录下：
- `/api/posts` → `api/posts.js`
- `/api/posts/:id` → `api/posts/[id].js`
- `/api/track` → `api/track.js`
- `/api/data` → `api/data.js`

---

## 📝 数据存储说明

### 读取数据
- 优先从 `backend/data/` 目录读取初始数据
- 如果 `/tmp/` 目录有数据，也会读取（用于合并）

### 写入数据
- 所有写入操作都保存到 `/tmp/` 目录
- ⚠️ **注意**：Vercel Serverless Functions 是无状态的，`/tmp/` 目录的数据在函数执行结束后可能会被清除
- 如果需要持久化存储，建议使用：
  - Vercel KV（Redis）
  - Vercel Postgres
  - 或其他外部数据库

---

## 🔧 环境变量（可选）

如果前端需要自定义 API 地址，可以设置：

1. **在 Vercel 项目设置中添加环境变量**：
   - Key: `VITE_API_URL`
   - Value: `/api`（默认值，使用相对路径）
   - Environment: Production, Preview, Development

2. **如果使用外部 API**：
   - Value: `https://your-api-domain.com/api`

---

## ✅ 验证部署

部署完成后：

1. **访问你的 Vercel 部署地址**（例如：`https://your-project.vercel.app`）

2. **测试功能**：
   - ✅ 查看帖子列表
   - ✅ 点击帖子查看详情
   - ✅ 点赞、收藏帖子
   - ✅ 查看数据统计页面

3. **检查 API**：
   - 访问 `https://your-project.vercel.app/api/posts` 应该返回帖子列表
   - 访问 `https://your-project.vercel.app/api/data` 应该返回用户行为数据

---

## 🔄 更新部署

### 通过 CLI
```bash
vercel --prod
```

### 通过 GitHub
- 推送代码到 GitHub
- Vercel 会自动触发重新部署

---

## 🆘 常见问题

### 问题1：API 返回 404

**解决方案**：
- 检查 `api/` 目录下的文件是否正确
- 确保文件导出默认函数：`export default async function handler(req, res)`
- 检查 Vercel 部署日志

### 问题2：数据写入后丢失

**原因**：Vercel Serverless Functions 是无状态的，`/tmp/` 目录数据不会持久化。

**解决方案**：
- 使用 Vercel KV 或 Postgres 进行持久化存储
- 或使用外部数据库服务

### 问题3：CORS 错误

**解决方案**：所有 API 函数都已设置 CORS 头，允许所有来源。如果还有问题，检查浏览器控制台错误信息。

### 问题4：构建失败

**解决方案**：
- 检查 `frontend/package.json` 中的构建脚本
- 确保所有依赖都已安装
- 查看 Vercel 构建日志

### 问题5：路由404（前端路由）

**解决方案**：`vercel.json` 中的 `rewrites` 配置应该已经处理了 SPA 路由。如果还有问题，检查配置是否正确。

---

## 📊 监控和日志

- **部署日志**：在 Vercel 项目页面查看
- **函数日志**：在 Vercel 项目 → Functions 页面查看
- **实时日志**：使用 `vercel logs` 命令

---

## 🔐 安全建议

1. **API 限流**：考虑添加 API 限流保护
2. **数据验证**：确保所有输入都经过验证
3. **错误处理**：不要在生产环境暴露敏感错误信息

---

## 📞 需要帮助？

- Vercel 文档：https://vercel.com/docs
- Serverless Functions：https://vercel.com/docs/functions
- 项目设置：在 Vercel 控制台查看

---

## 🎯 下一步

如果需要持久化存储，可以考虑：

1. **使用 Vercel KV**（Redis）：
   ```bash
   vercel kv create
   ```

2. **使用 Vercel Postgres**：
   ```bash
   vercel postgres create
   ```

3. **迁移数据到数据库**：
   - 修改 `api/utils/data.js` 使用数据库而不是文件系统
   - 更新所有 API 函数以使用新的数据存储方式
