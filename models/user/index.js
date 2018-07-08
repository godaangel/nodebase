/**
 * User的基本操作类
 * @type {[type]}
 */
// 引入查询模块
let Query = require('../../libs/query');
let userSql = require('../../dao/user/index');

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

		let getList = async function(){
			let list = await Query(userSql.queryAll, [from, pageSize]);
			let pagination = await Query('select found_rows() as total');
			let result = {
				list: list,
				pagination: {
					currentPage: params.currentPage,
					pageSize: pageSize,
					total: pagination[0].total
				}
			};
			return result;
		}
		return getList();
	}

	/**
	 * 查询用户信息
	 * @Author   warrenyang@tencent.com
	 * @DateTime 2018-07-07
	 */
	userInfo(...params){
		return Query(userSql.queryById, [...params]);
	}

	/**
	 * 新增用户
	 * @Author   warrenyang@tencent.com
	 * @DateTime 2018-07-07
	 */
	add(...params){
		let timestamp = new Date().getTime();
		return Query(userSql.insert, [...params, timestamp, timestamp]);
	}

	/**
	 * 删除用户
	 * @Author   warrenyang@tencent.com
	 * @DateTime 2018-07-07
	 */
	delete(...params){
		return Query(userSql.delete, [...params]);
	}

}

module.exports = User;