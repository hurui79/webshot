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
    if(req.query.id && req.query.id != ''){
        var filename = uuidv1() + '.png';
        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setViewport({width:365,height:667,deviceScaleFactor:0.5});
            await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
            await page.goto(config.H5url + "VCard/VCard/?CardID="+req.query.id);
            await page.screenshot({path: filename});
            await browser.close();
            var imageBuf = await fs.readFileSync(filename);
            await http.postSync(config.api,{ "base64" : imageBuf.toString("base64") , "CardID":req.query.id}).then(function (result) {
                res.json(result);
            });
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
    
});


module.exports = apiRoutes;
