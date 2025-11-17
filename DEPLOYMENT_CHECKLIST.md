# 部署检查清单

## ✅ 部署前检查

### 1. 文件结构
- [x] `vercel.json` 配置文件存在
- [x] `api/` 目录包含所有 serverless functions
- [x] `api/utils/data.js` 工具文件存在
- [x] `backend/data/` 目录包含初始数据文件

### 2. API Functions
- [x] `api/posts.js` - 获取所有帖子
- [x] `api/posts/[id].js` - 获取单个帖子
- [x] `api/track.js` - 记录用户行为
- [x] `api/data.js` - 获取用户行为数据

### 3. 前端配置
- [x] `frontend/src/services/api.ts` 使用相对路径 `/api`
- [x] `frontend/package.json` 包含构建脚本
- [x] `frontend/vite.config.ts` 配置正确

### 4. 数据文件
- [x] `backend/data/posts.json` 存在
- [x] `backend/data/actions.json` 存在（可以为空数组）

---

## 🚀 部署步骤

### 步骤1：安装 Vercel CLI
```bash
npm i -g vercel
```

### 步骤2：登录 Vercel
```bash
vercel login
```

### 步骤3：部署项目
```bash
# 在项目根目录执行
vercel
```

### 步骤4：部署到生产环境
```bash
vercel --prod
```

---

## ✅ 部署后验证

### 1. 前端功能
- [ ] 访问部署地址，页面正常加载
- [ ] 帖子列表正常显示
- [ ] 可以点击帖子查看详情
- [ ] 点赞功能正常
- [ ] 收藏功能正常

### 2. API 端点
- [ ] `GET /api/posts` 返回帖子列表
- [ ] `GET /api/posts/1` 返回单个帖子
- [ ] `POST /api/track` 成功记录行为
- [ ] `GET /api/data` 返回用户行为数据

### 3. 数据持久化
- [ ] 用户行为数据能够正常记录
- [ ] 数据统计页面正常显示

---

## 🔧 故障排除

如果遇到问题，检查：

1. **构建日志**：在 Vercel 控制台查看构建日志
2. **函数日志**：在 Vercel Functions 页面查看日志
3. **浏览器控制台**：检查前端错误
4. **网络请求**：检查 API 请求是否成功

---

## 📝 注意事项

1. **数据持久化**：当前使用 `/tmp` 目录存储数据，数据不会持久化。如需持久化，请使用数据库。

2. **环境变量**：如果需要自定义 API 地址，在 Vercel 项目设置中添加 `VITE_API_URL` 环境变量。

3. **CORS**：所有 API 函数已配置 CORS，允许所有来源访问。

4. **路由**：SPA 路由已通过 `vercel.json` 配置处理。

