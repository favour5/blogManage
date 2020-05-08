const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');
module.exports = (req, res) => {
    
    //创建表单解析对象
    const form = new formidable.IncomingForm();
    //配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    //保留上传文件的后缀
    form.keepExtensions = true;
    //解析表单
    form.parse(req, async (err, fields, files) => {
        //err错误对象，如果表单解析失败，err存储错误信息
        //fields 对象类型，保存普通表单数据
        //files 对象类型，保持和上传文件有关的数据
        // let {cover} = await Article.findOne({_id: fields.id});
        // return res.send(fields);
        
        if(fields.id) {
            if(fields.imgChange == 'false') {
                await Article.updateOne({_id: fields.id}, {
                    title: fields.title,
                    author: fields.author,
                    publishDate: fields.publishDate,            
                    content: fields.content
                })

            }else {
                await Article.updateOne({_id: fields.id}, {
                    title: fields.title,
                    author: fields.author,
                    publishDate: fields.publishDate,
                    cover: files.cover.path.split('public')[1],
                    content: fields.content
                })

            }       
        }else {
            await Article.create({
                title: fields.title,
                author: fields.author,
                publishDate: fields.publishDate,
                cover: files.cover.path.split('public')[1],
                content: fields.content
            })
        }
        res.redirect('/admin/article');
    })
    
}