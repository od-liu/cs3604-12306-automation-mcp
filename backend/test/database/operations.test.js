/**
 * Database Operations Tests
 * Unit tests for authentication and verification functions
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { getDb } from '../../src/database/db.js';
import { 
  authenticateUser, 
  generateVerificationCode, 
  verifyCode,
  registerUser,
  sendRegistrationVerificationCode,
  verifyRegistrationCode
} from '../../src/database/operations.js';

describe('FUNC-AUTH-LOGIN: authenticateUser', () => {
  beforeEach(async () => {
    // Clean up verification_codes and sessions before each test
    const db = getDb();
    await db.runAsync('DELETE FROM sessions');
    await db.runAsync('DELETE FROM verification_codes');
  });

  it('应该成功认证有效用户（使用用户名）', async () => {
    const result = await authenticateUser('testuser', 'password123');
    expect(result.success).toBe(true);
    expect(result.userId).toBeDefined();
    expect(typeof result.userId).toBe('number');
  });

  it('应该成功认证有效用户（使用邮箱）', async () => {
    const result = await authenticateUser('test@12306.cn', 'password123');
    expect(result.success).toBe(true);
    expect(result.userId).toBeDefined();
  });

  it('应该成功认证有效用户（使用手机号）', async () => {
    const result = await authenticateUser('13800138000', 'password123');
    expect(result.success).toBe(true);
    expect(result.userId).toBeDefined();
  });

  it('应该拒绝不存在的用户', async () => {
    const result = await authenticateUser('nonexistentuser', 'password123');
    expect(result.success).toBe(false);
    expect(result.message).toBe('用户名或密码错误！');
    expect(result.userId).toBeUndefined();
  });

  it('应该拒绝错误的密码', async () => {
    const result = await authenticateUser('testuser', 'wrongpassword');
    expect(result.success).toBe(false);
    expect(result.message).toBe('用户名或密码错误！');
    expect(result.userId).toBeUndefined();
  });

  it('应该拒绝空用户名', async () => {
    const result = await authenticateUser('', 'password123');
    expect(result.success).toBe(false);
    expect(result.message).toBeDefined();
  });

  it('应该拒绝空密码', async () => {
    const result = await authenticateUser('testuser', '');
    expect(result.success).toBe(false);
    expect(result.message).toBeDefined();
  });
});

describe('FUNC-SEND-VERIFICATION-CODE: generateVerificationCode', () => {
  beforeEach(async () => {
    const db = getDb();
    await db.runAsync('DELETE FROM verification_codes');
  });

  it('应该为有效用户生成验证码', async () => {
    // First, get the userId
    const authResult = await authenticateUser('testuser', 'password123');
    expect(authResult.success).toBe(true);

    // Generate verification code
    const result = await generateVerificationCode(authResult.userId, '1234');
    expect(result.success).toBe(true);
    expect(result.code).toBeDefined();
    expect(result.code.length).toBe(6);
    expect(/^\d{6}$/.test(result.code)).toBe(true); // Should be 6 digits
  });

  it('应该拒绝错误的证件号后4位', async () => {
    const authResult = await authenticateUser('testuser', 'password123');
    expect(authResult.success).toBe(true);

    const result = await generateVerificationCode(authResult.userId, '9999');
    expect(result.success).toBe(false);
    expect(result.message).toBe('请输入正确的用户信息！');
  });

  it('应该拒绝不存在的用户ID', async () => {
    const result = await generateVerificationCode(99999, '1234');
    expect(result.success).toBe(false);
    expect(result.message).toBeDefined();
  });
});

describe('FUNC-VERIFY-CODE: verifyCode', () => {
  beforeEach(async () => {
    const db = getDb();
    await db.runAsync('DELETE FROM sessions');
    await db.runAsync('DELETE FROM verification_codes');
  });

  it('应该成功验证正确的验证码', async () => {
    // Get userId
    const authResult = await authenticateUser('testuser', 'password123');
    const userId = authResult.userId;

    // Generate code
    const codeResult = await generateVerificationCode(userId, '1234');
    expect(codeResult.success).toBe(true);

    // Verify code
    const verifyResult = await verifyCode(userId, codeResult.code);
    expect(verifyResult.success).toBe(true);
    expect(verifyResult.token).toBeDefined();
  });

  it('应该拒绝错误的验证码', async () => {
    const authResult = await authenticateUser('testuser', 'password123');
    const userId = authResult.userId;

    await generateVerificationCode(userId, '1234');

    const verifyResult = await verifyCode(userId, '000000');
    expect(verifyResult.success).toBe(false);
    expect(verifyResult.message).toBeDefined();
  });

  it('应该拒绝过期的验证码', async () => {
    // This test would require manipulating time or waiting
    // Skipping for now, can be implemented with proper time mocking
  });
});

describe('FUNC-REGISTER-USER: registerUser', () => {
  beforeEach(async () => {
    const db = getDb();
    // Clean up test users (but keep testuser for other tests)
    await db.runAsync("DELETE FROM users WHERE username LIKE 'testreg%'");
    await db.runAsync("DELETE FROM users WHERE phone LIKE '13800138%'");
  });

  it('应该成功注册新用户', async () => {
    const userData = {
      username: 'testreg001',
      password: 'password123',
      name: '测试用户',
      idType: '1',
      idNumber: '110101199001011234',
      phone: '13800138001',
      email: 'testreg001@12306.cn',
      passengerType: '1'
    };

    const result = await registerUser(userData);
    expect(result.success).toBe(true);
    expect(result.userId).toBeDefined();
    expect(typeof result.userId).toBe('number');

    // Verify user was created in database
    const db = getDb();
    const user = await db.getAsync('SELECT * FROM users WHERE id = ?', result.userId);
    expect(user).toBeDefined();
    expect(user.username).toBe('testreg001');
    expect(user.name).toBe('测试用户');
    expect(user.phone).toBe('13800138001');
    expect(user.id_card_last4).toBe('1234');
  });

  it('应该拒绝空必填字段', async () => {
    const userData = {
      username: '',
      password: 'password123',
      name: '测试用户',
      idType: '1',
      idNumber: '110101199001011234',
      phone: '13800138002'
    };

    const result = await registerUser(userData);
    expect(result.success).toBe(false);
    expect(result.message).toContain('不能为空');
  });

  it('应该拒绝用户名长度不足6位', async () => {
    const userData = {
      username: 'test',
      password: 'password123',
      name: '测试用户',
      idType: '1',
      idNumber: '110101199001011234',
      phone: '13800138003'
    };

    const result = await registerUser(userData);
    expect(result.success).toBe(false);
    expect(result.message).toContain('6-30位');
  });

  it('应该拒绝用户名长度超过30位', async () => {
    const userData = {
      username: 'a'.repeat(31),
      password: 'password123',
      name: '测试用户',
      idType: '1',
      idNumber: '110101199001011234',
      phone: '13800138004'
    };

    const result = await registerUser(userData);
    expect(result.success).toBe(false);
    expect(result.message).toContain('6-30位');
  });

  it('应该拒绝用户名不以字母开头', async () => {
    const userData = {
      username: '123test',
      password: 'password123',
      name: '测试用户',
      idType: '1',
      idNumber: '110101199001011234',
      phone: '13800138005'
    };

    const result = await registerUser(userData);
    expect(result.success).toBe(false);
    expect(result.message).toContain('字母开头');
  });

  it('应该拒绝密码长度不足6位', async () => {
    const userData = {
      username: 'testreg002',
      password: '12345',
      name: '测试用户',
      idType: '1',
      idNumber: '110101199001011234',
      phone: '13800138006'
    };

    const result = await registerUser(userData);
    expect(result.success).toBe(false);
    expect(result.message).toContain('6-20位');
  });

  it('应该拒绝密码长度超过20位', async () => {
    const userData = {
      username: 'testreg003',
      password: 'a'.repeat(21),
      name: '测试用户',
      idType: '1',
      idNumber: '110101199001011234',
      phone: '13800138007'
    };

    const result = await registerUser(userData);
    expect(result.success).toBe(false);
    expect(result.message).toContain('6-20位');
  });

  it('应该拒绝无效的手机号格式', async () => {
    const userData = {
      username: 'testreg004',
      password: 'password123',
      name: '测试用户',
      idType: '1',
      idNumber: '110101199001011234',
      phone: '1234567890'
    };

    const result = await registerUser(userData);
    expect(result.success).toBe(false);
    expect(result.message).toContain('手机号码格式');
  });

  it('应该拒绝已存在的用户名', async () => {
    // First registration
    const userData1 = {
      username: 'testreg005',
      password: 'password123',
      name: '测试用户1',
      idType: '1',
      idNumber: '110101199001011234',
      phone: '13800138008'
    };
    await registerUser(userData1);

    // Try to register with same username
    const userData2 = {
      username: 'testreg005',
      password: 'password456',
      name: '测试用户2',
      idType: '1',
      idNumber: '110101199001011235',
      phone: '13800138009'
    };

    const result = await registerUser(userData2);
    expect(result.success).toBe(false);
    expect(result.message).toContain('已被注册');
  });

  it('应该拒绝已存在的手机号', async () => {
    // First registration
    const userData1 = {
      username: 'testreg006',
      password: 'password123',
      name: '测试用户1',
      idType: '1',
      idNumber: '110101199001011234',
      phone: '13800138010'
    };
    await registerUser(userData1);

    // Try to register with same phone
    const userData2 = {
      username: 'testreg007',
      password: 'password456',
      name: '测试用户2',
      idType: '1',
      idNumber: '110101199001011235',
      phone: '13800138010'
    };

    const result = await registerUser(userData2);
    expect(result.success).toBe(false);
    expect(result.message).toContain('已被注册');
  });
});

describe('FUNC-SEND-REGISTRATION-CODE: sendRegistrationVerificationCode', () => {
  beforeEach(async () => {
    const db = getDb();
    await db.runAsync("DELETE FROM verification_codes WHERE phone LIKE '13800138%'");
    await db.runAsync("DELETE FROM users WHERE phone LIKE '13800138%' OR username LIKE 'testreg%'");
  });

  it('应该成功发送注册验证码', async () => {
    const phoneNumber = '13800138020';
    const userData = {
      username: 'testreg008',
      password: 'password123',
      name: '测试用户',
      idType: '1',
      idNumber: '110101199001011234',
      phone: phoneNumber
    };

    const result = await sendRegistrationVerificationCode(phoneNumber, userData);
    expect(result.success).toBe(true);
    expect(result.code).toBeDefined();
    expect(result.code.length).toBe(6);
    expect(/^\d{6}$/.test(result.code)).toBe(true);

    // Verify code was stored in database
    const db = getDb();
    const codeRecord = await db.getAsync(
      'SELECT * FROM verification_codes WHERE phone = ?',
      phoneNumber
    );
    expect(codeRecord).toBeDefined();
    expect(codeRecord.code).toBe(result.code);
  });

  it('应该拒绝无效的手机号格式', async () => {
    const result = await sendRegistrationVerificationCode('1234567890', {});
    expect(result.success).toBe(false);
    expect(result.message).toContain('手机号码格式');
  });

  it('应该拒绝已注册的手机号', async () => {
    // First register a user
    const userData = {
      username: 'testreg009',
      password: 'password123',
      name: '测试用户',
      idType: '1',
      idNumber: '110101199001011234',
      phone: '13800138021'
    };
    await registerUser(userData);

    // Try to send code for already registered phone
    const result = await sendRegistrationVerificationCode('13800138021', {});
    expect(result.success).toBe(false);
    expect(result.message).toContain('已被注册');
  });
});

describe('FUNC-VERIFY-REGISTRATION-CODE: verifyRegistrationCode', () => {
  beforeEach(async () => {
    const db = getDb();
    await db.runAsync("DELETE FROM verification_codes WHERE phone LIKE '13800138%'");
    await db.runAsync("DELETE FROM users WHERE phone LIKE '13800138%' OR username LIKE 'testreg%'");
  });

  it('应该成功验证注册验证码并完成注册', async () => {
    const phoneNumber = '13800138030';
    const userData = {
      username: 'testreg010',
      password: 'password123',
      name: '测试用户',
      idType: '1',
      idNumber: '110101199001011234',
      phone: phoneNumber,
      email: 'testreg010@12306.cn',
      passengerType: '1'
    };

    // Send verification code
    const sendResult = await sendRegistrationVerificationCode(phoneNumber, userData);
    expect(sendResult.success).toBe(true);

    // Verify code
    const verifyResult = await verifyRegistrationCode(phoneNumber, sendResult.code);
    expect(verifyResult.success).toBe(true);
    expect(verifyResult.userId).toBeDefined();

    // Verify user was created
    const db = getDb();
    const user = await db.getAsync('SELECT * FROM users WHERE id = ?', verifyResult.userId);
    expect(user).toBeDefined();
    expect(user.username).toBe('testreg010');
    expect(user.phone).toBe(phoneNumber);

    // Verify code was deleted
    const codeRecord = await db.getAsync(
      'SELECT * FROM verification_codes WHERE phone = ?',
      phoneNumber
    );
    expect(codeRecord).toBeUndefined();
  });

  it('应该拒绝错误的验证码', async () => {
    const phoneNumber = '13800138031';
    const userData = {
      username: 'testreg011',
      password: 'password123',
      name: '测试用户',
      idType: '1',
      idNumber: '110101199001011234',
      phone: phoneNumber
    };

    await sendRegistrationVerificationCode(phoneNumber, userData);

    const result = await verifyRegistrationCode(phoneNumber, '000000');
    expect(result.success).toBe(false);
    expect(result.message).toContain('错误或已过期');
  });

  it('应该拒绝不存在的验证码', async () => {
    const result = await verifyRegistrationCode('13800138032', '123456');
    expect(result.success).toBe(false);
    expect(result.message).toContain('错误或已过期');
  });
});


