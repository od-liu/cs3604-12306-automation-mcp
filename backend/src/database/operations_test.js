/**
 * @module DatabaseOperationsTest
 * @description 测试专用的数据库操作函数（使用测试数据库）
 */

import testDb from './test_db.js';

/**
 * @function verifyUserCredentials (测试版本)
 * @description 验证用户凭据是否正确（使用测试数据库）
 */
export const verifyUserCredentials = (username, password) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, username, email, phone, id_card_last4
      FROM users
      WHERE (username = ? OR email = ? OR phone = ?) AND password = ?
    `;
    
    testDb.get(query, [username, username, username, password], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row || null);
      }
    });
  });
};

/**
 * @function verifyIdCard (测试版本)
 * @description 验证用户证件号后4位是否正确（使用测试数据库）
 */
export const verifyIdCard = (username, idCardLast4) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id
      FROM users
      WHERE username = ? AND id_card_last4 = ?
    `;
    
    testDb.get(query, [username, idCardLast4], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(!!row);
      }
    });
  });
};

/**
 * @function generateVerificationCode (测试版本)
 * @description 生成并存储验证码（使用测试数据库）
 */
export const generateVerificationCode = (username) => {
  return new Promise((resolve, reject) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    
    const query = `
      INSERT INTO verification_codes (username, code, expires_at)
      VALUES (?, ?, ?)
    `;
    
    testDb.run(query, [username, code, expiresAt.toISOString()], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(code);
      }
    });
  });
};

/**
 * @function verifyCode (测试版本)
 * @description 验证验证码是否正确且未过期（使用测试数据库）
 */
export const verifyCode = (username, code) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, expires_at, used
      FROM verification_codes
      WHERE username = ? AND code = ?
      ORDER BY created_at DESC
      LIMIT 1
    `;
    
    testDb.get(query, [username, code], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      
      if (!row) {
        resolve({ valid: false, message: '很抱歉，您输入的短信验证码有误。' });
        return;
      }
      
      if (row.used) {
        resolve({ valid: false, message: '验证码已使用' });
        return;
      }
      
      const now = new Date();
      const expiresAt = new Date(row.expires_at);
      
      if (now > expiresAt) {
        resolve({ valid: false, message: '验证码已过期' });
        return;
      }
      
      testDb.run('UPDATE verification_codes SET used = 1 WHERE id = ?', [row.id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ valid: true, message: '验证成功' });
        }
      });
    });
  });
};

/**
 * @function checkVerificationRateLimit (测试版本)
 * @description 检查验证码发送频率限制（使用测试数据库）
 */
export const checkVerificationRateLimit = (username) => {
  return new Promise((resolve, reject) => {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    
    const query = `
      SELECT id
      FROM verification_codes
      WHERE username = ? AND created_at > ?
      LIMIT 1
    `;
    
    testDb.get(query, [username, oneMinuteAgo.toISOString()], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(!!row);
      }
    });
  });
};

