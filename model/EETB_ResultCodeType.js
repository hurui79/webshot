var model = {
 // 正常返回
 "Success" :  "200",

 //内部请求出错
 "Error":"500",

 //参数错误
 "ParamsError":"2000.1",

 //寻址错误
 "ApiManageError":"2000.2", 

 //反序列化失败(内部方法)
 "DeserializeFailInternal":"2100.2",

 //反序列化失败(外部接口调用)
 "DeserializeFailExternal":"2100.3",

 //未知错误编码
 "UndefinedError":"2100.4",

 //不合法 用于验证朋友关系等
 "Wrongful":"2100.5"
};


module.exports = model;