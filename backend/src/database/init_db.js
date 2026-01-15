/**
 * Database Initialization
 * Create tables and insert demo data
 */

import { getDb } from './db.js';
import bcrypt from 'bcrypt';

// Create users table
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    name TEXT,
    id_type TEXT DEFAULT '1',
    id_number TEXT,
    id_card_last4 TEXT NOT NULL,
    passenger_type TEXT DEFAULT '1',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

// Create verification_codes table
const createVerificationCodesTable = `
  CREATE TABLE IF NOT EXISTS verification_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    phone TEXT,
    code TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    user_data TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`;

// Create sessions table
const createSessionsTable = `
  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`;

/**
 * Initialize database tables
 */
export async function initDatabase() {
  try {
    const db = getDb();
    
    // Create tables using exec (wrapped in promise for better error handling)
    await new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(createUsersTable, (err) => {
          if (err) reject(err);
          else console.log('✓ Users table created or already exists');
        });
        
        db.run(createVerificationCodesTable, (err) => {
          if (err) reject(err);
          else console.log('✓ Verification codes table created or already exists');
        });
        
        db.run(createSessionsTable, (err) => {
          if (err) reject(err);
          else {
            console.log('✓ Sessions table created or already exists');
            resolve();
          }
        });
      });
    });
    
    return true;
  } catch (err) {
    console.error('Error initializing database:', err.message);
    throw err;
  }
}

/**
 * Insert demo data for testing
 */
export async function insertDemoData() {
  try {
    const db = getDb();
    
    // Check if demo user already exists
    const existingUser = await db.getAsync('SELECT id FROM users WHERE username = ?', 'testuser');
    
    if (existingUser) {
      console.log('✓ Demo user already exists, skipping insertion');
      return;
    }
    
    // Hash password for demo user
    const passwordHash = bcrypt.hashSync('password123', 10);
    const passwordHash2 = bcrypt.hashSync('admin123', 10);
    
    // Insert demo users (use INSERT OR IGNORE to avoid conflicts in parallel tests)
    await db.runAsync(`
      INSERT OR IGNORE INTO users (username, email, phone, password_hash, name, id_type, id_number, id_card_last4, passenger_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, 'testuser', 'test@12306.cn', '13800138000', passwordHash, '张三', '1', '110101199001011234', '1234', '1');
    console.log('✓ Demo user inserted: testuser / password123 / 证件号后4位: 1234');
    
    await db.runAsync(`
      INSERT OR IGNORE INTO users (username, email, phone, password_hash, name, id_type, id_number, id_card_last4, passenger_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, 'admin', 'admin@12306.cn', '13900139000', passwordHash2, '李四', '1', '110101199002025678', '5678', '1');
    console.log('✓ Demo user inserted: admin / admin123 / 证件号后4位: 5678');
    
  } catch (err) {
    // Ignore UNIQUE constraint errors (happens in parallel tests)
    if (err.code === 'SQLITE_CONSTRAINT' && err.message.includes('UNIQUE')) {
      console.log('✓ Demo users already exist (parallel test detected)');
      return;
    }
    console.error('Error inserting demo data:', err.message);
    throw err;
  }
}

/**
 * Clear all data from tables (for testing)
 */
export async function clearDatabase() {
  try {
    const db = getDb();
    await db.runAsync('DELETE FROM sessions');
    await db.runAsync('DELETE FROM verification_codes');
    await db.runAsync('DELETE FROM users');
    console.log('✓ Database cleared');
  } catch (err) {
    console.error('Error clearing database:', err.message);
    throw err;
  }
}

// Run initialization if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    try {
      console.log('=== Initializing Database ===');
      await initDatabase();
      await insertDemoData();
      console.log('=== Database initialization completed ===');
      process.exit(0);
    } catch (err) {
      console.error('Database initialization failed:', err);
      process.exit(1);
    }
  })();
}

