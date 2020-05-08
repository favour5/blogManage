//导入用户集合构造函数
const { User } = require('../../model/user');
//导入bcrypt
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    //接收请求参数
    const {email, password} = req.body;
    // if(email.trim().length == 0 || password.trim().length == 0) {
    //     res.status(400).send('<h4>邮件地址或密码错误</h4>');
    //     return;
    // }
    if(email.trim().length == 0 || password.trim().length == 0) {
        res.status(400).render('admin/error', {msg: '邮件地址或密码错误'});
        return;
    }
    //根据邮箱地址查询用户信息
    //如果查询到用户，user变量的值是对象类型
    //如果没有查询到用户，user变量为空
    let user = await User.findOne({email: email});
    if(user) {
        //查询到用户,匹配密码是否正确
        let isValid = await bcrypt.compare(password, user.password);
        if(isValid) {
            req.session.username = user.username;
            req.session.role = user.role;
    
            req.app.locals.userInfo = user;
            //判断用户角色
            if(user.role == 'admin') {
                //重定向到用户列表页面
                res.redirect('/admin/user');
            }else {
                //重定向到用户首页
                res.redirect('/home');
            }          
        }else {
            res.status(400).render('admin/error', {msg: '邮箱地址或密码错误'})
        }
    }else {
        //查询不到用户
        res.status(400).render('admin/error', {msg: '邮箱地址或密码错误'})
    }
}

module.exports = login;