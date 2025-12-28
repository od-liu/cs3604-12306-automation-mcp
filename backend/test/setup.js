const sqlite3 = require('sqlite3').verbose();
const path = require('path');

/**
 * @description 测试数据库初始化脚本
 * 为测试环境创建独立的test_database.db
 */

const TEST_DB_PATH = path.join(__dirname, '../test_database.db');

function initTestDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(TEST_DB_PATH, (err) => {
      if (err) {
        reject(err);
        return;
      }
    });

    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      id_card TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

    db.serialize(() => {
      // 删除现有表（清空数据）
      db.run('DROP TABLE IF EXISTS users', (err) => {
        if (err) console.error('Drop table error:', err);
      });

      // 创建表
      db.run(createUsersTable, (err) => {
        if (err) {
          reject(err);
          return;
        }
      });

      // 插入测试数据
      const insertTestUser = `
        INSERT INTO users (username, password, id_card, phone, email)
        VALUES 
          ('testuser', 'test123456', '110101199001011234', '13800138000', 'test@example.com'),
          ('admin', 'admin123456', '110101199001014028', '13800138001', 'admin@example.com');
      `;

      db.run(insertTestUser, (err) => {
        if (err) {
          reject(err);
          return;
        }

        db.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });
  });
}

// 如果直接运行此脚本
if (require.main === module) {
  console.log('初始化测试数据库...');
  console.log('测试数据库路径:', TEST_DB_PATH);
  
  initTestDatabase()
    .then(() => {
      console.log('✅ 测试数据库初始化成功');
      console.log('📝 测试账号：');
      console.log('   testuser / test123456 (证件号后4位: 1234)');
      console.log('   admin / admin123456 (证件号后4位: 4028)');
    })
    .catch((err) => {
      console.error('❌ 测试数据库初始化失败:', err);
      process.exit(1);
    });
}

module.exports = { initTestDatabase, TEST_DB_PATH };

