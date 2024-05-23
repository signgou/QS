const mongoose = require('mongoose');

const oneQnModel =require('./oneQnModel');
const moreQnModel =require('./moreQnModel');
const fillQnModel =require('./fillQnModel');

const qnsSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId },
    qNum : {
      type : Number,
      default  : 0
    },
    qOrder : Number
},
{
    //为了json，console.log()显示出vitual属性
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }
}
);

//virtual
qnsSchema.virtual('oneQns',{
    ref : oneQnModel,
    localField : '_id',
    foreignField: 'qns'
})
qnsSchema.virtual('moreQns',{
  ref : moreQnModel,
  localField : '_id',
  foreignField: 'qns'
})
qnsSchema.virtual('fillQns',{
  ref : fillQnModel,
  localField : '_id',
  foreignField: 'qns'
})

const QnsModel = mongoose.model('qns',qnsSchema);
module.exports= QnsModel;