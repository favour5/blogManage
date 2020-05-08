const { User } = require('../../model/user');

module.exports = async (req, res) => {
    await User.findOneAndDelete({_id: req.query.id});
    //将页面重定向回用户列表页面
    res.redirect('/admin/user')
}