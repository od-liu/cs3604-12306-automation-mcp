/**
 * @module APIRoutes
 * @description API路由定义
 */

import express from 'express';
import { 
  verifyUserCredentials, 
  verifyIdCard, 
  generateVerificationCode, 
  verifyCode,
  checkVerificationRateLimit 
} from '../database/operations.js';
import { successResponse, errorResponse } from '../utils/response.js';

const router = express.Router();

/**
 * @api API-LOGIN POST /api/auth/login
 * @summary 用户登录接口
 * @param {Object} body - 请求体 {username: string, password: string}
 * @returns {Object} response - 响应体 {success: boolean, message: string, data: Object}
 * @calls FUNC-VERIFY-USER-CREDENTIALS
 * 
 * 验证用户凭据并返回登录结果
 */
router.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 前端验证已经完成，这里进行后端验证
    if (!username || !password) {
      return res.json(errorResponse('用户名和密码不能为空', 400));
    }

    if (password.length < 6) {
      return res.json(errorResponse('密码长度不能少于6位！', 400));
    }

    // 调用 FUNC-VERIFY-USER-CREDENTIALS
    const user = await verifyUserCredentials(username, password);

    if (!user) {
      return res.json(errorResponse('用户名或密码错误！', 401));
    }

    // 登录成功，返回用户信息（不包含敏感信息）
    return res.json(successResponse({
      username: user.username,
      email: user.email,
      phone: user.phone
    }, '登录成功'));

  } catch (error) {
    console.error('登录错误:', error);
    return res.json(errorResponse('服务器错误，请稍后再试', 500));
  }
});

/**
 * @api API-SEND-VERIFICATION-CODE POST /api/auth/send-code
 * @summary 发送短信验证码接口
 * @param {Object} body - 请求体 {username: string, idCardLast4: string}
 * @returns {Object} response - 响应体 {success: boolean, message: string}
 * @calls FUNC-VERIFY-ID-CARD, FUNC-CHECK-VERIFICATION-RATE-LIMIT, FUNC-GENERATE-VERIFICATION-CODE
 * 
 * 验证证件号并发送验证码
 */
router.post('/auth/send-code', async (req, res) => {
  try {
    const { username, idCardLast4 } = req.body;

    if (!username || !idCardLast4) {
      return res.json(errorResponse('用户名和证件号不能为空', 400));
    }

    if (idCardLast4.length !== 4) {
      return res.json(errorResponse('请输入登录账号绑定的证件号后4位', 400));
    }

    // 检查频率限制
    const isRateLimited = await checkVerificationRateLimit(username);
    if (isRateLimited) {
      return res.json(errorResponse('请求验证码过于频繁，请稍后再试！', 429));
    }

    // 验证证件号
    const isValid = await verifyIdCard(username, idCardLast4);
    if (!isValid) {
      return res.json(errorResponse('请输入正确的用户信息！', 400));
    }

    // 生成验证码
    const code = await generateVerificationCode(username);
    
    // 在实际应用中，这里应该调用短信服务发送验证码
    // 为了测试，我们将验证码输出到控制台
    console.log(`📱 验证码已发送到用户 ${username}: ${code}`);

    return res.json(successResponse(null, '获取手机验证码成功！'));

  } catch (error) {
    console.error('发送验证码错误:', error);
    return res.json(errorResponse('服务器错误，请稍后再试', 500));
  }
});

/**
 * @api API-VERIFY-CODE POST /api/auth/verify-code
 * @summary 验证短信验证码接口
 * @param {Object} body - 请求体 {username: string, idCardLast4: string, code: string}
 * @returns {Object} response - 响应体 {success: boolean, message: string}
 * @calls FUNC-VERIFY-CODE
 * 
 * 验证短信验证码
 */
router.post('/auth/verify-code', async (req, res) => {
  try {
    const { username, idCardLast4, code } = req.body;

    if (!idCardLast4 || idCardLast4.length !== 4) {
      return res.json(errorResponse('请输入登录账号绑定的证件号后4位', 400));
    }

    if (!code) {
      return res.json(errorResponse('请输入验证码', 400));
    }

    if (code.length !== 6) {
      return res.json(errorResponse('请输入正确的验证码', 400));
    }

    // 验证验证码
    const result = await verifyCode(username, code);

    if (!result.valid) {
      return res.json(errorResponse(result.message, 400));
    }

    // 验证成功
    return res.json(successResponse(null, '验证通过，登录成功'));

  } catch (error) {
    console.error('验证码验证错误:', error);
    return res.json(errorResponse('服务器错误，请稍后再试', 500));
  }
});

export default router;

