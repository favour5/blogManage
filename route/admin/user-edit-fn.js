//引入joi模块
const Joi = require('joi');
//引入用户集合的构造函数
const { User,validateUser } = require('../../model/user')
//引入加密模块
const bcrypt = require('bcryptjs');

module.exports  = async (req, res, next) => {
    try { 
         await validateUser(req.body)
    }catch(ex) {
        //验证未通过
        // ex.message
        //重定向回用户添加页面
        return res.redirect(`/admin/user-edit?message=${ex.message}`)
        // return next(JSON.stringify({path: '/admin/user-edit', message: ex.message}));
    }
   
    //根据邮箱地址查询用户是否已存在
    let user = await User.findOne({email: req.body.email})
    //如果用户已存在
    if(user) {
        //重定向回用户添加页面
        return res.redirect('/admin/user-edit?message=邮箱地址已经被占用')
        // return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址已被占用'}));
    }
    //对密码进行加密处理
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    //替换密码
    req.body.password = password;
    //添加用户信息到数据库
    await User.create(req.body);
    //重定向回用户列表页面
    res.redirect('/admin/user')
}