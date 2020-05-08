//引入文章集合构造函数
const { Article } = require('../../model/article')
//引入评论集合构造函数
const { Comment } = require('../../model/comment')

module.exports = async (req, res) => {
    //文章详情页面

    //接收客户端传递的文章id值
    const id = req.query.id;
    //根据id查询文章详细信息
    let article = await Article.findOne({_id: id}).populate('author')
    //查询当前文章对应的所有评论
    let comments = await Comment.find({aid: id}).populate('uid')
    res.render('home/article', {
        article: article,
        comments: comments 
    })
}