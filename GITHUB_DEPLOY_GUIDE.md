# GitHub 推送和 Vercel CLI 部署指南

## 📋 推送代码到 GitHub 前的检查清单

### ✅ 1. 检查敏感信息

确保以下内容不会被提交：

- [x] `.env` 文件（已在 .gitignore 中）
- [x] `.env.local` 文件（已在 .gitignore 中）
- [x] `node_modules/` 目录（已在 .gitignore 中）
- [x] `.vercel` 目录（已在 .gitignore 中）
- [x] 个人 API 密钥或令牌
- [x] 数据库连接字符串

### ✅ 2. 检查 .gitignore 文件

已配置的忽略项：
- `node_modules/` - 依赖包
- `dist/` 和 `build/` - 构建输出
- `.env*` - 环境变量文件
- `.vercel` - Vercel 配置
- 日志文件和系统文件

### ✅ 3. 数据文件处理

- `backend/data/posts.json` - **保留**（初始数据，需要提交）
- `backend/data/actions.json` - **可选**（用户行为数据，可以不提交）

---

## 🚀 完整部署流程

### 步骤 1：初始化 Git 仓库（如果还没有）

```bash
# 在项目根目录执行
git init

# 检查当前状态
git status
```

### 步骤 2：添加所有文件

```bash
# 添加所有文件（.gitignore 会自动排除不需要的文件）
git add .

# 检查将要提交的文件
git status
```

### 步骤 3：提交代码

```bash
# 提交代码
git commit -m "准备部署到 Vercel：添加 serverless functions 和配置"
```

### 步骤 4：创建 GitHub 仓库并推送

#### 4.1 在 GitHub 上创建新仓库

1. 访问 https://github.com/new
2. 输入仓库名称（例如：`xiaohongshu-simulator`）
3. 选择 **Public** 或 **Private**
4. **不要**勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

#### 4.2 推送代码到 GitHub

```bash
# 添加远程仓库（替换 YOUR_USERNAME 和 REPO_NAME）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 或者使用 SSH（如果已配置 SSH 密钥）
# git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 5：安装 Vercel CLI

```bash
# 全局安装 Vercel CLI
npm install -g vercel

# 验证安装
vercel --version
```

### 步骤 6：登录 Vercel

```bash
# 登录 Vercel（会在浏览器中打开登录页面）
vercel login
```

登录后，CLI 会保存你的认证信息。

### 步骤 7：部署到 Vercel

#### 7.1 首次部署（预览环境）

```bash
# 在项目根目录执行
vercel
```

首次部署会提示以下问题：

1. **Set up and deploy?** → 输入 `Y` 或直接回车
2. **Which scope?** → 选择你的账户
3. **Link to existing project?** → 输入 `N`（创建新项目）
4. **What's your project's name?** → 输入项目名称（例如：`xiaohongshu-simulator`）
5. **In which directory is your code located?** → 直接回车（使用当前目录 `./`）
6. **Want to override the settings?** → 输入 `N`（使用 vercel.json 配置）

部署完成后，你会看到：
- 预览部署 URL（例如：`https://your-project-xxx.vercel.app`）
- 生产部署 URL（例如：`https://your-project.vercel.app`）

#### 7.2 部署到生产环境

```bash
# 部署到生产环境
vercel --prod
```

或者使用别名：

```bash
vercel --production
```

---

## 🔍 验证部署

### 1. 检查部署状态

```bash
# 查看部署列表
vercel ls

# 查看特定部署的详细信息
vercel inspect [deployment-url]
```

### 2. 测试 API 端点

在浏览器中访问：

- `https://your-project.vercel.app/api/posts` - 应该返回帖子列表
- `https://your-project.vercel.app/api/posts/1` - 应该返回第一个帖子
- `https://your-project.vercel.app/api/data` - 应该返回用户行为数据

### 3. 测试前端功能

访问 `https://your-project.vercel.app`，测试：
- ✅ 帖子列表显示
- ✅ 点击帖子查看详情
- ✅ 点赞功能
- ✅ 收藏功能
- ✅ 数据统计页面

---

## 🔄 更新部署

### 方法 1：通过 CLI 更新

```bash
# 1. 修改代码后，提交到 Git
git add .
git commit -m "更新功能"
git push

# 2. 部署到 Vercel
vercel --prod
```

### 方法 2：通过 GitHub 自动部署（推荐）

1. **在 Vercel 控制台连接 GitHub**：
   - 访问 https://vercel.com/dashboard
   - 点击项目 → Settings → Git
   - 连接 GitHub 仓库
   - 启用自动部署

2. **之后每次推送代码**：
   ```bash
   git push origin main
   ```
   Vercel 会自动检测并部署！

---

## 🛠️ 常用 Vercel CLI 命令

```bash
# 查看帮助
vercel --help

# 查看当前项目信息
vercel project ls

# 查看部署日志
vercel logs [deployment-url]

# 查看环境变量
vercel env ls

# 添加环境变量
vercel env add VITE_API_URL production

# 删除部署
vercel remove [deployment-url]

# 查看项目域名
vercel domains ls
```

---

## ⚠️ 常见问题

### 问题 1：Git 推送失败

**错误**：`remote: Permission denied`

**解决方案**：
- 检查 GitHub 认证（使用 Personal Access Token 或 SSH 密钥）
- 确保有仓库的写入权限

### 问题 2：Vercel 部署失败

**错误**：构建失败

**解决方案**：
```bash
# 查看详细日志
vercel logs [deployment-url]

# 本地测试构建
cd frontend
npm install
npm run build
```

### 问题 3：API 返回 404

**解决方案**：
- 检查 `api/` 目录下的文件是否正确
- 确保文件导出默认函数
- 检查 `vercel.json` 配置

### 问题 4：环境变量不生效

**解决方案**：
```bash
# 在 Vercel 控制台添加环境变量
# 或使用 CLI
vercel env add VITE_API_URL production
```

---

## 📝 最佳实践

1. **使用分支部署**：
   - `main` 分支 → 生产环境
   - `develop` 分支 → 预览环境

2. **环境变量管理**：
   - 开发环境：使用 `.env.local`
   - 生产环境：在 Vercel 控制台设置

3. **代码审查**：
   - 使用 Pull Request 进行代码审查
   - 合并到 `main` 后自动部署

4. **监控和日志**：
   - 定期查看 Vercel 日志
   - 设置错误监控（如 Sentry）

---

## 🎯 下一步

部署成功后，你可以：

1. **自定义域名**：
   ```bash
   vercel domains add your-domain.com
   ```

2. **设置环境变量**：
   - 在 Vercel 控制台 → Settings → Environment Variables

3. **配置持续部署**：
   - 连接 GitHub 仓库
   - 启用自动部署

4. **添加数据库**（如需持久化）：
   ```bash
   vercel kv create
   # 或
   vercel postgres create
   ```

---

## 📞 需要帮助？

- Vercel 文档：https://vercel.com/docs
- Vercel CLI 文档：https://vercel.com/docs/cli
- GitHub 文档：https://docs.github.com

