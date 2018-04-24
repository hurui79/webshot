// 获取一个 express 的路由实例
var express = require('express');
var apiRoutes = express.Router();
var webshot = require('./webshot');//截图接口


apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

//v1版本所有接口
apiRoutes.use('/webshot',webshot);


module.exports = apiRoutes;