// API 路由 -------------------

// 获取一个 express 的路由实例
var express = require('express');
var apiRoutes = express.Router();
var resCodeType = require('../model/EETB_ResultCodeType'); 
var fs = require("fs");
var http = require('../Utils/http');
const config = require('../config');
const puppeteer = require('puppeteer');
const uuidv1 = require('uuid/v1');//根据时间戳生成 uuid


apiRoutes.get('/', function(req, res) {
    try{
        if(req.query.id && req.query.id != ''){
            var filename = uuidv1() + '.png';
            (async () => {
                //创建浏览器
                const browser = await puppeteer.launch();
                //打开新页面
                const page = await browser.newPage();
                //设置窗口大小，宽:320,高：568，缩放百分之50%
                await page.setViewport({width:320,height:568,deviceScaleFactor:0.5});
                //设置浏览器User-Agent模拟浏览器情况，这里是模拟iphone5
                await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1');
                //跳转页面
                await page.goto(config.H5url + "VCard/VCard/DetailForRenderImg/?CardID="+req.query.id);
                //截图
                await page.screenshot({path: filename});
                //关闭浏览器
                await browser.close();
                //读取截图文件
                var imageBuf = await fs.readFileSync(filename);
                //将图片文件转化成base64后，post请求api接口，完成后面的逻辑。
                await http.postSync(config.api,{ "base64" : imageBuf.toString("base64") , "CardID":req.query.id}).then(function (result) {
                    res.json(result);
                });
                //删除文件
                await fs.unlink(filename,function (err) {
                    if(err) {
                        console.error(err)
                    } ;
                    console.log('成功')
                })
            })();
        }
        else{
            res.json({ ResultCode: resCodeType.ParamsError,ResultMessage:'',ResultValue:'' });
        }
    }
    catch(e){
        var errorMsg = '\n'
      + 'Error ' + new Date().toISOString() + ' ' + req.url
      + '\n'
      + err.stack || err.message || 'unknow error'
      + '\n';
        console.error(errorMsg);
        try {
            res.end(e.stack);
        } catch(e) { }
    }
});

apiRoutes.get('/Ep', function(req, res) {
    try{
        if(req.query.id && req.query.id != ''){
            var filename = uuidv1() + '.png';
            (async () => {
                //创建浏览器
                const browser = await puppeteer.launch();
                //打开新页面
                const page = await browser.newPage();
                //设置窗口大小，宽:320,高：568，缩放百分之50%
                await page.setViewport({width:320,height:568,deviceScaleFactor:0.5});
                //设置浏览器User-Agent模拟浏览器情况，这里是模拟iphone5
                await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1');
                //跳转页面
                await page.goto(config.H5url + "VCard/VCardEp/DetailForRenderImg/?CardID="+req.query.id);
                //截图
                await page.screenshot({path: filename});
                //关闭浏览器
                await browser.close();
                //读取截图文件
                var imageBuf = await fs.readFileSync(filename);
                //将图片文件转化成base64后，post请求api接口，完成后面的逻辑。
                await http.postSync(config.api,{ "base64" : imageBuf.toString("base64") , "CardID":req.query.id}).then(function (result) {
                    res.json(result);
                });
                //删除文件
                await fs.unlink(filename,function (err) {
                    if(err) {
                        console.error(err)
                    } ;
                    console.log('成功')
                })
            })();
        }
        else{
            res.json({ ResultCode: resCodeType.ParamsError,ResultMessage:'',ResultValue:'' });
        }
    }
    catch(e){
        var errorMsg = '\n'
        + 'Error ' + new Date().toISOString() + ' ' + req.url
        + '\n'
        + err.stack || err.message || 'unknow error'
        + '\n';
          console.error(errorMsg);
          try {
              res.end(e.stack);
          } catch(e) { }
    } 
});


module.exports = apiRoutes;
