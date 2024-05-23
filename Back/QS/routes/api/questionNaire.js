var express = require('express');
var router = express.Router();
const oneQnModel =require('../../model/oneQnModel');
const moreQnModel =require('../../model/moreQnModel');
const fillQnModel = require('../../model/fillQnModel');
const QnsModel = require('../../model/QnsModel');
const userModel = require('../../model/userModel');


//获取某个用户的所有问卷//!!需要修改的
router.get('/users/:uid/questionNaires', function(req, res, next) {  
    async function main(){

        const {oneQns,moreQns,fillQns}= (await QnsModel.findById(req.params.id).populate('moreQns').populate('oneQns').populate('fillQns'));
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

//获取的某一问卷所有信息//!!需要修改的
router.get('/questionNaires/:qnid', function(req, res, next) {  
    async function main(){

        const {oneQns,moreQns,fillQns}= (await QnsModel.findById(req.params.id).populate('moreQns').populate('oneQns').populate('fillQns'));
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

//增加某个问卷的某种问题信息//!!需要修改的
router.post('/questionNaires/:qnid/:type', function(req, res, next) {  
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
                msg : '单选问题创建成功',
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
                    msg : '多选问题创建成功',
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
                    msg : '填空问题创建成功',
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
                    msg : '没有相应问题类型，创建失败',
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

//删除某个问卷的某种问题信息//!!需要修改的
router.delete('/questionNaires/:qnid/:type/:qid', function(req, res, next) {  
    async function main(){
        switch(req.params.type){
            case 'oneQns':
                const deletedOneData = await oneQnModel.findByIdAndDelete(req.params.qid);
                if(!deletedOneData){
                    res.json({
                        code : '1011',
                        msg : '未找到要删除的单选问题',
                        data : null
                    });
                    break;
                }
                res.json({
                    code : '0013',
                    msg : '单选问题删除成功',
                    data : null
                });
                break;
            case 'moreQns':
                const deletedMoreData = await moreQnModel.findByIdAndDelete(req.params.qid);
                if(!deletedMoreData){
                    res.json({
                        code : '1012',
                        msg : '未找到要删除的多选问题',
                        data : null
                    });
                    break;
                }
                res.json({
                    code : '0014',
                    msg : '多选问题删除成功',
                    data : null
                });
                break;
            case 'fillQns':
                const deletedFillData = await fillQnModel.findByIdAndDelete(req.params.qid);
                if(!deletedFillData){
                    res.json({
                        code : '1013',
                        msg : '未找到要删除的填空问题',
                        data : null
                    });
                    break;
                }
                res.json({
                    code : '0015',
                    msg : '填空问题删除成功',
                    data : null
                });
                break;
            default:
                res.json({
                    code : '1014',
                    msg : '没有相应问题类型，删除失败',
                    data : null
                });
        }
    }
    main().catch(err => {
        res.json({
            code : '1015',
            msg : '删除具体问题信息失败，请稍后再试',
            data : null
        });
    });
});

//获取某个问卷的某个问题信息!!需要修改的
router.get('/questionNaires/:qnid/:type/:qid', function(req, res, next) {  
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
                    msg : '单选问题获取成功',
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
                    msg : '多选问题获取成功',
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
                    msg : '填空问题获取成功',
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
                    msg : '没有相应问题类型，获取失败',
                    data : null
                })
        }
        if(notFind){
            res.json({
                code : '1010',
                msg :'未找到问题',
                data : null
            })
        }
    }

    main().catch(err => {
        res.json({
            code : '1006',
            msg : '获取具体问题信息失败,请稍后再试',
            data : null
        })
    })
});

//修改某个问卷的某个问题信息!!需要修改的
router.patch('/questionNaires/:qnid/:type/:qid', function(req, res, next) {  
    async function main(){
        switch(req.params.type){
            case 'oneQns':
                const oneData =await oneQnModel.findByIdAndUpdate(req.params.qid,req.body,{
                    new : true
                });
                res.json({
                    code : '0010',
                    msg : '单选问题修改成功',
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
                    msg : '多选问题修改成功',
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
                    msg : '填空问题修改成功',
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
                    msg : '没有相应问题类型，修改失败',
                    data : null
                })
        }
    }

    main().catch(err => {
        res.json({
            code : '1008',
            msg : '修改具体问题信息失败,请稍后再试',
            data : null
        })
    })
});

module.exports = router;
