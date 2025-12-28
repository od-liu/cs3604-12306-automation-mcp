const sqlite3 = require('sqlite3').verbose();
const path = require('path');

/**
 * @description SQLite数据库连接配置
 * 使用sqlite3驱动连接到database.db文件
 * 在测试环境中使用test_database.db
 */

// 根据环境选择数据库文件路径
const isTestEnv = process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';
const DB_PATH = isTestEnv 
  ? path.join(__dirname, '../../test_database.db')
  : path.join(__dirname, '../../database.db');

// 创建数据库连接
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ 数据库连接失败:', err.message);
    process.exit(1);
  } else {
    console.log('✅ 数据库连接成功:', DB_PATH);
  }
});

// 启用外键约束
db.run('PRAGMA foreign_keys = ON');

module.exports = db;
