/**
 * User的基本操作类
 * @type {[type]}
 */
// 引入查询模块
let Query = require('../../libs/query');
let userSql = require('../../dao/user/index');
let Base = require('../base/index');

class User extends Base{
	constructor() {
    super(userSql)
	}
	
	/**
	 * 获取用户列表, 此处通过Base继承了list方法
	 * @Author   warrenyang@tencent.com
	 * @DateTime 2018-07-07
	 */

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