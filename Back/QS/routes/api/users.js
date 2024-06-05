var express = require('express');
var router = express.Router();
const userModel = require('../../model/userModel');

//注册
router.post('/users/register', function(req, res, next) {
    async function main(){
        if(await userModel.findOne({userName : req.body.userName})){
            return res.json({
                code : '1016',
                msg : '注册失败,用户名已经被注册',
                data : null
            })
        }
        const data = await userModel.create(req.body);
        const {_id,userName,passWord} = data;
        let val = {
            uid : _id,
            userName : userName,
            passWord : passWord,
        }
        res.json({
            code : '0000',
            msg : '注册成功',
            data : val
        })
    }

    main().catch(err => {
        res.json({
            code : '1000',
            msg : '注册失败',
            data : null
        })
    })
});

//登录
router.post('/users/login', function(req, res, next) {
    async function main(){
        const {userName,passWord} = req.body;
        const data =await userModel.findOne({userName : userName , passWord : passWord}).exec();
       
        if(!data){
            return res.json({
                code : '1002',
                msg : '登录失败，账户或密码错误',
                data : null
            })
        }

        let val = {
            uid : data._id,
            userName : userName,
            passWord : passWord
        }
        res.json({
            code : '0001',
            msg : '登录成功',
            data : val
        })

    }

    main().catch(err => {
        res.json({
            code : '1001',
            msg : '登录失败，请稍后再试',
            data : null
        })
    })
});

module.exports = router;
