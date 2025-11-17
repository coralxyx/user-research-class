# 部署指南

本指南提供了多种部署前端应用的方法。

## 前置准备

### 1. 构建生产版本

首先，确保你已经构建了生产版本：

```bash
cd frontend
npm run build
```

构建完成后，`frontend/dist` 目录将包含所有静态文件。

### 2. 配置后端API地址

在生产环境中，你需要配置后端API的地址。有两种方式：

**方式一：使用环境变量（推荐）**

创建 `frontend/.env.production` 文件（已创建示例文件），设置你的后端API地址：

```env
VITE_API_URL=https://your-backend-domain.com/api
```

**方式二：修改代码**

如果后端和前端部署在同一域名下，可以保持默认配置。

---

## 部署选项

### 选项1：Vercel（推荐，最简单）

Vercel 是部署 React/Vite 应用的最佳选择之一。

#### 步骤：

1. **安装 Vercel CLI**（可选，也可以使用网页界面）：
   ```bash
   npm i -g vercel
   ```

2. **在项目根目录部署**：
   ```bash
   vercel
   ```
   
   或者指定前端目录：
   ```bash
   cd frontend
   vercel
   ```

3. **配置环境变量**：
   - 在 Vercel 项目设置中添加环境变量 `VITE_API_URL`
   - 设置为你的后端API地址，例如：`https://your-backend.com/api`

4. **配置构建设置**：
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `cd frontend && npm install`

#### 使用 GitHub 自动部署：

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量和构建设置
4. 每次推送代码会自动部署

---

### 选项2：Netlify

Netlify 也是一个很好的选择，提供免费托管。

#### 步骤：

1. **安装 Netlify CLI**（可选）：
   ```bash
   npm i -g netlify-cli
   ```

2. **部署**：
   ```bash
   cd frontend
   netlify deploy --prod
   ```

3. **配置**：
   - 在 Netlify 项目设置中配置环境变量 `VITE_API_URL`
   - 构建命令：`npm run build`
   - 发布目录：`dist`

#### 使用拖拽部署：

1. 访问 [Netlify](https://www.netlify.com)
2. 将 `frontend/dist` 目录拖拽到 Netlify 部署区域
3. 配置环境变量和重定向规则（参考 `netlify.toml`）

---

### 选项3：GitHub Pages

适合静态网站托管。

#### 步骤：

1. **安装 gh-pages**：
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **修改 package.json**，添加部署脚本：
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **配置 vite.config.ts**，添加 base 路径：
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/', // 替换为你的仓库名
     // ... 其他配置
   })
   ```

4. **部署**：
   ```bash
   npm run deploy
   ```

---

### 选项4：传统服务器（Nginx）

如果你有自己的服务器，可以使用 Nginx 部署。

#### 步骤：

1. **构建项目**：
   ```bash
   cd frontend
   npm run build
   ```

2. **上传 dist 目录**到服务器

3. **配置 Nginx**：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/frontend/dist;
       index index.html;

       # 前端路由支持
       location / {
           try_files $uri $uri/ /index.html;
       }

       # API代理（如果后端在同一服务器）
       location /api {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 后端部署

前端部署后，你还需要部署后端服务器。后端可以部署到：

- **Heroku**：免费层可用
- **Railway**：提供免费额度
- **Render**：免费托管
- **自己的服务器**：使用 PM2 或 Docker

### 后端部署示例（Render/Railway）：

1. 将后端代码推送到 GitHub
2. 在平台创建新服务
3. 设置启动命令：`cd backend && npm install && node server.js`
4. 配置环境变量和端口

---

## 注意事项

1. **CORS 配置**：确保后端允许前端域名的跨域请求
2. **环境变量**：生产环境必须设置正确的 `VITE_API_URL`
3. **HTTPS**：生产环境建议使用 HTTPS
4. **路由配置**：确保服务器配置了 SPA 路由重定向（所有路由指向 index.html）

---

## 快速开始（Vercel）

最简单的部署方式：

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署前端
cd frontend
vercel

# 4. 在 Vercel 控制台设置环境变量 VITE_API_URL
```

完成！你的应用将在几分钟内上线。

