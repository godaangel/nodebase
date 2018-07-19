var userSql = {
	dbname: 'user',
  insert: 'INSERT INTO user(username,password,create_time,update_time) VALUES(?,?,?,?)',
  list: 'select SQL_CALC_FOUND_ROWS id,username,password,update_time from user limit ?, ?',
  getById: 'select * from user where id = ? ',
  delete: 'delete from user where id = ?'
}
module.exports = userSql