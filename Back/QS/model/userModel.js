const mongoose = require('mongoose');

const QnsModel =require('./QnsModel');

const userSchema = new mongoose.Schema({
    userName : {
      type : String,
      required : true
    },
    passWord : {
      type : String,
      required : true
    },
    qnNum : {
      type : Number,
      default  : 0
    },
    qnOrder: {
      type : Number,
      default : 0
    }
},
{
    //为了json，console.log()显示出vitual属性
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }
}
);

//virtual
userSchema.virtual('Qns',{
    ref : QnsModel,
    localField : '_id',
    foreignField: 'user'
})

const userModel = mongoose.model('user',userSchema);
module.exports= userModel;