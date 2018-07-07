/**
 * User的基本操作类
 * @type {[type]}
 */
var mysql = require('mysql');
var dbConfig = require('../../config/database');
var userSql = require('../../dao/user/index');

// 建立数据库连接池
var pool = mysql.createPool(dbConfig.mysql);

class User {
	/**
	 * 获取用户列表
	 * @Author   warrenyang@tencent.com
	 * @DateTime 2018-07-07
	 */
	list(params) {
		// 分页大小
		let pageSize = params.pageSize || 20;
		// 当前开始查询数
		let from = (params.currentPage ? (params.currentPage - 1) : 0) * pageSize;
		return new Promise((resolve, reject) => {
			// 查询全部用户信息
			pool.getConnection(function(err, connection) {
				connection.query(userSql.queryAll, [from, pageSize], function(err, list) {
	        if(err){
	        	reject(err);
	        	connection.release();
	        }
	        if (list) {
	        	connection.query('select found_rows() as total', function(err, result) {
			        if (result) {
			          var total = result[0].total || 0;
			          result = {
			            list: list,
		              pagination: {
		                currentPage: params.currentPage ? parseInt(params.currentPage) : 0,
		                pageSize: pageSize,
		                total: total
		              }
			          };
			        }
			        resolve(result);
			        connection.release();
			      });
	        }
	      });
			})
		})
	}

	/**
	 * 查询用户信息
	 * @Author   warrenyang@tencent.com
	 * @DateTime 2018-07-07
	 */
	userInfo(params){
		return new Promise((resolve, reject) => {
			// 查询全部用户信息
			pool.getConnection(function(err, connection) {
				connection.query(userSql.queryById, [params.id], function(err, result) {
	        if(err){
	        	reject(err);
	        }
	        if (result) {
	        	resolve(result[0]);
	        }
	        connection.release();
	      });
			})
		})
	}

}

module.exports = User;