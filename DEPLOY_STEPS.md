# 🚀 Vercel CLI 部署步骤（快速指南）

## 前置准备

### ✅ 1. 检查 .gitignore
已配置完成，确保以下内容不会被提交：
- `node_modules/`
- `.env` 文件
- `.vercel` 目录
- `backend/data/actions.json`（用户行为数据）

### ✅ 2. 确保代码已准备好
- [x] `vercel.json` 配置文件存在
- [x] `api/` 目录包含所有 serverless functions
- [x] `backend/data/posts.json` 存在（初始数据）

---

## 📤 步骤 1：推送到 GitHub（如果还没推送）

### 1.1 初始化 Git（如果还没有）

```bash
# 在项目根目录执行
git init
git add .
git commit -m "准备部署到 Vercel"
```

### 1.2 创建 GitHub 仓库并推送

```bash
# 在 GitHub 上创建新仓库后，执行：
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

> 💡 **提示**：如果已经推送到 GitHub，可以跳过这一步。

---

## 🚀 步骤 2：安装 Vercel CLI

```bash
# 全局安装 Vercel CLI
npm install -g vercel

# 验证安装
vercel --version
```

---

## 🔐 步骤 3：登录 Vercel

```bash
# 登录 Vercel（会在浏览器中打开登录页面）
vercel login
```

登录后，CLI 会保存你的认证信息。

---

## 🎯 步骤 4：部署到 Vercel

### 4.1 首次部署（预览环境）

在项目根目录执行：

```bash
vercel
```

**首次部署会提示以下问题，按以下方式回答：**

1. **Set up and deploy "C:\Users\coral\Desktop\assg"?** 
   → 输入 `Y` 或直接回车

2. **Which scope do you want to deploy to?**
   → 选择你的账户（使用方向键选择，回车确认）

3. **Link to existing project?**
   → 输入 `N`（创建新项目）

4. **What's your project's name?**
   → 输入项目名称，例如：`xiaohongshu-simulator`
   → 或直接回车使用默认名称

5. **In which directory is your code located?**
   → 直接回车（使用当前目录 `./`）

6. **Want to override the settings?**
   → 输入 `N`（使用 vercel.json 配置）

**部署完成后，你会看到：**
```
✅ Production: https://your-project.vercel.app
✅ Preview: https://your-project-xxx.vercel.app
```

### 4.2 部署到生产环境

```bash
# 部署到生产环境
vercel --prod
```

---

## ✅ 步骤 5：验证部署

### 5.1 测试前端

访问你的部署地址：
```
https://your-project.vercel.app
```

测试功能：
- ✅ 帖子列表显示
- ✅ 点击帖子查看详情
- ✅ 点赞功能
- ✅ 收藏功能

### 5.2 测试 API

在浏览器中访问以下 URL：

1. **获取所有帖子**：
   ```
   https://your-project.vercel.app/api/posts
   ```
   应该返回 JSON 格式的帖子列表

2. **获取单个帖子**：
   ```
   https://your-project.vercel.app/api/posts/1
   ```
   应该返回第一个帖子的详细信息

3. **获取用户行为数据**：
   ```
   https://your-project.vercel.app/api/data
   ```
   应该返回用户行为数据（初始可能为空数组）

---

## 🔄 更新部署

### 方法 1：通过 CLI 更新

```bash
# 1. 修改代码后
git add .
git commit -m "更新功能"
git push

# 2. 部署到 Vercel
vercel --prod
```

### 方法 2：连接 GitHub 自动部署（推荐）

1. 访问 https://vercel.com/dashboard
2. 点击你的项目
3. 进入 **Settings** → **Git**
4. 连接 GitHub 仓库
5. 启用自动部署

之后每次 `git push`，Vercel 会自动部署！

---

## 🛠️ 常用命令

```bash
# 查看部署列表
vercel ls

# 查看部署日志
vercel logs [deployment-url]

# 查看项目信息
vercel project ls

# 查看环境变量
vercel env ls

# 添加环境变量
vercel env add VITE_API_URL production
```

---

## ⚠️ 常见问题

### 问题 1：构建失败

**解决方案**：
```bash
# 本地测试构建
cd frontend
npm install
npm run build
```

如果本地构建成功，检查 Vercel 构建日志：
```bash
vercel logs [deployment-url]
```

### 问题 2：API 返回 404

**检查**：
- `api/` 目录下的文件是否正确
- 文件是否导出默认函数
- `vercel.json` 配置是否正确

### 问题 3：数据写入后丢失

**原因**：Vercel Serverless Functions 是无状态的，`/tmp` 目录数据不会持久化。

**解决方案**：如需持久化，使用 Vercel KV 或 Postgres。

---

## 📝 下一步

部署成功后，你可以：

1. **自定义域名**：
   ```bash
   vercel domains add your-domain.com
   ```

2. **设置环境变量**（如果需要）：
   - 在 Vercel 控制台 → Settings → Environment Variables
   - 或使用 CLI：`vercel env add VITE_API_URL production`

3. **配置持续部署**：
   - 连接 GitHub 仓库
   - 启用自动部署

---

## 📚 更多信息

- 详细部署指南：查看 `GITHUB_DEPLOY_GUIDE.md`
- Vercel 文档：https://vercel.com/docs
- Vercel CLI 文档：https://vercel.com/docs/cli

