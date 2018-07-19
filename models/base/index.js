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

	/**
	 * 根据Id获取详情
	 * @Author   warrenyang@tencent.com
	 * @DateTime 2018-07-19
	 */
	getById(id) {
		return Query(this.querySql.getById, [id])
	}

	/**
	 * 插入一条数据
	 * @Author   warrenyang@tencent.com
	 * @DateTime 2018-07-19
	 * @param    {Array}               params 参数顺序数组
	 */
	insert(params){
		return Query(this.querySql.insert, params)
	}

	/**
	 * 更新一条数据
	 * @Author   warrenyang@tencent.com
	 * @DateTime 2018-07-19
	 * @version  [version]
	 * @param    {Object}               params key-value模式的参数，必须包含id
	 */
	update(params){
		let str = ''
		let valueArr = [] //存值数组
		for(let key in params){
			if(key !== 'id' && key !== 'dbname'){
				str += `,${key} = ? `
				valueArr.push(params[key])
			}
		}
		str = str.replace(',', '')

		// 拼接sql语句，此处要考虑是否有注入风险
		let updateSql = `update ${this.querySql.dbname} set ${str} where id = ?`
		valueArr.push(params.id)

		return Query(updateSql, valueArr);
	}

	/**
	 * 删除一条数据
	 * @Author   warrenyang@tencent.com
	 * @DateTime 2018-07-19
	 */
	delete(id){
		return Query(userSql.delete, [id])
	}
}

module.exports = Base