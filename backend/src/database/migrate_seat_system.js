/**
 * 座位管理系统数据库迁移脚本
 * 实现区间座位管理功能
 */

import { getDb } from './db.js';

/**
 * 创建新表结构
 */
export async function migrateSeatSystem() {
  const db = getDb();
  
  console.log('🔄 开始座位管理系统数据库迁移...');
  
  try {
    // 1. 创建车次停靠站表
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS train_stops (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        train_id INTEGER NOT NULL,
        station_id INTEGER NOT NULL,
        stop_sequence INTEGER NOT NULL,
        arrival_time TEXT,
        departure_time TEXT,
        stop_duration_min INTEGER DEFAULT 0,
        distance_from_origin_km INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        
        UNIQUE(train_id, stop_sequence),
        UNIQUE(train_id, station_id),
        FOREIGN KEY (train_id) REFERENCES trains(id),
        FOREIGN KEY (station_id) REFERENCES stations(id)
      )
    `);
    console.log('✅ train_stops 表创建成功');
    
    // 2. 创建车厢配置表
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS train_cars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        train_id INTEGER NOT NULL,
        car_number INTEGER NOT NULL,
        car_type TEXT NOT NULL,
        total_seats INTEGER NOT NULL,
        seat_layout TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        
        UNIQUE(train_id, car_number),
        FOREIGN KEY (train_id) REFERENCES trains(id),
        CHECK (car_type IN ('商务座', '一等座', '二等座', '软卧', '硬卧', '硬座', '餐车', '其他'))
      )
    `);
    console.log('✅ train_cars 表创建成功');
    
    // 3. 创建具体座位表（每个班次的所有座位）
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS schedule_seats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        schedule_id INTEGER NOT NULL,
        car_number INTEGER NOT NULL,
        seat_row INTEGER NOT NULL,
        seat_column TEXT NOT NULL,
        seat_number TEXT NOT NULL,
        seat_type TEXT NOT NULL,
        price REAL NOT NULL,
        status TEXT DEFAULT 'available',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        
        UNIQUE(schedule_id, car_number, seat_number),
        FOREIGN KEY (schedule_id) REFERENCES train_schedules(id),
        CHECK (status IN ('available', 'reserved', 'sold')),
        CHECK (seat_column IN ('A', 'B', 'C', 'D', 'E', 'F'))
      )
    `);
    console.log('✅ schedule_seats 表创建成功');
    
    // 4. 创建座位区间锁定表（核心表）
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS seat_segments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        seat_id INTEGER NOT NULL,
        order_id INTEGER NOT NULL,
        from_stop_seq INTEGER NOT NULL,
        to_stop_seq INTEGER NOT NULL,
        status TEXT DEFAULT 'reserved',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY (seat_id) REFERENCES schedule_seats(id),
        FOREIGN KEY (order_id) REFERENCES orders(id),
        CHECK (status IN ('reserved', 'confirmed', 'cancelled')),
        CHECK (to_stop_seq > from_stop_seq)
      )
    `);
    console.log('✅ seat_segments 表创建成功');
    
    // 5. 创建分段票价表（可选，初期可不使用）
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS train_segment_prices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        train_id INTEGER NOT NULL,
        from_stop_seq INTEGER NOT NULL,
        to_stop_seq INTEGER NOT NULL,
        seat_type TEXT NOT NULL,
        price REAL NOT NULL,
        distance_km INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        
        UNIQUE(train_id, from_stop_seq, to_stop_seq, seat_type),
        FOREIGN KEY (train_id) REFERENCES trains(id),
        CHECK (to_stop_seq > from_stop_seq)
      )
    `);
    console.log('✅ train_segment_prices 表创建成功');
    
    // 6. 创建索引（性能优化）
    await db.runAsync(`
      CREATE INDEX IF NOT EXISTS idx_train_stops_lookup 
      ON train_stops(train_id, stop_sequence)
    `);
    
    await db.runAsync(`
      CREATE INDEX IF NOT EXISTS idx_schedule_seats_lookup 
      ON schedule_seats(schedule_id, seat_type, status)
    `);
    
    await db.runAsync(`
      CREATE INDEX IF NOT EXISTS idx_seat_segments_conflict 
      ON seat_segments(seat_id, from_stop_seq, to_stop_seq, status)
    `);
    
    console.log('✅ 索引创建成功');
    
    // 7. 修改 orders 表（添加区间信息）
    // SQLite 不支持 ALTER TABLE ADD COLUMN IF NOT EXISTS，需要检查列是否存在
    const ordersColumns = await db.allAsync(`PRAGMA table_info(orders)`);
    const hasFromStopSeq = ordersColumns.some(col => col.name === 'from_stop_seq');
    const hasToStopSeq = ordersColumns.some(col => col.name === 'to_stop_seq');
    
    if (!hasFromStopSeq) {
      await db.runAsync(`ALTER TABLE orders ADD COLUMN from_stop_seq INTEGER`);
      console.log('✅ orders 表添加 from_stop_seq 字段');
    }
    
    if (!hasToStopSeq) {
      await db.runAsync(`ALTER TABLE orders ADD COLUMN to_stop_seq INTEGER`);
      console.log('✅ orders 表添加 to_stop_seq 字段');
    }
    
    // 8. 修改 order_passengers 表（确保有座位信息字段）
    const orderPassengersColumns = await db.allAsync(`PRAGMA table_info(order_passengers)`);
    const hasSeatId = orderPassengersColumns.some(col => col.name === 'seat_id');
    
    if (!hasSeatId) {
      await db.runAsync(`ALTER TABLE order_passengers ADD COLUMN seat_id INTEGER`);
      console.log('✅ order_passengers 表添加 seat_id 字段');
    }
    
    console.log('');
    console.log('🎉 座位管理系统数据库迁移完成！');
    console.log('');
    console.log('新增表：');
    console.log('  - train_stops (车次停靠站)');
    console.log('  - train_cars (车厢配置)');
    console.log('  - schedule_seats (具体座位)');
    console.log('  - seat_segments (座位区间锁定)');
    console.log('  - train_segment_prices (分段票价)');
    console.log('');
    console.log('修改表：');
    console.log('  - orders (添加 from_stop_seq, to_stop_seq)');
    console.log('  - order_passengers (添加 seat_id)');
    console.log('');
    
    return { success: true };
    
  } catch (error) {
    console.error('❌ 数据库迁移失败:', error);
    throw error;
  }
}

/**
 * 回滚迁移（仅用于开发环境）
 */
export async function rollbackMigration() {
  const db = getDb();
  
  console.log('⚠️  开始回滚座位管理系统迁移...');
  
  try {
    await db.runAsync('DROP TABLE IF EXISTS seat_segments');
    await db.runAsync('DROP TABLE IF EXISTS schedule_seats');
    await db.runAsync('DROP TABLE IF EXISTS train_segment_prices');
    await db.runAsync('DROP TABLE IF EXISTS train_cars');
    await db.runAsync('DROP TABLE IF EXISTS train_stops');
    
    console.log('✅ 回滚完成');
    
  } catch (error) {
    console.error('❌ 回滚失败:', error);
    throw error;
  }
}

// 如果直接执行此文件，则运行迁移
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateSeatSystem()
    .then(() => {
      console.log('✅ 迁移脚本执行成功');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 迁移脚本执行失败:', error);
      process.exit(1);
    });
}
