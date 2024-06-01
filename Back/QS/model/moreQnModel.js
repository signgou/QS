const mongoose = require('mongoose');


const moreSchema = new mongoose.Schema({
    qns : {type: mongoose.Schema.Types.ObjectId },
    title :{ 
        type : String ,
        required : true
    },
    options : [String],
    selecteds : [Number],
    order : Number
}
);



const moreQnModel = mongoose.model('moreQn',moreSchema);

module.exports= moreQnModel;