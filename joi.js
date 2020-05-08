//引入joi模块
const Joi = require('joi');

//定义对象的验证规则
const schema = {
    username: Joi.string().min(2).max(5).required()
};

//验证


async function run() {
    try {
        await Joi.validate({username:'abaaaa'}, schema);
    }catch(ex) {
        console.log(ex);
        return;
    }
    console.log('ok');
}

run();