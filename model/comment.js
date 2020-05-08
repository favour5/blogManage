//引入mongoose模块
const mongoose = require('mongoose');
//创建评论集合规则
const commentSchema = new mongoose.Schema({
    //评论的文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    //评论用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date
    },
    content: {
        type: String
    }
});
//创建评论集合
const Comment = mongoose.model('comment', commentSchema);

module.exports = {
    Comment: Comment
}