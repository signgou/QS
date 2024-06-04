var express = require('express');
var router = express.Router();
const adminModel = require('../../model/adminModel');
const userModel = require('../../model/userModel');
const QnsModel = require('../../model/QnsModel');
const oneQnModel =require('../../model/oneQnModel');
const moreQnModel =require('../../model/moreQnModel');
const fillQnModel = require('../../model/fillQnModel');

//注册管理员
router.post('/admins/register', function(req, res, next) {
    async function main(){
        if(!req.body.SecretKey || req.body.SecretKey != 'cchq'){
            return res.json({
                code : '1031',
                msg : '注册失败,秘钥错误',
                data : null
            })
        }
        if(await adminModel.findOne({adminName : req.body.adminName})){
            return res.json({
                code : '1030',
                msg : '注册失败,名字已经被注册',
                data : null
            })
        }
        const data = await adminModel.create(req.body);
        const {_id,adminName,passWord} = data;
        let val = {
            adid : _id,
            adminName : adminName,
            passWord : passWord,
        }
        res.json({
            code : '0030',
            msg : '注册成功',
            data : val
        })
    }

    main().catch(err => {
        res.json({
            code : '1033',
            msg : '注册失败',
            data : null
        })
    })
});

//登录管理员
router.post('/admins/login', function(req, res, next) {
    async function main(){
        const {adminName,passWord} = req.body;
        const data =await adminModel.findOne({adminName : adminName , passWord : passWord}).exec();
       
        if(!data){
            return res.json({
                code : '1031',
                msg : '登录失败，账户或密码错误',
                data : null
            })
        }

        let val = {
            adid : data._id,
            userName : adminName,
            passWord : passWord
        }
        res.json({
            code : '0033',
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

//获取user信息
router.get('/users',(req,res) => {
    async function main(){
        let users = await userModel.find();
        let getUsers  = users.map(element => {
            const { _id,__v, qnOrder,passWord,...obj} = {...element}._doc;
            let newObj = {...{uid : _id},...obj};
            return newObj;
        } )
        res.json({
            code : "0034",
            msg : "获取用户信息成功",
            data : getUsers
        })
    }
    main().catch(err => {
        res.json({
            code : '1034',
            msg : '获取用户信息失败',
            data : null
        })
    })
})

//删除一个用户
router.delete('/users/:uid',(req,res) => {
    async function main(){
        const {Qns} = await userModel.findById(req.params.uid).populate('Qns');
        let qns =[]; let qnids=[];
        let = Qns.length;
        Qns.forEach(element => {
            qnids.push({_id : element._id})
            qns.push({qns : element._id});
        });
        await QnsModel.deleteMany({$or:qnids});
        await oneQnModel.deleteMany({$or : qns});
        await moreQnModel.deleteMany({$or : qns});
        await fillQnModel.deleteMany({$or : qns});
        await userModel.findByIdAndDelete(req.params.uid); 
        res.json({
            code : "0035",
            msg : "删除用户成功",
            data : null
        })
    }
    main().catch(err => {
        res.json({
            code : '1035',
            msg : '删除用户失败',
            data : null
        })
    })
})

module.exports = router;
