const db = require('../database/db');

/**
 * @function FUNC-VALIDATE-CREDENTIALS
 * @signature validateCredentials(username, password)
 * @input {string} username - 用户名/邮箱/手机号
 * @input {string} password - 密码
 * @output {Object} result
 * @output {boolean} result.valid - 是否验证通过
 * @output {number} result.userId - 用户ID（验证通过时返回）
 * @db_ops SELECT * FROM users WHERE username = ? (查询用户信息)
 * 
 * @description 验证用户凭据（用户名和密码）
 * 骨架代码：实际项目中应使用bcrypt等加密库比对密码
 */
async function validateCredentials(username, password) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    
    db.get(sql, [username], (err, row) => {
      if (err) {
        console.error('Database error:', err);
        return reject(err);
      }

      if (!row) {
        // 用户不存在
        return resolve({ valid: false });
      }

      // 骨架代码：简单字符串比对
      // 实际项目应使用: bcrypt.compare(password, row.password)
      if (row.password === password) {
        return resolve({
          valid: true,
          userId: row.id
        });
      } else {
        return resolve({ valid: false });
      }
    });
  });
}

/**
 * @function FUNC-SEND-SMS-CODE
 * @signature sendSmsCode(userId, idCardLast4)
 * @input {number} userId - 用户ID
 * @input {string} idCardLast4 - 证件号后4位
 * @output {Object} result
 * @output {boolean} result.success - 是否成功
 * @output {string} result.code - 验证码（成功时返回）
 * @output {string} result.message - 提示信息
 * @db_ops SELECT id_card FROM users WHERE id = ? (查询用户证件号)
 * 
 * @description 发送短信验证码
 * 业务逻辑：
 * 1. 校验证件号后4位是否匹配
 * 2. 生成6位随机验证码
 * 3. 骨架代码中返回验证码，实际项目应调用短信API
 */
async function sendSmsCode(userId, idCardLast4) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id_card FROM users WHERE id = ?';
    
    db.get(sql, [userId], (err, row) => {
      if (err) {
        console.error('Database error:', err);
        return reject(err);
      }

      if (!row) {
        return resolve({
          success: false,
          message: '用户不存在'
        });
      }

      // 校验证件号后4位
      const actualLast4 = row.id_card.slice(-4);
      if (actualLast4 !== idCardLast4) {
        return resolve({
          success: false,
          message: '请输入正确的用户信息!'
        });
      }

      // 生成6位随机验证码
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      // 骨架代码：实际项目应调用短信API发送验证码
      console.log(`[骨架代码] 验证码已生成: ${code}`);

      return resolve({
        success: true,
        code: code,
        message: '获取手机验证码成功！'
      });
    });
  });
}

/**
 * @function FUNC-VERIFY-SMS-CODE
 * @signature verifySmsCode(userId, code, sessionCode, sessionExpiry)
 * @input {number} userId - 用户ID
 * @input {string} code - 用户输入的验证码
 * @input {string} sessionCode - session中存储的验证码
 * @input {number} sessionExpiry - 验证码过期时间
 * @output {Object} result
 * @output {boolean} result.success - 是否成功
 * @output {string} result.token - JWT token（成功时返回）
 * @output {string} result.message - 提示信息
 * @db_ops 从session读取验证码（无直接数据库操作）
 * 
 * @description 验证短信验证码
 * 业务逻辑：
 * 1. 比对用户输入的验证码与session中的验证码
 * 2. 检查验证码是否过期
 * 3. 验证通过后生成JWT token（骨架代码中使用简单token）
 */
async function verifySmsCode(userId, code, sessionCode, sessionExpiry) {
  return new Promise((resolve) => {
    // 检查session中是否有验证码
    if (!sessionCode) {
      return resolve({
        success: false,
        message: '请先获取验证码'
      });
    }

    // 检查验证码是否过期
    if (Date.now() > sessionExpiry) {
      return resolve({
        success: false,
        message: '验证码已过期，请重新获取'
      });
    }

    // 比对验证码
    if (code !== sessionCode) {
      return resolve({
        success: false,
        message: '验证码错误'
      });
    }

    // 验证通过，生成token
    // 骨架代码：实际项目应使用JWT生成token
    const token = `token_${userId}_${Date.now()}`;
    console.log(`[骨架代码] Token已生成: ${token}`);

    return resolve({
      success: true,
      token: token,
      message: '验证成功'
    });
  });
}

module.exports = {
  validateCredentials,
  sendSmsCode,
  verifySmsCode
};

