var express = require('express');
var router = express.Router();
const oneQnModel =require('../../model/oneQnModel');
const moreQnModel =require('../../model/moreQnModel');
const fillQnModel =require('../../model/fillQnModel');
const userModel = require('../../model/userModel');


//获取所有问卷(某个用户的)
router.get('/users/:id/questionNaires', function(req, res, next) {  
    async function main(){

        const {oneQns,moreQns,fillQns}= (await userModel.findById(req.params.id).populate('moreQns').populate('oneQns').populate('fillQns'));
        let one=oneQns.map(element => {
            const {__v,user,...newObj} ={...element}._doc;
            newObj.type="oneQns";
            return newObj;
        })
        let more=moreQns.map(element => {
            const {__v,user,...newObj} ={...element}._doc;
            newObj.type="moreQns";
            return newObj;
        })
        let fill=fillQns.map(element => {
            const {__v,user,...newObj} ={...element}._doc;
            newObj.type="fillQns";
            return newObj;
        })
        
        let qns = one.concat(more,fill);
        qns.sort((a,b) => {
            return a.order-b.order;
        })
        return res.json({
            code : '0006',
            msg : '获取问卷成功',
            data : qns
        })
    }
    main().catch(err => {
        res.json({
            code : '1005',
            msg : '获取失败,请稍后再试',
            data : null
        })
    })
});

//增加某种问卷信息
router.post('/users/:id/questionNaires/:type', function(req, res, next) {  
    async function main(){
        const user = await userModel.findById(req.params.id);
        user.qnNum += 1; 
        order=user.qnNum;

        switch(req.params.type){
            //单选
            case "oneQns":
            const {title:oneTitle, options:oneOptions,selecteds: oneSelecteds} = req.body;
            const oneData = await oneQnModel.create({
                user : req.params.id,
                title : oneTitle,
                options : oneOptions,
                selecteds : oneSelecteds,
                order : order
            })

            res.json({
                code : '0003',
                msg : '单选问卷创建成功',
                data : {
                    qid : oneData._id,
                    title : oneData.title,
                    options : oneData.options,
                    selecteds : oneData.selecteds,
                    order : oneData.order
                }
            })
            break;

            //多选
            case "moreQns":
                const {title:moreTitle, options:moreOptions,selecteds: moreSelecteds} = req.body;
                const moreData = await moreQnModel.create({
                    user : req.params.id,
                    title : moreTitle,
                    options : moreOptions,
                    selecteds : moreSelecteds,
                    order : order
                })
                res.json({
                    code : '0004',
                    msg : '多选问卷创建成功',
                    data : {
                        qid : moreData._id,
                        title : moreData.title,
                        options : moreData.options,
                        selecteds : moreData.selecteds,
                        order : moreData.order
                    }
                })
            break;

            //填空
            case "fillQns":
                const {title:fillTitle,answer} = req.body;
                const fillData = await fillQnModel.create({
                    user : req.params.id,
                    title : fillTitle,
                    answer : answer,
                    order : order
                })

                res.json({
                    code : '0005',
                    msg : '填空问卷创建成功',
                    data : {
                        qid : fillData._id,
                        title : fillData.title,
                        answer: fillData.answer,
                        order : fillData.order
                    }
                })
            break;
            default:
                //失败就减回去
                user.qnNum -= 1;

                res.json({
                    code : '1003',
                    msg : '没有相应问卷类型，创建失败',
                    data : null
                })
        }
        //保存更改
        await user.save();
    }

    main().catch(err => {
        res.json({
            code : '1004',
            msg : '创建失败,请稍后再试',
            data : null
        })
    })
})

//删除某个问卷
router.delete('/questionNaires/:type/:qid', function(req, res, next) {  
    async function main(){
        
    }

    main().catch(err => {

    })
});

//获取某个问卷信息
router.get('/questionNaires/:type/:qid', function(req, res, next) {  
    async function main(){
        let notFind=false;
        switch(req.params.type){
            case 'oneQns':
                const oneData =await oneQnModel.findById(req.params.qid);
                if(!oneData){
                    notFind=true;
                    break;
                }
                res.json({
                    code : '0007',
                    msg : '单选问卷获取成功',
                    data : {
                        qid :oneData._id,
                        title : oneData.title,
                        options : oneData.options,
                        selecteds : oneData.selecteds,
                        order : oneData.order
                    }
                })
                break;
            case 'moreQns':
                const moreData =await moreQnModel.findById(req.params.qid);
                if(!moreData){
                    notFind=true;
                    break;
                }
                res.json({
                    code : '0008',
                    msg : '多选问卷获取成功',
                    data : {
                        qid :moreData._id,
                        title : moreData.title,
                        options : moreData.options,
                        selecteds : moreData.selecteds,
                        order : moreData.order
                    }
                })
                break;
            case 'fillQns':
                const  fillData =await fillQnModel.findById(req.params.qid);
                if(!fillData){
                    notFind=true;
                    break;
                }
                res.json({
                    code : '0009',
                    msg : '填空问卷获取成功',
                    data : {
                        qid : fillData._id,
                        title : fillData.title,
                        answer: fillData.answer,
                        order : fillData.order
                    }
                })
                break;
            default:
                res.json({
                    code : '1007',
                    msg : '没有相应问卷类型，获取失败',
                    data : null
                })
        }
        if(notFind){
            res.json({
                code : '1010',
                msg :'未找到问卷',
                data : null
            })
        }
    }

    main().catch(err => {
        res.json({
            code : '1006',
            msg : '获取具体问卷信息失败,请稍后再试',
            data : null
        })
    })
});

//修改某个问卷信息
router.patch('/questionNaires/:type/:qid', function(req, res, next) {  
    async function main(){
        switch(req.params.type){
            case 'oneQns':
                const oneData =await oneQnModel.findByIdAndUpdate(req.params.qid,req.body,{
                    new : true
                });
                res.json({
                    code : '0010',
                    msg : '单选问卷修改成功',
                    data : {
                        qid :oneData._id,
                        title : oneData.title,
                        options : oneData.options,
                        selecteds : oneData.selecteds,
                        order : oneData.order
                    }
                })
                break;
            case 'moreQns':
                const moreData =await moreQnModel.findByIdAndUpdate(req.params.qid,req.body,{
                    new : true
                });
                res.json({
                    code : '0011',
                    msg : '多选问卷修改成功',
                    data : {
                        qid :moreData._id,
                        title : moreData.title,
                        options : moreData.options,
                        selecteds : moreData.selecteds,
                        order : moreData.order
                    }
                })
                break;
            case 'fillQns':
                const fillData =await fillQnModel.findByIdAndUpdate(req.params.qid,req.body,{
                    new : true
                });
                res.json({
                    code : '0012',
                    msg : '填空问卷修改成功',
                    data : {
                        qid : fillData._id,
                        title : fillData.title,
                        answer: fillData.answer,
                        order : fillData.order
                    }
                })
                break;
            default:
                res.json({
                    code : '1009',
                    msg : '没有相应问卷类型，修改失败',
                    data : null
                })
        }
    }

    main().catch(err => {
        res.json({
            code : '1008',
            msg : '修改具体问卷信息失败,请稍后再试',
            data : null
        })
    })
});

module.exports = router;
