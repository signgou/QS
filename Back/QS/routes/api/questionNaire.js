var express = require('express');
var router = express.Router();
const oneQnModel =require('../../model/oneQnModel');
const moreQnModel =require('../../model/moreQnModel');
const fillQnModel = require('../../model/fillQnModel');
const QnsModel = require('../../model/QnsModel');
const userModel = require('../../model/userModel');



//获取某个用户的所有问卷(不包含具体信息)//初步完成
router.get('/users/:uid/questionNaires', function(req, res, next) {  
    async function main(){
        const {Qns} = await userModel.findById(req.params.uid).populate('Qns');
        let qn  = Qns.map(element => {
            const { _id,__v, user ,...obj} = {...element}._doc;
            let newObj = {...{qnid : _id},...obj};
            return newObj;
        } )
        qn.sort( (a,b) => {
            return a.qOrder - b.qOrder; 
        } )
        return res.json({
            code : '0019',
            msg : '获取问卷成功',
            data : qn
        })
    }
    main().catch(err => {
        res.json({
            code : '1019', 
            msg : '获取失败,请稍后再试',
            data : null
        })
    })
});


//获取的某一问卷所有信息//初步完成
router.get('/questionNaires/:qnid', function(req, res, next) {  
    async function main(){
        
        const {qnName,oneQns,moreQns,fillQns}= (await QnsModel.findById(req.params.qnid).populate('moreQns').populate('oneQns').populate('fillQns'));
        let one=oneQns.map(element => {
            const {_id,__v,qns,...Obj} ={...element}._doc;  
            let newObj = { ...{qid : _id , type : "oneQns"}, ...Obj };        
            return newObj;
        })
        let more=moreQns.map(element => {
            const {_id,__v,qns,...Obj} ={...element}._doc;  
            let newObj = { ...{qid : _id , type : "moreQns"}, ...Obj };        
            return newObj;
        })
        let fill=fillQns.map(element => {
            const {_id,__v,qns,...Obj} ={...element}._doc;  
            let newObj = { ...{qid : _id , type : "fillQns"}, ...Obj };        
            return newObj;
        })
        
        let qns = one.concat(more,fill);
        qns.sort((a,b) => {
            return a.order-b.order;
        })
        return res.json({
            code : '0018',
            msg : '获取问卷成功',
            qnName : qnName,
            data : qns
        })
    }
    main().catch(err => {
        res.json({
            code : '1018',
            msg : '获取失败,请稍后再试',
            data : null
        })
    })
});


//增加某个用户新的问卷//初步完成
router.post('/users/:uid/questionNaires', function(req, res, next) {  
    async function main(){
        const user = await userModel.findById(req.params.uid);
        user.qnNum ++;
        const qnData = (await QnsModel.create({
            user : user._id,
            qnName :  req.body.qnName,
            qOrder : user.qnNum
        }))
        await user.save();
        res.json({
            code : '0016',
            msg : '创建新问卷成功',
            data : {
                qnid : qnData._id,
                qnName: qnData.qnName,
                qNum : qnData.qNum,
                qOrder : qnData.qOrder
            }
        })
    }

    main().catch(err => {

        res.json({
            code : '1016',
            msg : '创建新问卷失败,请稍后再试',
            data : null
        })
    })
})


// //增加已有问卷的某个问题信息//初步完成
router.post('/questionNaires/:qnid/:type', function(req, res, next) {  
    async function main(){
        const qns = await QnsModel.findById(req.params.qnid);
        qns.qNum += 1; 
        order=qns.qNum;

        switch(req.params.type){
            //单选
            case "oneQns":
            const {title:oneTitle, options:oneOptions,selecteds: oneSelecteds} = req.body;
            const oneData = await oneQnModel.create({
                qns : req.params.qnid,
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
                    qns : req.params.qnid,
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
                    qns : req.params.qnid,
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
                qns.qNum -= 1;

                res.json({
                    code : '1003',
                    msg : '没有相应问题类型，创建失败',
                    data : null
                })
        }
        //保存更改
        await qns.save();
    }

    main() .catch(err => {
        res.json({
            code : '1004',
            msg : '创建失败,请稍后再试',
            data : null
        })
    })
})

//删除某个问题信息//初步完成
router.delete('/questionNaires/:type/:qid', async function(req, res, next) {  
    async function main(){
        const qid = req.params.qid;

        switch(req.params.type){
            //删除单选问题
            case "oneQns":
                const deletedOneData = await oneQnModel.findByIdAndDelete(qid);
                if(!deletedOneData){
                    res.json({
                    code : '1006',
                    msg : '未找到要删除的单选问题',
                    data : null
                    });
                    break;
                }
                res.json({
                    code : '0006',
                    msg : '单选问题删除成功',
                    data : null
                })
                break;

            //删除多选问题
            case "moreQns":
                const deletedMoreData = await moreQnModel.findByIdAndDelete(qid);
                if(!deletedMoreData){
                    res.json({
                        code : '1007',
                        msg : '未找到要删除的多选问题',
                        data : null
                    });
                    break;
                }
                res.json({
                    code : '0007',
                    msg : '多选问题删除成功',
                    data : null
                })
                break;

            //删除填空问题
            case "fillQns":
                const deletedFillData = await fillQnModel.findByIdAndDelete(qid);
                if(!deletedFillData){
                    res.json({
                        code : '1008',
                        msg : '未找到要删除的填空问题',
                        data : null
                    });
                    break;
                }
                res.json({
                    code : '0008',
                    msg : '填空问题删除成功',
                    data : null
                })
                break;

            default:
                res.json({
                    code : '1005',
                    msg : '没有相应问题类型，删除失败',
                    data : null
                })
        }
    }

    main() .catch(err => {
        res.json({
            code : '1009',
            msg : '删除失败,请稍后再试',
            data : null
        })
    })
})
//获取某个问卷的某个问题信息//初步完成
router.get('/questionNaires/:type/:qid', function(req, res, next) {  
    async function main(){
        var notFind=false;
        switch(req.params.type){
            case 'oneQns':
                const oneData =await oneQnModel.findById(req.params.qid);
                if(!oneData){
                    notFind=true;
                    break;
                }
                res.json({
                    code : '0009',
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
                    code : '00010',
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
                    code : '0011',
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
                    code : '1010',
                    msg : '没有相应问题类型，获取失败',
                    data : null
                })
        }
        if(notFind){
            res.json({
                code : '1011',
                msg :'未找到问题',
                data : null
            })
        }
    }
    main().catch(err => {
        res.json({
            code : '1012',
            msg : '获取具体问题信息失败,请稍后再试',
            data : null
        });
    })
});

//修改某个问卷的某个问题信息//初步完成
router.patch('/questionNaires/:type/:qid', function(req, res, next) {  
    async function main(){
        switch(req.params.type){
            case 'oneQns':
                const oneData =await oneQnModel.findByIdAndUpdate(req.params.qid,req.body,{
                    new : true
                });
                res.json({
                    code : '0012',
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
                    code : '0013',
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
                    code : '0014',
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
                    code : '1013',
                    msg : '没有相应问题类型，修改失败',
                    data : null
                })
        }
    }

    main().catch(err => {
        res.json({
            code : '1014',
            msg : '修改具体问题信息失败,请稍后再试',
            data : null
        })
    })
});

module.exports = router;
