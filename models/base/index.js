/**
 * 基本操作类, 所有的Model的增删改查都可以继承这个类
 * warrenyang@tencent.com
 */

// 引入查询模块
let Query = require('../../libs/query')

class Base {

	constructor(querySql) {
		this.querySql = querySql
	}
	/**
	 * 获取列表
	 * @Author   warrenyang@tencent.com
	 * @DateTime 2018-07-19
	 */
	list(params) {
		let that = this
		// 分页大小
		let pageSize = params.pageSize || 20
		// 当前开始查询数
		let from = (params.currentPage ? (params.currentPage - 1) : 0) * pageSize

		let getList = async function(){
			let list = await Query(that.querySql.list, [from, pageSize])
			let pagination = await Query('select found_rows() as total')
			let result = {
				list: list,
				pagination: {
					currentPage: params.currentPage,
					pageSize: pageSize,
					total: pagination[0].total
				}
			}
			return result
		}
		return getList()
	}
}

module.exports = Base