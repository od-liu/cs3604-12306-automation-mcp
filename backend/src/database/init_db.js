/**
 * @module InitDatabase
 * @description 初始化数据库表结构和测试数据
 */

import db from './db.js';

/**
 * 初始化数据库表
 */
export const initDatabase = () => {
  // 创建用户表
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT,
      phone TEXT,
      password TEXT NOT NULL,
      id_card_last4 TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('❌ 创建用户表失败:', err.message);
    } else {
      console.log('✅ 用户表创建成功');
      insertTestData();
    }
  });

  // 创建验证码表
  db.run(`
    CREATE TABLE IF NOT EXISTS verification_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      code TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME NOT NULL,
      used BOOLEAN DEFAULT 0
    )
  `, (err) => {
    if (err) {
      console.error('❌ 创建验证码表失败:', err.message);
    } else {
      console.log('✅ 验证码表创建成功');
    }
  });
};

/**
 * 插入测试数据
 */
const insertTestData = () => {
  const testUser = {
    username: 'testuser',
    email: 'test@example.com',
    phone: '19805819256',
    password: 'password123',  // 在实际应用中应该加密
    id_card_last4: '4028'
  };

  db.run(`
    INSERT OR IGNORE INTO users (username, email, phone, password, id_card_last4)
    VALUES (?, ?, ?, ?, ?)
  `, [testUser.username, testUser.email, testUser.phone, testUser.password, testUser.id_card_last4], (err) => {
    if (err) {
      console.error('❌ 插入测试数据失败:', err.message);
    } else {
      console.log('✅ 测试数据插入成功');
    }
  });
};

// 如果直接运行此文件，则初始化数据库
if (import.meta.url === `file://${process.argv[1]}`) {
  initDatabase();
}

export default initDatabase;

