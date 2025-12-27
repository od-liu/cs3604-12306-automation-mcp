/**
 * @function FUNC-VALIDATE-LOGIN
 * @signature validateLogin(username, password)
 * @input {string} username - 用户名/邮箱/手机号
 * @input {string} password - 密码
 * @output {Object} result - 验证结果
 * @output {boolean} result.success - 是否验证成功
 * @output {string} result.message - 消息
 * @output {number} result.userId - 用户ID（成功时）
 * @output {string} result.username - 用户名（成功时）
 * @db_ops SELECT on users table
 */

/**
 * 验证用户登录
 * 
 * 业务逻辑：
 * 1. 根据 username 查询数据库中的用户记录
 * 2. 验证密码是否匹配
 * 3. 返回验证结果
 */
async function validateLogin(username, password) {
  try {
    const { dbGet } = require('./db');
    
    // 查询用户（支持用户名、邮箱、手机号登录）
    const user = await dbGet(
      'SELECT * FROM users WHERE username = ? OR email = ? OR phone = ?',
      [username, username, username]
    );

    if (!user) {
      // 用户名未注册
      return {
        success: false,
        message: '用户名或密码错误！'
      };
    }

    if (user.password !== password) {
      // 密码错误
      return {
        success: false,
        message: '用户名或密码错误！'
      };
    }

    // 登录成功
    return {
      success: true,
      userId: user.id,
      username: user.username,
      message: '登录成功'
    };

  } catch (error) {
    console.error('Database error in validateLogin:', error);
    return {
      success: false,
      message: '数据库查询错误'
    };
  }
}

/**
 * @function FUNC-SEND-SMS-CODE
 * @signature sendSmsCode(userId, idNumber)
 * @input {number} userId - 用户ID
 * @input {string} idNumber - 证件号后4位
 * @output {Object} result - 发送结果
 * @output {boolean} result.success - 是否成功
 * @output {string} result.message - 消息
 * @output {string} result.code - 验证码（仅测试环境）
 * @db_ops SELECT on users, INSERT on sms_codes table
 */
async function sendSmsCode(userId, idNumber) {
  try {
    const { dbGet, dbRun } = require('./db');
    
    // 查询用户
    const user = await dbGet('SELECT * FROM users WHERE id = ?', [userId]);

    if (!user) {
      return {
        success: false,
        message: '用户不存在'
      };
    }

    // 验证证件号
    if (user.id_number !== idNumber) {
      return {
        success: false,
        message: '请输入正确的用户信息！'
      };
    }

    // 频率限制检查：查询最近1分钟内是否发送过验证码
    const lastSms = await dbGet(
      'SELECT * FROM sms_codes WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [userId]
    );
    
    if (lastSms) {
      const lastSmsTime = new Date(lastSms.created_at).getTime();
      const now = Date.now();
      if (now - lastSmsTime < 60000) { // 1分钟内
        return {
          success: false,
          message: '请求验证码过于频繁，请稍后再试！'
        };
      }
    }

    // 生成6位随机验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 保存验证码到数据库（带过期时间，5分钟有效期）
    await dbRun(
      'INSERT INTO sms_codes (user_id, code, expires_at) VALUES (?, ?, ?)',
      [userId, code, Date.now() + 300000]
    );

    // 发送短信（实际应该调用第三方SMS服务）
    // 开发环境：输出到控制台
    console.log(`[SMS] 发送验证码 ${code} 到用户 ${user.username}`);

    return {
      success: true,
      code: code,  // 仅用于开发测试
      message: '验证码发送成功'
    };

  } catch (error) {
    console.error('Database error in sendSmsCode:', error);
    return {
      success: false,
      message: '数据库错误'
    };
  }
}

/**
 * @function FUNC-VERIFY-SMS-CODE
 * @signature verifySmsCode(userId, idNumber, smsCode)
 * @input {number} userId - 用户ID
 * @input {string} idNumber - 证件号后4位
 * @input {string} smsCode - 短信验证码
 * @output {Object} result - 验证结果
 * @output {boolean} result.success - 是否验证成功
 * @output {string} result.message - 消息
 * @output {Object} result.data - 用户数据（成功时）
 * @db_ops SELECT on users, sms_codes table
 */
async function verifySmsCode(userId, idNumber, smsCode) {
  try {
    const { dbGet, dbRun } = require('./db');
    
    // 查询用户
    const user = await dbGet('SELECT * FROM users WHERE id = ?', [userId]);

    if (!user) {
      return {
        success: false,
        message: '用户不存在'
      };
    }

    // 验证证件号
    if (user.id_number !== idNumber) {
      return {
        success: false,
        message: '请输入正确的用户信息！'
      };
    }

    // 从数据库查询最新的验证码记录
    const smsRecord = await dbGet(
      'SELECT * FROM sms_codes WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [userId]
    );

    if (!smsRecord) {
      return {
        success: false,
        message: '很抱歉，您输入的短信验证码有误。'
      };
    }

    // 检查是否过期
    if (Date.now() > smsRecord.expires_at) {
      return {
        success: false,
        message: '验证码已过期'
      };
    }

    // 验证验证码
    if (smsCode !== smsRecord.code) {
      return {
        success: false,
        message: '很抱歉，您输入的短信验证码有误。'
      };
    }

    // 验证成功，删除已使用的验证码
    await dbRun('DELETE FROM sms_codes WHERE user_id = ?', [userId]);

    return {
      success: true,
      message: '验证成功',
      data: {
        userId: user.id,
        username: user.username
      }
    };

  } catch (error) {
    console.error('Database error in verifySmsCode:', error);
    return {
      success: false,
      message: '数据库错误'
    };
  }
}

module.exports = {
  validateLogin,
  verifySmsCode,
  sendSmsCode
};
