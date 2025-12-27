/**
 * Express服务器入口文件
 * 配置中间件、路由和启动服务器
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// ========== 中间件配置 ==========
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ========== 路由配置 ==========
app.use('/api/auth', authRoutes);

// ========== 健康检查端点 ==========
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: '12306 Login Backend is running',
    timestamp: new Date().toISOString()
  });
});

// ========== 404处理 ==========
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// ========== 错误处理 ==========
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ========== 启动服务器 ==========
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}/api/health`);
});

module.exports = app;
