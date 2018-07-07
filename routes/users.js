var express = require('express');
var router = express.Router();

var User = require('../models/user/index');

router.get('/list', function(req, res, next) {
  let user = new User();

  user.list({
    currentPage: 1,
    pageSize: 20
  }).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.send(`${err}`);
  });

});

router.get('/detail/:id', function(req, res, next) {
	let id = req.params.id

  let user = new User();

  let getUserInfo = async function() {
    let info = await user.userInfo({id: id});
    res.send(info);
  }

  getUserInfo().catch((err) => {
  	res.send(`出错啦! ${err}`);
  });
});

router.get('/add', function(req, res, next) {
  let user = new User();

  let { username, password } = req.query;
  user.add({
  	username: username,
  	password: password
  }).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  });
  
});

router.get('/delete/:id', function(req, res, next) {
	let id = req.params.id

  let user = new User();

  let deleteUser = async function() {
    let info = await user.delete({id: id});
    res.send(info);
  }

  deleteUser().catch((err) => {
  	res.send(`出错啦! ${err}`);
  });
});

module.exports = router;