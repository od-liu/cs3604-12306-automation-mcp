const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

/**
 * @api API-LOGIN POST /api/auth/login
 * @summary 用户登录接口
 * @param {Object} body - 请求体结构
 * @param {string} body.username - 用户名/邮箱/手机号
 * @param {string} body.password - 密码
 * @returns {Object} response - 响应体结构
 * @returns {boolean} response.success - 登录是否成功
 * @returns {string} response.message - 提示信息
 * @returns {boolean} response.requireSms - 是否需要短信验证
 * @returns {number} response.userId - 用户ID（成功时返回）
 * @calls FUNC-VALIDATE-CREDENTIALS - 委托给 authService.validateCredentials
 */
router.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 基本参数验证
    if (!username || !password) {
      return res.json({
        success: false,
        message: '用户名和密码不能为空'
      });
    }

    // 调用 Service 层验证凭据
    const result = await authService.validateCredentials(username, password);

    if (result.valid) {
      // 登录成功，需要短信验证
      return res.json({
        success: true,
        message: '登录成功，请进行短信验证',
        requireSms: true,
        userId: result.userId
      });
    } else {
      // 登录失败
      return res.json({
        success: false,
        message: '用户名或密码错误'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: '服务器错误，请稍后再试'
    });
  }
});

/**
 * @api API-GET-VERIFICATION-CODE POST /api/auth/send-verification-code
 * @summary 发送短信验证码接口
 * @param {Object} body - 请求体结构
 * @param {number} body.userId - 用户ID
 * @param {string} body.idCardLast4 - 证件号后4位
 * @returns {Object} response - 响应体结构
 * @returns {boolean} response.success - 是否成功
 * @returns {string} response.message - 提示信息
 * @calls FUNC-SEND-SMS-CODE - 委托给 authService.sendSmsCode
 */
router.post('/auth/send-verification-code', async (req, res) => {
  try {
    const { userId, idCardLast4 } = req.body;

    // 基本参数验证
    if (!userId || !idCardLast4) {
      return res.json({
        success: false,
        message: '参数错误'
      });
    }

    // 调用 Service 层发送验证码
    const result = await authService.sendSmsCode(userId, idCardLast4);

    if (result.success) {
      // 保存验证码到session (骨架代码中使用简单存储)
      if (!req.session) {
        req.session = {};
      }
      req.session.smsCode = result.code;
      req.session.smsExpiry = Date.now() + 5 * 60 * 1000; // 5分钟有效期

      return res.json({
        success: true,
        message: '获取手机验证码成功！'
      });
    } else {
      return res.json({
        success: false,
        message: result.message || '请输入正确的用户信息!'
      });
    }
  } catch (error) {
    console.error('Send SMS code error:', error);
    return res.status(500).json({
      success: false,
      message: '服务器错误，请稍后再试'
    });
  }
});

/**
 * @api API-VERIFY-SMS POST /api/auth/verify-sms
 * @summary 验证短信验证码接口
 * @param {Object} body - 请求体结构
 * @param {number} body.userId - 用户ID
 * @param {string} body.code - 验证码
 * @returns {Object} response - 响应体结构
 * @returns {boolean} response.success - 是否成功
 * @returns {string} response.token - JWT token（成功时返回）
 * @returns {string} response.message - 提示信息
 * @calls FUNC-VERIFY-SMS-CODE - 委托给 authService.verifySmsCode
 */
router.post('/auth/verify-sms', async (req, res) => {
  try {
    const { userId, code } = req.body;

    // 基本参数验证
    if (!userId || !code) {
      return res.json({
        success: false,
        message: '参数错误'
      });
    }

    // 从session获取验证码
    const sessionCode = req.session?.smsCode;
    const sessionExpiry = req.session?.smsExpiry;

    // 调用 Service 层验证验证码
    const result = await authService.verifySmsCode(
      userId,
      code,
      sessionCode,
      sessionExpiry
    );

    if (result.success) {
      // 清除session中的验证码
      if (req.session) {
        delete req.session.smsCode;
        delete req.session.smsExpiry;
      }

      return res.json({
        success: true,
        token: result.token,
        message: '验证成功'
      });
    } else {
      return res.json({
        success: false,
        message: result.message || '验证码错误'
      });
    }
  } catch (error) {
    console.error('Verify SMS code error:', error);
    return res.status(500).json({
      success: false,
      message: '服务器错误，请稍后再试'
    });
  }
});

module.exports = router;
