/**
 * 数据库初始化脚本
 * 创建表结构和插入初始数据
 */

const { db } = require('./db');

// 创建用户表
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT,
  phone TEXT,
  password TEXT NOT NULL,
  id_number TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

// 创建短信验证码表
const createSmsCodesTable = `
CREATE TABLE IF NOT EXISTS sms_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  code TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
`;

// 插入测试用户数据
const insertTestUsers = `
INSERT OR IGNORE INTO users (id, username, email, phone, password, id_number) VALUES
  (1, 'testuser', 'test@example.com', '13800138000', 'password123', '1234'),
  (2, 'admin', 'admin@example.com', '13900139000', 'admin123', '5678');
`;

// 执行初始化
function initDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // 创建表
      db.run(createUsersTable, (err) => {
        if (err) {
          console.error('❌ Error creating users table:', err.message);
          return reject(err);
        }
        console.log('✅ Users table created/verified');
      });

      db.run(createSmsCodesTable, (err) => {
        if (err) {
          console.error('❌ Error creating sms_codes table:', err.message);
          return reject(err);
        }
        console.log('✅ SMS codes table created/verified');
      });

      // 插入测试数据
      db.run(insertTestUsers, (err) => {
        if (err) {
          console.error('❌ Error inserting test users:', err.message);
        } else {
          console.log('✅ Test users inserted/verified');
        }
        resolve();
      });
    });
  });
}

// 如果直接运行此脚本，执行初始化
if (require.main === module) {
  initDatabase()
    .then(() => {
      console.log('🎉 Database initialization completed');
      db.close();
    })
    .catch((err) => {
      console.error('💥 Database initialization failed:', err);
      db.close();
      process.exit(1);
    });
}

module.exports = { initDatabase };
