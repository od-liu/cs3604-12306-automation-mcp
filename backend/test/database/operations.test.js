/**
 * Backend Functions 单元测试
 * 测试 validateLogin, sendSmsCode, verifySmsCode 函数
 */

const { describe, it, expect, beforeAll, afterAll, beforeEach } = require('vitest');
const path = require('path');
const { 
  createTestDb, 
  initTestDatabase, 
  cleanupTestData, 
  insertTestData, 
  closeTestDb,
  TEST_DB_PATH 
} = require('../utils/testDb');
const { validateLogin, sendSmsCode, verifySmsCode } = require('../../src/database/operations');

// 设置测试数据库路径环境变量
process.env.TEST_DB_PATH = TEST_DB_PATH;

// 清除 require 缓存，强制重新加载 db.js 以使用测试数据库
delete require.cache[require.resolve('../../src/database/db.js')];

beforeAll(async () => {
  await createTestDb();
  await initTestDatabase();
});

afterAll(async () => {
  await closeTestDb();
  // 清除环境变量
  delete process.env.TEST_DB_PATH;
  // 清除 require 缓存
  delete require.cache[require.resolve('../../src/database/db.js')];
});

beforeEach(async () => {
  await cleanupTestData();
  await insertTestData();
  // 每次测试前重新加载 db.js 以确保使用测试数据库
  delete require.cache[require.resolve('../../src/database/db.js')];
  delete require.cache[require.resolve('../../src/database/operations.js')];
});

describe('validateLogin', () => {
  it('应该返回失败当用户名未注册', async () => {
    const result = await validateLogin('nonexistent', 'password123');
    expect(result.success).toBe(false);
    expect(result.message).toBe('用户名或密码错误！');
  });

  it('应该返回失败当密码错误', async () => {
    const result = await validateLogin('testuser', 'wrongpassword');
    expect(result.success).toBe(false);
    expect(result.message).toBe('用户名或密码错误！');
  });

  it('应该返回成功当用户名和密码正确', async () => {
    const result = await validateLogin('testuser', 'password123');
    expect(result.success).toBe(true);
    expect(result.userId).toBe(1);
    expect(result.username).toBe('testuser');
  });

  it('应该支持邮箱登录', async () => {
    const result = await validateLogin('test@example.com', 'password123');
    expect(result.success).toBe(true);
    expect(result.userId).toBe(1);
  });

  it('应该支持手机号登录', async () => {
    const result = await validateLogin('13800138000', 'password123');
    expect(result.success).toBe(true);
    expect(result.userId).toBe(1);
  });
});

describe('sendSmsCode', () => {
  it('应该返回失败当用户不存在', async () => {
    const result = await sendSmsCode(999, '1234');
    expect(result.success).toBe(false);
    expect(result.message).toBe('用户不存在');
  });

  it('应该返回失败当证件号错误', async () => {
    const result = await sendSmsCode(1, '9999');
    expect(result.success).toBe(false);
    expect(result.message).toBe('请输入正确的用户信息！');
  });

  it('应该返回成功当证件号正确', async () => {
    const result = await sendSmsCode(1, '1234');
    expect(result.success).toBe(true);
    expect(result.code).toBeDefined();
    expect(result.code.length).toBe(6);
  });
});

describe('verifySmsCode', () => {
  it('应该返回失败当用户不存在', async () => {
    const result = await verifySmsCode(999, '1234', '123456');
    expect(result.success).toBe(false);
    expect(result.message).toBe('用户不存在');
  });

  it('应该返回失败当证件号错误', async () => {
    const result = await verifySmsCode(1, '9999', '123456');
    expect(result.success).toBe(false);
    expect(result.message).toBe('请输入正确的用户信息！');
  });

  it('应该返回失败当验证码错误', async () => {
    // 先发送验证码
    const sendResult = await sendSmsCode(1, '1234');
    expect(sendResult.success).toBe(true);
    
    // 使用错误的验证码
    const verifyResult = await verifySmsCode(1, '1234', '999999');
    expect(verifyResult.success).toBe(false);
    expect(verifyResult.message).toBe('很抱歉，您输入的短信验证码有误。');
  });

  it('应该返回成功当验证码正确', async () => {
    // 先发送验证码
    const sendResult = await sendSmsCode(1, '1234');
    expect(sendResult.success).toBe(true);
    
    // 验证验证码
    const verifyResult = await verifySmsCode(1, '1234', sendResult.code);
    expect(verifyResult.success).toBe(true);
    expect(verifyResult.data).toBeDefined();
    expect(verifyResult.data.userId).toBe(1);
  });
});
