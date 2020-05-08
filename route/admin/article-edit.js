const { Article } = require('../../model/article')

module.exports = async (req, res) => {
    //标识，标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    //获取地址栏的id参数
    const { id } = req.query;

    //如果传递了id参数
    if(id) {
        //修改操作
        let article = await Article.findOne({_id: id});
        // 渲染文章编辑页面(修改)
        res.render('admin/article-edit',{
            article: article,
            button: '修改'
        });
        
    }else{
        res.render('admin/article-edit', {
            button: '添加'
        })
    }
} 