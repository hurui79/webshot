var request = require('request');
var http = {
    "get":function (url){
        request(url, function (error, response, body) {
            if(error){
                console.error('post failed:', error);
            }
            if (!error && response.statusCode == 200) {
              return response.body;
            }
        })
    },
    post:function(url, requestData){
        request({
            url: url,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: requestData
        }, function(error, response, body) {
            if(error){
                console.error('post failed:', error);
            }
            if (!error && response.statusCode == 200) {
                return response.body;
            }
        }); 
    },
    postSync:function(url, requestData){
        return new Promise((resolve,reject)=>{
            request({
                url: url,
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: requestData
            }, function(error, response, body) {
                if(error){
                    reject('post failed:'+ error);
                }
                if (!error && response.statusCode == 200) {
                    resolve(response.body);
                }
            });
        })
    }
}

module.exports = http;


