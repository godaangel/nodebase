let express = require('express');
let router = express.Router();

let User = require('../models/user/index');
let Render = require('../libs/render');

let Md5 = require('../libs/md5');

// let File = require('../libs/file');
// var fs = require('fs');
// var path = require('path');
// //设置日志文件目录
// var logDirectory = path.join(__dirname, '../logs');
// //确保日志文件目录存在 没有则创建
// fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);


router.get('/list', function(req, res, next) {
  let user = new User();
  let getUserList = async function() {
  	let list = await user.list({
	    currentPage: 1,
	    pageSize: 20
	  });
  	Render.success(res, list);
  }
  getUserList().catch((err) => {
  	Render.err(res, err);
  });

});

router.get('/detail/:id', function(req, res, next) {
	let id = req.params.id

  let user = new User();

  let getUserInfo = async function() {
    let info = await user.userInfo(id);
    if(!info[0]){
    	Render.err(res, '没有找到该用户');
    }
    Render.success(res, info[0]);
  }

  getUserInfo().catch((err) => {
    // File.saveFile(`${logDirectory}/error.log`, `${err}`)
  	Render.err(res, err);
  });

});

router.get('/add', function(req, res, next) {
  let user = new User();

  let { username, password } = req.query;

  let addUser = async function() {
  	let info = await user.insert(username, Md5.md5(password));
	  Render.success(res, info);
  }

  addUser().catch((err) => {
  	Render.err(res, err);
  });
 
});

router.get('/delete/:id', function(req, res, next) {
	let id = req.params.id

  let user = new User();

  let deleteUser = async function() {
    let info = await user.delete(id);
    Render.success(res, info);
  }

  deleteUser().catch((err) => {
  	Render.err(res, err);
  });
});

module.exports = router;