const db = require('./db');

/**
 * @description 数据库操作封装
 * 提供常用的数据库CRUD操作函数
 */

/**
 * 查询单条记录
 * @param {string} sql - SQL查询语句
 * @param {Array} params - 查询参数
 * @returns {Promise<Object>} 查询结果
 */
function getOne(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

/**
 * 查询多条记录
 * @param {string} sql - SQL查询语句
 * @param {Array} params - 查询参数
 * @returns {Promise<Array>} 查询结果数组
 */
function getAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

/**
 * 执行插入、更新、删除操作
 * @param {string} sql - SQL语句
 * @param {Array} params - 参数
 * @returns {Promise<Object>} 包含lastID和changes的对象
 */
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          lastID: this.lastID,
          changes: this.changes
        });
      }
    });
  });
}

module.exports = {
  getOne,
  getAll,
  run
};
