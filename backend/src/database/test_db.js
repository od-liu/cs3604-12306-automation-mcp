/**
 * @module TestDatabase
 * @description 测试专用数据库连接（使用 test_database.db）
 */

import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 测试数据库路径（与生产数据库分离）
const TEST_DB_PATH = join(__dirname, '../../test_database.db');

const testDb = new sqlite3.Database(TEST_DB_PATH, (err) => {
  if (err) {
    console.error('❌ 测试数据库连接失败:', err.message);
  } else {
    console.log('✅ 测试数据库连接成功:', TEST_DB_PATH);
  }
});

export default testDb;

