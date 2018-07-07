/**
 * 对返回值进行处理的函数
 * @Author   warrenyang@tencent.com
 * @DateTime 2018-07-07
 * @version  [version]
 * @param    {[type]}               res     res对象
 * @param    {[type]}               content 返回的内容
 * @param    {String}               type    处理类型 json send等
 */
class Render {
	static success(res, content, type = 'json') {
		res[type]({
			ret: 0,
			msg: 'ok',
			code: 200,
			data: content
		});
	}

	static err(res, content, errCode, type = 'json') {
		res[type]({
			ret: 1,
			msg: `${content}`,
			code: errCode || 1
		})
	}
}

module.exports = Render;