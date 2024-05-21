const mongoose = require('mongoose');

const oneQnModel =require('./oneQnModel');
const moreQnModel =require('./moreQnModel');
const fillQnModel =require('./fillQnModel');

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
    }

},
{
    //为了json，console.log()显示出vitual属性
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }
}
);

//virtual
userSchema.virtual('oneQns',{
    ref : oneQnModel,
    localField : '_id',
    foreignField: 'user'
})
userSchema.virtual('moreQns',{
  ref : moreQnModel,
  localField : '_id',
  foreignField: 'user'
})
userSchema.virtual('fillQns',{
  ref : fillQnModel,
  localField : '_id',
  foreignField: 'user'
})

const userModel = mongoose.model('user',userSchema);
module.exports= userModel;