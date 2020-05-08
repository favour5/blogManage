const { User } = require('../../model/user');
//导入bcrypt
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
    // res.send('ok')
    //接收客户端传递过来的请求参数
    const body = req.body;
    //即将要修改的用户id
    const id = req.query.id;
    
    let user = await User.findOne({_id: id});
    //密码比对
    const isValid = await bcrypt.compare(req.body.password, user.password);
    //密码比对成功
    if(isValid) {
        //将用户信息更新到数据库中
        await User.updateOne({_id: id}, {
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            state: req.body.state 
        })
        //重定向到用户列表页面
        res.redirect('/admin/user');
    }else {
        res.redirect('/admin/user-edit?message=密码比对失败，不能修改用户信息&id=' + id)
    }

}