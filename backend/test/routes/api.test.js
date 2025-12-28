import { describe, it, expect, beforeAll } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const request = require('supertest');
const express = require('express');
const session = require('express-session');
const apiRouter = require('../../src/routes/api');

// 创建测试应用
function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use(session({
    secret: 'test-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
  app.use('/api', apiRouter);
  return app;
}

describe('API Routes - Login Flow', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  /**
   * API-LOGIN: 测试登录接口
   */
  describe('POST /api/auth/login', () => {
    /**
     * SCENARIO-001: 校验用户名为空
     */
    it('should return error when username is empty', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ username: '', password: 'password123' });
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('不能为空');
    });

    /**
     * SCENARIO-002: 校验密码为空
     */
    it('should return error when password is empty', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: '' });
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('不能为空');
    });

    /**
     * SCENARIO-003: 测试用户名或密码错误
     */
    it('should return error when credentials are invalid', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'wrongpassword' });
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('错误');
    });

    /**
     * 测试登录成功
     */
    it('should return success with requireSms when credentials are valid', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'test123456' });
      
      expect(response.body.success).toBe(true);
      expect(response.body.requireSms).toBe(true);
      expect(response.body.userId).toBeDefined();
    });
  });

  /**
   * API-GET-VERIFICATION-CODE: 测试发送验证码接口
   */
  describe('POST /api/auth/send-verification-code', () => {
    let userId;

    beforeAll(async () => {
      // 先登录获取userId
      const response = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'test123456' });
      userId = response.body.userId;
    });

    /**
     * 测试参数错误
     */
    it('should return error when parameters are missing', async () => {
      const response = await request(app)
        .post('/api/auth/send-verification-code')
        .send({ userId: null, idCardLast4: '' });
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('参数错误');
    });

    /**
     * 测试证件号错误
     */
    it('should return error when idCardLast4 is incorrect', async () => {
      const response = await request(app)
        .post('/api/auth/send-verification-code')
        .send({ userId, idCardLast4: '9999' });
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('请输入正确的用户信息');
    });

    /**
     * 测试发送成功
     */
    it('should return success when idCardLast4 is correct', async () => {
      const response = await request(app)
        .post('/api/auth/send-verification-code')
        .send({ userId, idCardLast4: '1234' });
      
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('成功');
    });
  });

  /**
   * API-VERIFY-SMS: 测试验证验证码接口
   */
  describe('POST /api/auth/verify-sms', () => {
    let userId;
    let agent;

    beforeAll(async () => {
      // 使用agent保持session
      agent = request.agent(app);
      
      // 登录
      const loginResponse = await agent
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'test123456' });
      userId = loginResponse.body.userId;
      
      // 获取验证码
      await agent
        .post('/api/auth/send-verification-code')
        .send({ userId, idCardLast4: '1234' });
    });

    /**
     * 测试参数错误
     */
    it('should return error when parameters are missing', async () => {
      const response = await agent
        .post('/api/auth/verify-sms')
        .send({ userId: null, code: '' });
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('参数错误');
    });

    /**
     * 测试验证码错误
     */
    it('should return error when code is incorrect', async () => {
      const response = await agent
        .post('/api/auth/verify-sms')
        .send({ userId, code: '000000' });
      
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('错误');
    });

    /**
     * 注意：由于验证码是随机生成的，这个测试需要Mock或者在实际环境中获取真实验证码
     * 这里仅测试基本流程，实际验证码验证在集成测试中完成
     */
  });
});
