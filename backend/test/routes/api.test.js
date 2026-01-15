/**
 * API Routes Integration Tests
 * Test API endpoints for authentication and verification
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiRouter from '../../src/routes/api.js';
import { getDb } from '../../src/database/db.js';

// Create test app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', apiRouter);

let testUserId;

describe('API Integration Tests', () => {
  beforeAll(async () => {
    // Ensure test database is ready
    const db = getDb();
    const user = await db.getAsync('SELECT id FROM users WHERE username = ?', 'testuser');
    testUserId = user.id;
  });

  beforeEach(async () => {
    // Clean up sessions
    const db = getDb();
    await db.runAsync('DELETE FROM sessions');
    // Clean up ALL registration-related verification codes (by phone)
    await db.runAsync("DELETE FROM verification_codes WHERE phone IS NOT NULL AND (phone LIKE '13800138%' OR phone LIKE '13900139%')");
    // Clean up ALL test registration users (but keep testuser and admin)
    await db.runAsync("DELETE FROM users WHERE (username LIKE 'testreg%' OR (phone IS NOT NULL AND (phone LIKE '13800138%' OR phone LIKE '13900139%'))) AND username NOT IN ('testuser', 'admin')");
  });

  describe('API-LOGIN: POST /api/auth/login', () => {
    it('应该接受有效的用户名和密码', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.userId).toBeDefined();
      expect(typeof response.body.userId).toBe('number');
    });

    it('应该接受邮箱登录', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'test@12306.cn',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('应该接受手机号登录', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: '13800138000',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('应该拒绝错误的用户名', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'nonexistent',
          password: 'password123'
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('用户名或密码错误！');
    });

    it('应该拒绝错误的密码', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('用户名或密码错误！');
    });

    it('应该拒绝空用户名', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: '',
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('用户名');
    });

    it('应该拒绝空密码', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: ''
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('密码');
    });
  });

  describe('API-SEND-VERIFICATION-CODE: POST /api/auth/send-verification-code', () => {
    it('应该为有效用户发送验证码', async () => {
      const response = await request(app)
        .post('/api/auth/send-verification-code')
        .send({
          userId: testUserId,
          idCardLast4: '1234'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('成功');
    });

    it('应该拒绝错误的证件号', async () => {
      const response = await request(app)
        .post('/api/auth/send-verification-code')
        .send({
          userId: testUserId,
          idCardLast4: '9999'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('请输入正确的用户信息！');
    });

    it('应该拒绝缺少userId', async () => {
      const response = await request(app)
        .post('/api/auth/send-verification-code')
        .send({
          idCardLast4: '1234'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('应该拒绝缺少idCardLast4', async () => {
      const response = await request(app)
        .post('/api/auth/send-verification-code')
        .send({
          userId: testUserId
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('API-VERIFY-CODE: POST /api/auth/verify-code', () => {
    let verificationCode;

    beforeEach(async () => {
      // Clean up old verification codes for this user first
      const db = getDb();
      await db.runAsync('DELETE FROM verification_codes WHERE user_id = ?', testUserId);
      
      // Wait a bit to ensure cleanup is complete
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Generate a verification code first
      const response = await request(app)
        .post('/api/auth/send-verification-code')
        .send({
          userId: testUserId,
          idCardLast4: '1234'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Extract code from database
      const codeRecord = await db.getAsync(
        'SELECT code FROM verification_codes WHERE user_id = ?',
        testUserId
      );
      
      if (!codeRecord) {
        // Retry once
        await new Promise(resolve => setTimeout(resolve, 100));
        const retryRecord = await db.getAsync(
          'SELECT code FROM verification_codes WHERE user_id = ?',
          testUserId
        );
        if (!retryRecord) {
          throw new Error('Failed to generate verification code after retry');
        }
        verificationCode = retryRecord.code;
      } else {
        verificationCode = codeRecord.code;
      }
    });

    it('应该接受正确的验证码', async () => {
      const response = await request(app)
        .post('/api/auth/verify-code')
        .send({
          userId: testUserId,
          code: verificationCode
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.token).toBeDefined();
    });

    it('应该拒绝错误的验证码', async () => {
      const response = await request(app)
        .post('/api/auth/verify-code')
        .send({
          userId: testUserId,
          code: '000000'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('错误');
    });

    it('应该拒绝缺少userId', async () => {
      const response = await request(app)
        .post('/api/auth/verify-code')
        .send({
          code: verificationCode
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('应该拒绝缺少code', async () => {
      const response = await request(app)
        .post('/api/auth/verify-code')
        .send({
          userId: testUserId
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('API-REGISTER: POST /api/auth/register', () => {
    it('应该成功注册新用户', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testreg001',
          password: 'password123',
          name: '测试用户',
          idType: '1',
          idNumber: '110101199001011234',
          phone: '13900139001',
          email: 'testreg001@12306.cn',
          passengerType: '1'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.userId).toBeDefined();
      expect(response.body.message).toContain('注册成功');
    });

    it('应该拒绝缺少必填字段', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testreg002',
          password: 'password123'
          // Missing required fields
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('不能为空');
    });

    it('应该拒绝无效的用户名格式', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: '123test', // Invalid: doesn't start with letter
          password: 'password123',
          name: '测试用户',
          idType: '1',
          idNumber: '110101199001011234',
          phone: '13900139002'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('应该拒绝无效的手机号格式', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testreg003',
          password: 'password123',
          name: '测试用户',
          idType: '1',
          idNumber: '110101199001011234',
          phone: '1234567890' // Invalid format
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('应该拒绝已存在的用户名', async () => {
      // First registration
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testreg004',
          password: 'password123',
          name: '测试用户1',
          idType: '1',
          idNumber: '110101199001011234',
          phone: '13900139003'
        });

      // Try to register with same username
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testreg004',
          password: 'password456',
          name: '测试用户2',
          idType: '1',
          idNumber: '110101199001011235',
          phone: '13900139004'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('已被注册');
    });
  });

  describe('API-SEND-REGISTRATION-CODE: POST /api/auth/send-registration-code', () => {
    it('应该成功发送注册验证码', async () => {
      const response = await request(app)
        .post('/api/auth/send-registration-code')
        .send({
          phoneNumber: '13800138010',
          userData: {
            username: 'testreg005',
            password: 'password123',
            name: '测试用户',
            idType: '1',
            idNumber: '110101199001011234',
            phone: '13900139010'
          }
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('已发送');
    });

    it('应该拒绝缺少手机号', async () => {
      const response = await request(app)
        .post('/api/auth/send-registration-code')
        .send({
          userData: {}
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('应该拒绝无效的手机号格式', async () => {
      const response = await request(app)
        .post('/api/auth/send-registration-code')
        .send({
          phoneNumber: '1234567890',
          userData: {}
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('应该拒绝已注册的手机号', async () => {
      // First register a user
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testreg006',
          password: 'password123',
          name: '测试用户',
          idType: '1',
          idNumber: '110101199001011234',
          phone: '13900139011'
        });

      // Try to send code for already registered phone
      const response = await request(app)
        .post('/api/auth/send-registration-code')
        .send({
          phoneNumber: '13800138011',
          userData: {}
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('已被注册');
    });
  });

  describe('API-VERIFY-REGISTRATION-CODE: POST /api/auth/verify-registration-code', () => {
    let verificationCode;
    const phoneNumber = '13900139999'; // Use different phone number to avoid conflicts

    beforeEach(async () => {
      // Send verification code first
      await request(app)
        .post('/api/auth/send-registration-code')
        .send({
          phoneNumber: phoneNumber,
          userData: {
            username: 'testreg007',
            password: 'password123',
            name: '测试用户',
            idType: '1',
            idNumber: '110101199001011234',
            phone: phoneNumber,
            email: 'testreg007@12306.cn',
            passengerType: '1'
          }
        });

      // Extract code from database
      const db = getDb();
      const codeRecord = await db.getAsync(
        'SELECT code FROM verification_codes WHERE phone = ?',
        phoneNumber
      );
      verificationCode = codeRecord.code;
    });

    it('应该成功验证注册验证码并完成注册', async () => {
      const response = await request(app)
        .post('/api/auth/verify-registration-code')
        .send({
          phoneNumber: phoneNumber,
          code: verificationCode
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.userId).toBeDefined();
      expect(response.body.message).toContain('注册完成');

      // Verify user was created
      const db = getDb();
      const user = await db.getAsync('SELECT * FROM users WHERE id = ?', response.body.userId);
      expect(user).toBeDefined();
      expect(user.username).toBe('testreg007');
      expect(user.phone).toBe(phoneNumber);
    });

    it('应该拒绝错误的验证码', async () => {
      const response = await request(app)
        .post('/api/auth/verify-registration-code')
        .send({
          phoneNumber: phoneNumber,
          code: '000000'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('错误或已过期');
    });

    it('应该拒绝缺少手机号', async () => {
      const response = await request(app)
        .post('/api/auth/verify-registration-code')
        .send({
          code: verificationCode
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('应该拒绝缺少验证码', async () => {
      const response = await request(app)
        .post('/api/auth/verify-registration-code')
        .send({
          phoneNumber: phoneNumber
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});


