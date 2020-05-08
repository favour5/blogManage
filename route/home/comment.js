//引入评论集合构造函数
const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
    //接收客户端传递来的评论信息
    const { content, uid, aid} = req.body;

    //将评论集合存储到评论集合中
    Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    })

    res.redirect(`/home/article?id=${aid}`)
}