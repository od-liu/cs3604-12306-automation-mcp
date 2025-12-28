/**
 * @module InitTestDatabase
 * @description 初始化测试数据库表结构
 */

import testDb from './test_db.js';

/**
 * 初始化测试数据库表
 */
export const initTestDatabase = () => {
  return new Promise((resolve, reject) => {
    // 创建用户表
    testDb.run(`
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
        console.error('❌ 创建测试用户表失败:', err.message);
        reject(err);
        return;
      }
      console.log('✅ 测试用户表创建成功');

      // 创建验证码表
      testDb.run(`
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
          console.error('❌ 创建测试验证码表失败:', err.message);
          reject(err);
        } else {
          console.log('✅ 测试验证码表创建成功');
          resolve();
        }
      });
    });
  });
};

/**
 * 清空测试数据库所有表
 */
export const clearTestDatabase = () => {
  return new Promise((resolve, reject) => {
    testDb.run('DELETE FROM users', (err) => {
      if (err) {
        reject(err);
        return;
      }
      testDb.run('DELETE FROM verification_codes', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
};

/**
 * 插入测试数据
 */
export const insertTestFixtures = () => {
  return new Promise((resolve, reject) => {
    const testUsers = [
      {
        username: 'testuser',
        email: 'test@example.com',
        phone: '19805819256',
        password: 'password123',
        id_card_last4: '4028'
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        phone: '13800138000',
        password: 'password456',
        id_card_last4: '1234'
      }
    ];

    let inserted = 0;
    testUsers.forEach((user) => {
      testDb.run(`
        INSERT INTO users (username, email, phone, password, id_card_last4)
        VALUES (?, ?, ?, ?, ?)
      `, [user.username, user.email, user.phone, user.password, user.id_card_last4], (err) => {
        if (err) {
          reject(err);
        } else {
          inserted++;
          if (inserted === testUsers.length) {
            console.log(`✅ 已插入 ${inserted} 个测试用户`);
            resolve();
          }
        }
      });
    });
  });
};

// 如果直接运行此文件，则初始化测试数据库
if (import.meta.url === `file://${process.argv[1]}`) {
  initTestDatabase()
    .then(() => insertTestFixtures())
    .then(() => {
      console.log('✅ 测试数据库初始化完成');
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ 测试数据库初始化失败:', err);
      process.exit(1);
    });
}

export default initTestDatabase;

