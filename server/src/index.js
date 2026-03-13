const express = require('express');
const cors = require('cors');
const path = require('path');

// 导入路由
const healthRouter = require('../routes/health');
const projectsRouter = require('../routes/projects');

// 创建 Express 应用
const app = express();
const PORT = process.env.PORT || 3081;

// 中间件配置
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:3001','http://localhost:3002'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); // 启用 CORS
app.use(express.json()); // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码请求体

// 静态文件服务 - 优先于 API 路由
app.use(express.static(path.join(__dirname, '../public')));

// 注册路由
app.use('/health', healthRouter);
app.use('/api/projects', projectsRouter);

// 对于任何未匹配的请求，返回前端应用（支持前端路由）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 404 处理（现在由前端路由处理）
// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({
    error: '服务器内部错误',
    message: '请联系管理员'
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log(`📁 静态文件服务目录: ${path.join(__dirname, '../public')}`);
});

module.exports = app;