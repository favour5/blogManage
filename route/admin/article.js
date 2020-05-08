//导入文章集合的构造函数
const { Article } = require('../../model/article');
//引入mongoose-sex-page模块
const pagenation = require('mongoose-sex-page');

module.exports = async (req, res) => {
    //接收客户端传递的页码
    const page = req.query.page;

    //标识，标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    //查询所有文章数据
    // page 指定当前页
	// suze 指定每页显示的数据条数
	// display 指定客户端要显示的页码数量
	// exec 向数据库中发送查询请求
    let articles = await pagenation(Article).find().page(page).size(2).display(3).populate('author').exec();
    //渲染文章列表页面模块
    res.render('admin/article', {
        articles: articles
    })
}