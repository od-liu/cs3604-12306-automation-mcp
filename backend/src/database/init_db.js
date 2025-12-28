const sqlite3 = require('sqlite3').verbose();
const path = require('path');

/**
 * @description 数据库初始化脚本
 * 创建所需的数据表和初始化测试数据
 * 
 * 运行方式: npm run init-db
 */

const DB_PATH = path.join(__dirname, '../../database.db');

console.log('开始初始化数据库...');
console.log('数据库路径:', DB_PATH);

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ 数据库连接失败:', err.message);
    process.exit(1);
  }
  console.log('✅ 数据库连接成功');
});

// ========== 创建数据表 ==========

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

// ========== 执行初始化 ==========

db.serialize(() => {
  // 创建users表
  db.run(createUsersTable, (err) => {
    if (err) {
      console.error('❌ 创建users表失败:', err.message);
    } else {
      console.log('✅ users表创建成功');
    }
  });

  // 插入测试数据
  const insertTestUser = `
    INSERT OR IGNORE INTO users (username, password, id_card, phone, email)
    VALUES 
      ('testuser', 'test123456', '110101199001011234', '13800138000', 'test@example.com'),
      ('admin', 'admin123456', '110101199001014028', '13800138001', 'admin@example.com');
  `;

  db.run(insertTestUser, (err) => {
    if (err) {
      console.error('❌ 插入测试数据失败:', err.message);
    } else {
      console.log('✅ 测试数据插入成功');
      console.log('');
      console.log('📝 测试账号信息：');
      console.log('   账号1: testuser / test123456 (证件号后4位: 1234)');
      console.log('   账号2: admin / admin123456 (证件号后4位: 4028)');
      console.log('');
    }
  });

  // 查询并显示所有用户
  db.all('SELECT id, username, id_card, created_at FROM users', [], (err, rows) => {
    if (err) {
      console.error('❌ 查询用户失败:', err.message);
    } else {
      console.log('📊 当前数据库中的用户：');
      console.table(rows);
    }

    // 关闭数据库连接
    db.close((err) => {
      if (err) {
        console.error('❌ 关闭数据库失败:', err.message);
      } else {
        console.log('✅ 数据库初始化完成，连接已关闭');
      }
    });
  });
});
