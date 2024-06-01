const mongoose = require('mongoose');


const fillSchema = new mongoose.Schema({
    qns : {type: mongoose.Schema.Types.ObjectId },
    title :{ 
        type : String ,
        required : true
    },
    answer : [String],
    order : Number
}
);


const fillQnModel = mongoose.model('fillQn',fillSchema);

module.exports= fillQnModel;