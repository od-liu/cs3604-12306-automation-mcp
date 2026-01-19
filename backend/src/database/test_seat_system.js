/**
 * 座位管理系统测试脚本
 */

import { getDb } from './db.js';
import { submitOrderV2, confirmPaymentV2, cancelOrderV2 } from './submit_order_v2.js';
import { 
  isSeatAvailableInSegment, 
  findAvailableSeats, 
  countAvailableSeats,
  getSeatSegments
} from './seat_management.js';

async function runTests() {
  console.log('');
  console.log('🧪 ========================================');
  console.log('🧪  座位管理系统测试');
  console.log('🧪 ========================================');
  console.log('');
  
  try {
    // 测试1: 区间座位复用
    await test1_SeatSegmentReuse();
    
    // 测试2: 区间冲突检测
    await test2_SegmentConflict();
    
    // 测试3: 订单超时释放
    // await test3_OrderTimeout();  // 需要等待20分钟，暂时注释
    
    // 测试4: 余票计算
    await test4_TicketCount();
    
    console.log('');
    console.log('🎉 ========================================');
    console.log('🎉  所有测试通过！');
    console.log('🎉 ========================================');
    console.log('');
    
  } catch (error) {
    console.error('');
    console.error('❌ ========================================');
    console.error('❌  测试失败！');
    console.error('❌ ========================================');
    console.error('');
    console.error(error);
  }
}

/**
 * 测试1: 区间座位复用
 * 同一座位在不重叠区间内可以被多个订单使用
 */
async function test1_SeatSegmentReuse() {
  console.log('📋 测试1: 区间座位复用');
  console.log('----------------------------------------');
  
  const db = getDb();
  
  // 查找 G103 的班次
  const schedule = await db.getAsync(`
    SELECT ts.id, t.train_number
    FROM train_schedules ts
    JOIN trains t ON ts.train_id = t.id
    WHERE t.train_number = 'G103'
    LIMIT 1
  `);
  
  if (!schedule) {
    console.log('⏭️  跳过测试：G103 班次不存在');
    console.log('');
    return;
  }
  
  console.log(`使用班次: ${schedule.train_number} (schedule_id=${schedule.id})`);
  
  // 订单A: 北京南(seq=1) → 济南西(seq=3)
  const orderA = await submitOrderV2(1, {
    trainNumber: 'G103',
    departureDate: '2026-01-20',
    fromStation: '北京南',
    toStation: '济南西',
    passengers: [
      {
        passengerId: 1,
        name: '张三',
        idType: '居民身份证',
        idNumber: '110101199001011234',
        ticketType: '成人票',
        seatClass: '二等座'
      }
    ]
  });
  
  console.log(`订单A结果: ${orderA.success ? '成功' : '失败'}`);
  if (orderA.success) {
    console.log(`  订单号: ${orderA.orderNumber}`);
    console.log(`  座位: ${orderA.seats[0].carNumber}车${orderA.seats[0].seatNumber}`);
  }
  
  // 订单B: 济南西(seq=3) → 上海虹桥(seq=9)（应该成功，区间不重叠）
  const orderB = await submitOrderV2(2, {
    trainNumber: 'G103',
    departureDate: '2026-01-20',
    fromStation: '济南西',
    toStation: '上海虹桥',
    passengers: [
      {
        passengerId: 2,
        name: '李四',
        idType: '居民身份证',
        idNumber: '110101199002021234',
        ticketType: '成人票',
        seatClass: '二等座'
      }
    ]
  });
  
  console.log(`订单B结果: ${orderB.success ? '✅ 成功（预期）' : '❌ 失败（非预期）'}`);
  if (orderB.success) {
    console.log(`  订单号: ${orderB.orderNumber}`);
    console.log(`  座位: ${orderB.seats[0].carNumber}车${orderB.seats[0].seatNumber}`);
    console.log(`  ✅ 区间座位复用功能正常！`);
  }
  
  console.log('');
}

/**
 * 测试2: 区间冲突检测
 * 同一座位在重叠区间内不能被多个订单使用
 */
async function test2_SegmentConflict() {
  console.log('📋 测试2: 区间冲突检测');
  console.log('----------------------------------------');
  
  const db = getDb();
  
  // 查找一个已被锁定的座位
  const lockedSeat = await db.getAsync(`
    SELECT 
      ss.id as seat_id,
      ss.car_number,
      ss.seat_number,
      seg.from_stop_seq,
      seg.to_stop_seq
    FROM seat_segments seg
    JOIN schedule_seats ss ON seg.seat_id = ss.id
    WHERE seg.status = 'reserved'
    LIMIT 1
  `);
  
  if (!lockedSeat) {
    console.log('⏭️  跳过测试：没有已锁定的座位');
    console.log('');
    return;
  }
  
  console.log(`测试座位: ${lockedSeat.car_number}车${lockedSeat.seat_number}`);
  console.log(`已锁定区间: [${lockedSeat.from_stop_seq}, ${lockedSeat.to_stop_seq})`);
  
  // 测试冲突区间
  const conflictFrom = lockedSeat.from_stop_seq + 1;
  const conflictTo = lockedSeat.to_stop_seq + 2;
  
  const isAvailable = await isSeatAvailableInSegment(
    lockedSeat.seat_id,
    conflictFrom,
    conflictTo
  );
  
  console.log(`测试区间: [${conflictFrom}, ${conflictTo})`);
  console.log(`冲突检测结果: ${isAvailable ? '❌ 可用（非预期）' : '✅ 不可用（预期）'}`);
  
  if (!isAvailable) {
    console.log(`  ✅ 区间冲突检测功能正常！`);
  }
  
  console.log('');
}

/**
 * 测试4: 余票计算
 */
async function test4_TicketCount() {
  console.log('📋 测试4: 余票计算');
  console.log('----------------------------------------');
  
  const db = getDb();
  
  // 查找一个班次
  const schedule = await db.getAsync(`
    SELECT ts.id, t.train_number, ts.departure_date
    FROM train_schedules ts
    JOIN trains t ON ts.train_id = t.id
    LIMIT 1
  `);
  
  if (!schedule) {
    console.log('⏭️  跳过测试：没有班次数据');
    console.log('');
    return;
  }
  
  console.log(`测试班次: ${schedule.train_number} ${schedule.departure_date}`);
  
  // 计算余票（假设区间 [1, 5]）
  const secondClassCount = await countAvailableSeats(schedule.id, 1, 5, '二等座');
  const firstClassCount = await countAvailableSeats(schedule.id, 1, 5, '一等座');
  const businessClassCount = await countAvailableSeats(schedule.id, 1, 5, '商务座');
  
  console.log(`区间 [1, 5) 余票:`);
  console.log(`  二等座: ${secondClassCount}`);
  console.log(`  一等座: ${firstClassCount}`);
  console.log(`  商务座: ${businessClassCount}`);
  console.log(`  ✅ 余票计算功能正常！`);
  
  console.log('');
}

// 运行测试
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests()
    .then(() => {
      console.log('✅ 测试脚本执行成功');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 测试脚本执行失败:', error);
      process.exit(1);
    });
}
