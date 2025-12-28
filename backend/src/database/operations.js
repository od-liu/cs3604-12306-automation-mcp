/**
 * @module DatabaseOperations
 * @description 数据库操作函数集合
 */

import db from './db.js';

/**
 * @function FUNC-VERIFY-USER-CREDENTIALS
 * @signature verifyUserCredentials(username, password)
 * @input {string} username - 用户名/邮箱/手机号
 * @input {string} password - 密码
 * @output {Promise<Object>} - 返回用户信息或null
 * @db_ops SELECT on users table
 * 
 * 验证用户凭据是否正确
 */
export const verifyUserCredentials = (username, password) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, username, email, phone, id_card_last4
      FROM users
      WHERE (username = ? OR email = ? OR phone = ?) AND password = ?
    `;
    
    db.get(query, [username, username, username, password], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row || null);
      }
    });
  });
};

/**
 * @function FUNC-VERIFY-ID-CARD
 * @signature verifyIdCard(username, idCardLast4)
 * @input {string} username - 用户名
 * @input {string} idCardLast4 - 证件号后4位
 * @output {Promise<boolean>} - 返回验证结果
 * @db_ops SELECT on users table
 * 
 * 验证用户证件号后4位是否正确
 */
export const verifyIdCard = (username, idCardLast4) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id
      FROM users
      WHERE username = ? AND id_card_last4 = ?
    `;
    
    db.get(query, [username, idCardLast4], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(!!row);
      }
    });
  });
};

/**
 * @function FUNC-GENERATE-VERIFICATION-CODE
 * @signature generateVerificationCode(username)
 * @input {string} username - 用户名
 * @output {Promise<string>} - 返回生成的验证码
 * @db_ops INSERT on verification_codes table
 * 
 * 生成并存储验证码
 */
export const generateVerificationCode = (username) => {
  return new Promise((resolve, reject) => {
    // 生成6位随机验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5分钟后过期
    
    const query = `
      INSERT INTO verification_codes (username, code, expires_at)
      VALUES (?, ?, ?)
    `;
    
    db.run(query, [username, code, expiresAt.toISOString()], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(code);
      }
    });
  });
};

/**
 * @function FUNC-VERIFY-CODE
 * @signature verifyCode(username, code)
 * @input {string} username - 用户名
 * @input {string} code - 验证码
 * @output {Promise<Object>} - 返回验证结果 {valid: boolean, message: string}
 * @db_ops SELECT and UPDATE on verification_codes table
 * 
 * 验证验证码是否正确且未过期
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
    
    db.get(query, [username, code], (err, row) => {
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
      
      // 标记验证码为已使用
      db.run('UPDATE verification_codes SET used = 1 WHERE id = ?', [row.id], (err) => {
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
 * @function FUNC-CHECK-VERIFICATION-RATE-LIMIT
 * @signature checkVerificationRateLimit(username)
 * @input {string} username - 用户名
 * @output {Promise<boolean>} - 返回是否在限制时间内
 * @db_ops SELECT on verification_codes table
 * 
 * 检查验证码发送频率限制（1分钟内只能发送一次）
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
    
    db.get(query, [username, oneMinuteAgo.toISOString()], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(!!row);  // 如果找到记录，说明在限制时间内
      }
    });
  });
};

