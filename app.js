//引入express框架
const express = require('express');
//创建网站服务器
const app = express();
//引入path模块
const path = require('path');
//引入express-session模块
const session = require('express-session');
//引入art-template模板引擎
const template = require('art-template');
//引入dateformat第三方模块
const dateFormat = require('dateformat');
//引入body-parser模块，用来处理post请求参数
const bodyPaser = require('body-parser');

//处理post请求参数
app.use(bodyPaser.urlencoded({extended:false}));
//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));
//配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
	cookie: {
		maxAge: 24 * 60 * 60 * 1000
	}
}));
//数据库连接
require('./model/connect')
//设置express框架模板位置
app.set('views', path.join(__dirname, 'views'));
//设置express框架模板默认后缀
app.set('view engine', 'art');
//当模板后缀为art的模板时，所使用的模板引擎
app.engine('art', require('express-art-template'));
//向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

//引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

//拦截请求，判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'))
//为路由匹配请求路径
app.use('/home',home);
app.use('/admin',admin);

// app.use((err, req, res, next) => {
//     //将字符串对象转换为对象类型
//     //Json.parse()
//     const result = JSON.parse(err);
//     res.redirect(`${result.path}?message=${result.message}`)
// })

//监听端口,80默认端口
app.listen(80);
console.log('网站服务器已启动')