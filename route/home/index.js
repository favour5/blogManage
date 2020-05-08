const { Article } = require('../../model/article')
//引入分页模块
const pagenation = require('mongoose-sex-page');

module.exports = async (req, res) => {
    //接收客户端传递来的页码
    const page = req.query.page;

    //从数据库中查询数据
    let result = await pagenation(Article).page(page).size(4).display(5).find().populate('author').exec();
    //渲染模板并传递数据
    res.render('home/default', {
        result: result,

    })
}