/**
 * @api API-LOGIN POST /api/auth/login
 * @summary 用户登录接口，验证用户凭据
 * @param {Object} body - 请求体
 * @param {string} body.username - 用户名/邮箱/手机号
 * @param {string} body.password - 密码
 * @returns {Object} response - 响应体
 * @returns {boolean} response.success - 是否成功
 * @returns {string} response.message - 响应消息
 * @returns {Object} response.data - 用户数据（成功时）
 * @calls FUNC-VALIDATE-LOGIN - 委托给登录验证服务函数
 */

const express = require('express');
const router = express.Router();
const { validateLogin } = require('../database/operations');

/**
 * POST /api/auth/login
 * 登录接口
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 基础参数验证
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: '用户名和密码不能为空'
      });
    }

    // @calls FUNC-VALIDATE-LOGIN - 调用业务逻辑层验证登录
    const result = await validateLogin(username, password);

    if (result.success) {
      // 登录成功
      return res.status(200).json({
        success: true,
        message: '登录成功',
        data: {
          userId: result.userId,
          username: result.username,
          needSmsVerification: true  // 需要短信验证
        }
      });
    } else {
      // 登录失败
      return res.status(401).json({
        success: false,
        message: result.message || '用户名或密码错误！'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: '服务器内部错误'
    });
  }
});

/**
 * @api API-SEND-SMS POST /api/auth/send-sms
 * @summary 发送短信验证码接口
 * @param {Object} body - 请求体
 * @param {number} body.userId - 用户ID
 * @param {string} body.idNumber - 证件号后4位
 * @returns {Object} response - 响应体
 * @calls FUNC-SEND-SMS-CODE
 */
router.post('/send-sms', async (req, res) => {
  try {
    const { userId, idNumber } = req.body;

    if (!userId || !idNumber) {
      return res.status(400).json({
        success: false,
        message: '参数不完整'
      });
    }

    // @calls FUNC-SEND-SMS-CODE
    const { sendSmsCode } = require('../database/operations');
    const result = await sendSmsCode(userId, idNumber);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: '验证码发送成功',
        code: result.code  // 仅用于开发测试，生产环境不返回
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message || '发送失败'
      });
    }
  } catch (error) {
    console.error('Send SMS error:', error);
    return res.status(500).json({
      success: false,
      message: '服务器内部错误'
    });
  }
});

/**
 * @api API-VERIFY-SMS POST /api/auth/verify-sms
 * @summary 验证短信验证码接口
 * @param {Object} body - 请求体
 * @param {number} body.userId - 用户ID
 * @param {string} body.idNumber - 证件号后4位
 * @param {string} body.smsCode - 短信验证码
 * @returns {Object} response - 响应体
 * @calls FUNC-VERIFY-SMS-CODE
 */
router.post('/verify-sms', async (req, res) => {
  try {
    const { userId, idNumber, smsCode } = req.body;

    if (!userId || !idNumber || !smsCode) {
      return res.status(400).json({
        success: false,
        message: '参数不完整'
      });
    }

    // @calls FUNC-VERIFY-SMS-CODE
    const { verifySmsCode } = require('../database/operations');
    const result = await verifySmsCode(userId, idNumber, smsCode);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: '验证成功',
        data: result.data
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message || '验证失败'
      });
    }
  } catch (error) {
    console.error('Verify SMS error:', error);
    return res.status(500).json({
      success: false,
      message: '服务器内部错误'
    });
  }
});

module.exports = router;

