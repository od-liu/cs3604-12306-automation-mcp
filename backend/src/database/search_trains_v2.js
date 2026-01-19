/**
 * 车次搜索 V2 - 使用新的区间座位管理系统
 */

import { getDb } from './db.js';
import { countAvailableSeats } from './seat_management.js';

/**
 * 搜索车次（使用区间座位管理）
 * @param {string} fromCity - 出发城市
 * @param {string} toCity - 到达城市
 * @param {string} departureDate - 出发日期
 * @param {boolean} isStudent - 是否学生票
 * @param {boolean} isHighSpeed - 是否只查高铁/动车
 * @returns {Promise<Object>} 搜索结果
 */
export async function searchTrainsV2(fromCity, toCity, departureDate, isStudent = false, isHighSpeed = false) {
  const db = getDb();
  
  console.log(`🔍 [车次搜索V2] ${fromCity} → ${toCity}, 日期: ${departureDate}`);
  
  try {
    // 1. 获取当前时间（过滤已发车车次）
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);
    const isToday = departureDate === currentDate;
    
    // 2. 查询车次基本信息
    let query = `
      SELECT 
        t.id as train_id,
        t.train_number,
        t.train_type,
        s1.station_name as departure_station,
        s2.station_name as arrival_station,
        c1.city_name as departure_city,
        c2.city_name as arrival_city,
        t.departure_time,
        t.arrival_time,
        t.duration,
        t.arrival_day
      FROM trains t
      JOIN stations s1 ON t.departure_station_id = s1.id
      JOIN stations s2 ON t.arrival_station_id = s2.id
      JOIN cities c1 ON s1.city_id = c1.id
      JOIN cities c2 ON s2.city_id = c2.id
      WHERE c1.city_name = ? AND c2.city_name = ? AND t.is_active = 1
    `;
    
    const params = [fromCity, toCity];
    
    if (isToday) {
      query += ` AND t.departure_time > ?`;
      params.push(currentTime);
    }
    
    if (isHighSpeed) {
      query += ` AND (t.train_type = 'GC' OR t.train_type = 'D')`;
    }
    
    query += ` ORDER BY t.departure_time`;
    
    const trains = await db.allAsync(query, ...params);
    
    if (!trains || trains.length === 0) {
      console.log(`📭 [车次搜索V2] 未找到符合条件的车次`);
      return { success: true, trains: [] };
    }
    
    console.log(`📊 [车次搜索V2] 找到 ${trains.length} 个车次`);
    
    // 3. 获取每个车次的班次和余票信息
    const trainsWithSeats = [];
    
    for (const train of trains) {
      // 获取班次
      const schedule = await db.getAsync(`
        SELECT id FROM train_schedules
        WHERE train_id = ? AND departure_date = ?
      `, train.train_id, departureDate);
      
      if (!schedule) {
        console.warn(`⚠️  车次 ${train.train_number} 在 ${departureDate} 没有班次`);
        continue;
      }
      
      // 获取起止站点序号
      const fromStop = await db.getAsync(`
        SELECT ts.stop_sequence
        FROM train_stops ts
        JOIN stations s ON ts.station_id = s.id
        WHERE ts.train_id = ? AND s.station_name = ?
      `, train.train_id, train.departure_station);
      
      const toStop = await db.getAsync(`
        SELECT ts.stop_sequence
        FROM train_stops ts
        JOIN stations s ON ts.station_id = s.id
        WHERE ts.train_id = ? AND s.station_name = ?
      `, train.train_id, train.arrival_station);
      
      if (!fromStop || !toStop) {
        console.warn(`⚠️  车次 ${train.train_number} 缺少站点序号信息`);
        continue;
      }
      
      // 🆕 使用区间座位管理计算余票
      const secondClassCount = await countAvailableSeats(
        schedule.id,
        fromStop.stop_sequence,
        toStop.stop_sequence,
        '二等座'
      );
      
      const firstClassCount = await countAvailableSeats(
        schedule.id,
        fromStop.stop_sequence,
        toStop.stop_sequence,
        '一等座'
      );
      
      const businessClassCount = await countAvailableSeats(
        schedule.id,
        fromStop.stop_sequence,
        toStop.stop_sequence,
        '商务座'
      );
      
      // 获取价格
      const prices = await db.allAsync(`
        SELECT seat_type, price
        FROM schedule_seats
        WHERE schedule_id = ? AND seat_type IN ('二等座', '一等座', '商务座')
        GROUP BY seat_type, price
      `, schedule.id);
      
      const priceMap = {};
      prices.forEach(p => {
        priceMap[p.seat_type] = p.price;
      });
      
      // 格式化座位信息
      const seatsObj = {
        '二等座': secondClassCount === 0 ? '无' : (secondClassCount >= 20 ? '有' : secondClassCount.toString()),
        '一等座': firstClassCount === 0 ? '无' : (firstClassCount >= 20 ? '有' : firstClassCount.toString()),
        '商务座': businessClassCount === 0 ? '无' : (businessClassCount >= 20 ? '有' : businessClassCount.toString()),
        '二等座_price': priceMap['二等座'] || 662,
        '一等座_price': priceMap['一等座'] || 1060,
        '商务座_price': priceMap['商务座'] || 2318
      };
      
      trainsWithSeats.push({
        trainNumber: train.train_number,
        trainType: train.train_type,
        departureStation: train.departure_station,
        arrivalStation: train.arrival_station,
        departureCity: train.departure_city,
        arrivalCity: train.arrival_city,
        departureTime: train.departure_time,
        arrivalTime: train.arrival_time,
        duration: train.duration,
        arrivalDay: train.arrival_day === 0 ? '当日到达' : '次日到达',
        seats: seatsObj,
        supportsStudent: true
      });
    }
    
    console.log(`✅ [车次搜索V2] 返回 ${trainsWithSeats.length} 个车次（含余票信息）`);
    
    return {
      success: true,
      trains: trainsWithSeats
    };
    
  } catch (error) {
    console.error('❌ [车次搜索V2] 失败:', error);
    return {
      success: false,
      message: '查询失败，请稍后再试'
    };
  }
}
