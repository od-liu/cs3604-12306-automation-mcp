/**
 * 测试数据库工具
 * 提供测试数据库的创建、初始化和清理功能
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const TEST_DB_PATH = path.join(__dirname, '../../test_database.db');

let testDb = null;

/**
 * 创建测试数据库连接
 */
function createTestDb() {
  return new Promise((resolve, reject) => {
    testDb = new sqlite3.Database(TEST_DB_PATH, (err) => {
      if (err) reject(err);
      else resolve(testDb);
    });
  });
}

/**
 * 初始化测试数据库（创建表）
 */
function initTestDatabase() {
  return new Promise((resolve, reject) => {
    if (!testDb) {
      return reject(new Error('Test database not created'));
    }
    
    testDb.serialize(() => {
      // 创建 users 表
      testDb.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          email TEXT,
          phone TEXT,
          password TEXT NOT NULL,
          id_number TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) return reject(err);
      });

      // 创建 sms_codes 表
      testDb.run(`
        CREATE TABLE IF NOT EXISTS sms_codes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          code TEXT NOT NULL,
          expires_at INTEGER NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
}

/**
 * 清理测试数据
 */
function cleanupTestData() {
  return new Promise((resolve, reject) => {
    if (!testDb) {
      return resolve();
    }
    
    testDb.serialize(() => {
      testDb.run('DELETE FROM sms_codes', (err) => {
        if (err) return reject(err);
      });
      testDb.run('DELETE FROM users', (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
}

/**
 * 插入测试数据
 */
function insertTestData() {
  return new Promise((resolve, reject) => {
    if (!testDb) {
      return reject(new Error('Test database not created'));
    }
    
    testDb.serialize(() => {
      testDb.run(`
        INSERT INTO users (id, username, email, phone, password, id_number) VALUES
        (1, 'testuser', 'test@example.com', '13800138000', 'password123', '1234'),
        (2, 'admin', 'admin@example.com', '13900139000', 'admin123', '5678')
      `, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
}

/**
 * 关闭测试数据库
 */
function closeTestDb() {
  return new Promise((resolve, reject) => {
    if (testDb) {
      testDb.close((err) => {
        if (err) reject(err);
        else {
          testDb = null;
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}

/**
 * 获取测试数据库实例
 */
function getTestDb() {
  return testDb;
}

module.exports = {
  createTestDb,
  initTestDatabase,
  cleanupTestData,
  insertTestData,
  closeTestDb,
  getTestDb,
  TEST_DB_PATH
};


