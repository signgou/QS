const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminName : {
      type : String,
      required : true
    },
    passWord : {
      type : String,
      required : true
    }
}
);

const adminModel = mongoose.model('admin',adminSchema);
module.exports=  adminModel;