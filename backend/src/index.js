const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const apiRoutes = require('./routes/api');

/**
 * @description Express服务器入口文件
 * 配置中间件、路由和服务器启动
 */

const app = express();
const PORT = process.env.PORT || 5000;

// ========== 中间件配置 ==========

// CORS配置 - 允许前端跨域访问
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

// Body解析中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session中间件 - 用于存储验证码
app.use(session({
  secret: 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // 生产环境应设为true（需要HTTPS）
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24小时
  }
}));

// ========== 路由配置 ==========

// API路由
app.use('/api', apiRoutes);

// 健康检查路由
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: '服务器运行正常' });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '请求的资源不存在'
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: '服务器内部错误'
  });
});

// ========== 启动服务器 ==========

app.listen(PORT, () => {
  console.log(`🚀 服务器启动成功！`);
  console.log(`📍 监听端口: ${PORT}`);
  console.log(`🌐 访问地址: http://localhost:${PORT}`);
  console.log(`💡 健康检查: http://localhost:${PORT}/health`);
});

module.exports = app;
