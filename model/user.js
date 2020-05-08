//创建用户集合

//引入mongoose第三方模块
const mongoose = require('mongoose');
//导入bcrypt
const bcrypt = require('bcryptjs');
//引入joi模块
const Joi = require('joi');

//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        //保证邮箱唯一不重复
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        //admin 管理员
        //normal 普通用户
        type: String,
        required: true
    },
    state: {
        type: Number,
        //0代表启用，1代表禁用
        default: 0
    }
});
//创建集合
const User = mongoose.model('User', userSchema);
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'test',
        email: 'favours@gmail.com',
        password: pass,
        role: 'admin',
        state: 0
    })
}

//验证用户信息
const validateUser = (user) => {
    const schema = {
        //定义对象的验证规则
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合要求')),
        email: Joi.string().email().error(new Error('邮箱不符合要求')),
        password: Joi.string().regex(/^[a-zA-z0-9]{3,30}$/).required().error(new Error('密码不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态码非法'))
    };
    //实施验证
    return Joi.validate(user, schema);
}
// createUser();
// User.create({
//     username: 'test',
//     email: 'favours@gmail.com',
//     password: '123456',
//     role: 'admin',
//     state: 0
// }).then(() => {
//     console.log('用户创建成功');
// }).catch(() => {
//     console.log('用户创建失败');
// })

//将用户集合作为模块成员进行导出
module.exports = {
    User: User,
    validateUser: validateUser

}