module.exports=function(success,error){
    //导入文件
    const {DBHOST,DBPORT,DBNAME}=require('../config/dbconfig');
    const mongoose=require('mongoose');

    if(typeof error !=='function'){
        error = () => {
            console.log("连接失败！");
        }
    }
   

    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)
    mongoose.connection.once('open',()=>{
        success();
    });

    mongoose.connection.on('error',()=>{
        error();
    });
    mongoose.connection.on('close',()=>{
        console.log("连接关闭");
    });
}