var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var v1 = require('./v1/index');//v1版本接口
var config = require('./config');

// =======================
// 配置 =========
// =======================
var port = process.env.PORT || config.port; // 设置启动端口

//用body parser 来解析post和url信息中的参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 使用 morgan 将请求日志打印到控制台
app.use(morgan('dev'));

// =======================
// 路由 ================
// =======================
// 基础路由
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});
//v1 版本 所有路由
app.use('/api/v1', v1);

// =======================
// 启动服务 ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);