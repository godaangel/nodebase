var userSql = {
  insert: 'INSERT INTO user(username,password,create_time,update_time) VALUES(?,?,?,?)',
  update: 'update user set password = ?, update_time = ? where id=?',
  list: 'select SQL_CALC_FOUND_ROWS id,username,password,update_time from user limit ?, ?',
  queryById: 'select * from user where id = ? ',
  delete: 'delete from user where id=?'
};
module.exports = userSql;