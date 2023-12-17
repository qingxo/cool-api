var { getQuery } = require('../src/common/databaseUtil');

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const app = require('../app');
const { generateToken } = require('../src/middleware/jwtCenter');


router.get('/', function (req, res, next) {
    res.render('index', { title: 'test router' });
});

// 使用示例
router.get('/login', (req, res) => {
    // 登录成功后,生成JWT token
    let user = {
        userName: 'kaka',
        carrer: 'it',
        age: '33',
    };
    const token = generateToken(user);
    res.send(`登录成功:${token}`);
});



router.get('/admin', (req, res) => {
    console.log(req.auth);
    res.send(`当前用户是:${req.auth.username}`);
})



module.exports = router;
