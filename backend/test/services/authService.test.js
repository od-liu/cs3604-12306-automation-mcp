import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { validateCredentials, sendSmsCode, verifySmsCode } = require('../../src/services/authService');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const TEST_DB_PATH = path.join(__dirname, '../../test_database.db');

describe('authService - FUNC-VALIDATE-CREDENTIALS', () => {
  /**
   * SCENARIO-001: 校验用户名为空
   * 测试当用户名不存在时的处理
   */
  it('should return { valid: false } when username does not exist', async () => {
    const result = await validateCredentials('nonexistent', 'password');
    expect(result).toEqual({ valid: false });
  });

  /**
   * SCENARIO-002: 校验密码为空
   * 测试密码错误时的处理
   */
  it('should return { valid: false } when password is incorrect', async () => {
    const result = await validateCredentials('testuser', 'wrongpassword');
    expect(result).toEqual({ valid: false });
  });

  /**
   * SCENARIO-003: 校验密码长度
   * 测试正确的用户名和密码
   */
  it('should return { valid: true, userId } when credentials are correct', async () => {
    const result = await validateCredentials('testuser', 'test123456');
    expect(result.valid).toBe(true);
    expect(result.userId).toBeDefined();
    expect(typeof result.userId).toBe('number');
  });
});

describe('authService - FUNC-SEND-SMS-CODE', () => {
  let testUserId;

  beforeAll(async () => {
    // 获取测试用户ID
    const db = new sqlite3.Database(TEST_DB_PATH);
    testUserId = await new Promise((resolve) => {
      db.get('SELECT id FROM users WHERE username = ?', ['testuser'], (err, row) => {
        db.close();
        resolve(row?.id);
      });
    });
  });

  /**
   * 测试证件号后4位错误
   */
  it('should return error when idCardLast4 is incorrect', async () => {
    const result = await sendSmsCode(testUserId, '9999');
    expect(result.success).toBe(false);
    expect(result.message).toBe('请输入正确的用户信息!');
  });

  /**
   * 测试证件号后4位正确
   */
  it('should return success with code when idCardLast4 is correct', async () => {
    const result = await sendSmsCode(testUserId, '1234');
    expect(result.success).toBe(true);
    expect(result.code).toBeDefined();
    expect(result.code.length).toBe(6);
    expect(result.message).toBe('获取手机验证码成功！');
  });

  /**
   * 测试用户不存在
   */
  it('should return error when userId does not exist', async () => {
    const result = await sendSmsCode(99999, '1234');
    expect(result.success).toBe(false);
    expect(result.message).toBe('用户不存在');
  });
});

describe('authService - FUNC-VERIFY-SMS-CODE', () => {
  /**
   * 测试验证码为空
   */
  it('should return error when session code is empty', async () => {
    const result = await verifySmsCode(1, '123456', null, Date.now() + 60000);
    expect(result.success).toBe(false);
    expect(result.message).toBe('请先获取验证码');
  });

  /**
   * 测试验证码过期
   */
  it('should return error when code is expired', async () => {
    const result = await verifySmsCode(1, '123456', '123456', Date.now() - 1000);
    expect(result.success).toBe(false);
    expect(result.message).toBe('验证码已过期，请重新获取');
  });

  /**
   * 测试验证码错误
   */
  it('should return error when code is incorrect', async () => {
    const result = await verifySmsCode(1, '123456', '654321', Date.now() + 60000);
    expect(result.success).toBe(false);
    expect(result.message).toBe('验证码错误');
  });

  /**
   * 测试验证码正确
   */
  it('should return success with token when code is correct', async () => {
    const result = await verifySmsCode(1, '123456', '123456', Date.now() + 60000);
    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
    expect(typeof result.token).toBe('string');
    expect(result.message).toBe('验证成功');
  });
});

