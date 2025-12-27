/**
 * API 集成测试
 * 测试登录、发送短信验证码、验证短信验证码接口
 */

const { describe, it, expect, beforeAll, afterAll, beforeEach } = require('vitest');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('../../src/routes/auth');
const { 
  createTestDb, 
  initTestDatabase, 
  cleanupTestData, 
  insertTestData, 
  closeTestDb,
  TEST_DB_PATH 
} = require('../utils/testDb');

// 设置测试数据库路径环境变量
process.env.TEST_DB_PATH = TEST_DB_PATH;

// 清除 require 缓存
delete require.cache[require.resolve('../../src/database/db.js')];
delete require.cache[require.resolve('../../src/database/operations.js')];

// 创建测试 Express 应用
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

beforeAll(async () => {
  await createTestDb();
  await initTestDatabase();
});

afterAll(async () => {
  await closeTestDb();
  delete process.env.TEST_DB_PATH;
  delete require.cache[require.resolve('../../src/database/db.js')];
  delete require.cache[require.resolve('../../src/database/operations.js')];
});

beforeEach(async () => {
  await cleanupTestData();
  await insertTestData();
  // 重新加载模块
  delete require.cache[require.resolve('../../src/database/db.js')];
  delete require.cache[require.resolve('../../src/database/operations.js')];
});

describe('POST /api/auth/login', () => {
  it('应该返回400当用户名或密码为空', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: '', password: 'password123' });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('应该返回401当用户名未注册', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'nonexistent', password: 'password123' });
    
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('用户名或密码错误！');
  });

  it('应该返回401当密码错误', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'wrongpassword' });
    
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('用户名或密码错误！');
  });

  it('应该返回200当登录成功', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password123' });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.userId).toBe(1);
    expect(response.body.data.needSmsVerification).toBe(true);
  });

  it('应该支持邮箱登录', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'test@example.com', password: 'password123' });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('应该支持手机号登录', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: '13800138000', password: 'password123' });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});

describe('POST /api/auth/send-sms', () => {
  it('应该返回400当参数不完整', async () => {
    const response = await request(app)
      .post('/api/auth/send-sms')
      .send({ userId: 1 });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('应该返回400当用户不存在', async () => {
    const response = await request(app)
      .post('/api/auth/send-sms')
      .send({ userId: 999, idNumber: '1234' });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('应该返回400当证件号错误', async () => {
    const response = await request(app)
      .post('/api/auth/send-sms')
      .send({ userId: 1, idNumber: '9999' });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('请输入正确的用户信息！');
  });

  it('应该返回200当发送成功', async () => {
    const response = await request(app)
      .post('/api/auth/send-sms')
      .send({ userId: 1, idNumber: '1234' });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.code).toBeDefined();
  });
});

describe('POST /api/auth/verify-sms', () => {
  it('应该返回400当参数不完整', async () => {
    const response = await request(app)
      .post('/api/auth/verify-sms')
      .send({ userId: 1, idNumber: '1234' });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('应该返回400当用户不存在', async () => {
    const response = await request(app)
      .post('/api/auth/verify-sms')
      .send({ userId: 999, idNumber: '1234', smsCode: '123456' });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('应该返回400当证件号错误', async () => {
    const response = await request(app)
      .post('/api/auth/verify-sms')
      .send({ userId: 1, idNumber: '9999', smsCode: '123456' });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('应该返回400当验证码错误', async () => {
    // 先发送验证码
    const sendResponse = await request(app)
      .post('/api/auth/send-sms')
      .send({ userId: 1, idNumber: '1234' });
    
    expect(sendResponse.status).toBe(200);
    
    // 使用错误的验证码
    const verifyResponse = await request(app)
      .post('/api/auth/verify-sms')
      .send({ userId: 1, idNumber: '1234', smsCode: '999999' });
    
    expect(verifyResponse.status).toBe(400);
    expect(verifyResponse.body.success).toBe(false);
  });

  it('应该返回200当验证成功', async () => {
    // 先发送验证码
    const sendResponse = await request(app)
      .post('/api/auth/send-sms')
      .send({ userId: 1, idNumber: '1234' });
    
    expect(sendResponse.status).toBe(200);
    const code = sendResponse.body.code;
    
    // 验证验证码
    const verifyResponse = await request(app)
      .post('/api/auth/verify-sms')
      .send({ userId: 1, idNumber: '1234', smsCode: code });
    
    expect(verifyResponse.status).toBe(200);
    expect(verifyResponse.body.success).toBe(true);
    expect(verifyResponse.body.data).toBeDefined();
  });
});


