# Vercel 部署配置指南

## ✅ 部署状态

前端已成功部署到 Vercel！

**部署地址：**
- 生产环境：https://frontend-n3x8wxub1-coralxyxs-projects.vercel.app
- 项目设置：https://vercel.com/coralxyxs-projects/frontend/settings

---

## 🔧 必须配置的步骤

### 1. 配置环境变量

前端需要知道后端API的地址。请按以下步骤配置：

1. **访问项目设置页面：**
   https://vercel.com/coralxyxs-projects/frontend/settings/environment-variables

2. **添加环境变量：**
   - **Key（变量名）**：`VITE_API_URL`
   - **Value（变量值）**：你的后端API地址
     - 如果后端还没部署，可以先设置为：`http://localhost:3001/api`（仅用于测试）
     - 如果后端已部署，设置为：`https://your-backend-domain.com/api`
   - **Environment（环境）**：选择 `Production`、`Preview` 和 `Development`（全选）

3. **保存后重新部署：**
   - 在 Vercel 控制台点击 "Redeploy" 按钮
   - 或者运行命令：`cd frontend && vercel --prod`

---

## 🚀 后端部署（如果还没部署）

前端需要后端API才能正常工作。你可以选择以下方式部署后端：

### 选项1：Railway（推荐，简单）

1. 访问 https://railway.app
2. 使用 GitHub 登录
3. 创建新项目 → 从 GitHub 仓库部署
4. 选择 `backend` 目录
5. 设置启动命令：`node server.js`
6. 配置端口：Railway 会自动分配，在代码中使用 `process.env.PORT || 3001`
7. 获取部署后的URL，例如：`https://your-app.railway.app`
8. 在 Vercel 中设置 `VITE_API_URL` 为：`https://your-app.railway.app/api`

### 选项2：Render

1. 访问 https://render.com
2. 创建新的 Web Service
3. 连接 GitHub 仓库
4. 设置：
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && node server.js`
5. 获取部署URL并配置环境变量

### 选项3：自己的服务器

如果你有自己的服务器，可以：
1. 使用 PM2 运行后端：`pm2 start backend/server.js`
2. 配置 Nginx 反向代理
3. 设置 `VITE_API_URL` 指向你的服务器地址

---

## 📝 更新后端代码以支持生产环境

如果使用 Railway/Render 等平台，需要修改后端代码以支持动态端口：

```javascript
// 在 backend/server.js 中
const PORT = process.env.PORT || 3001
```

---

## 🔄 重新部署

如果修改了环境变量或代码，需要重新部署：

```bash
cd frontend
vercel --prod
```

---

## ✅ 验证部署

1. 访问前端地址：https://frontend-n3x8wxub1-coralxyxs-projects.vercel.app
2. 检查浏览器控制台是否有API连接错误
3. 尝试点击帖子、点赞、收藏，看是否能正常记录数据

---

## 🆘 常见问题

### 问题1：API请求失败（CORS错误）

**解决方案：** 确保后端允许前端域名的跨域请求。在 `backend/server.js` 中：

```javascript
app.use(cors({
  origin: ['https://frontend-n3x8wxub1-coralxyxs-projects.vercel.app', 'http://localhost:3000']
}))
```

### 问题2：环境变量不生效

**解决方案：**
1. 确保环境变量名称是 `VITE_API_URL`（必须以 `VITE_` 开头）
2. 重新部署项目
3. 清除浏览器缓存

### 问题3：路由404错误

**解决方案：** Vercel 会自动处理 SPA 路由，如果还有问题，检查 `vercel.json` 配置

---

## 📞 需要帮助？

- Vercel 文档：https://vercel.com/docs
- 项目设置：https://vercel.com/coralxyxs-projects/frontend/settings

