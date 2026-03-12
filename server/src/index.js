const express = require('express');
const cors = require('cors');
const path = require('path');

// 导入路由
const healthRouter = require('../routes/health');
const projectsRouter = require('../routes/projects');

// 创建 Express 应用
const app = express();
const PORT = 3081;

// 中间件配置
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:3001','http://localhost:3002'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); // 启用 CORS
app.use(express.json()); // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码请求体

// 注册路由
app.use('/health', healthRouter);
app.use('/api/projects', projectsRouter);

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    error: '未找到资源',
    path: req.path,
    method: req.method
  });
});

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
  console.log(`📊 健康检查: http://localhost:${PORT}/health`);
  console.log(`🌐 API 文档:`);
  console.log(`   - 导航数据: http://localhost:${PORT}/api/navigation`);
  console.log(`   - 项目信息（含服务状态检查）: http://localhost:${PORT}/api/projects`);
  console.log(`📡 服务状态检查已集成到项目信息接口中`);
});

module.exports = app;