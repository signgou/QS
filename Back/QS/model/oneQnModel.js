const mongoose = require('mongoose');


const oneQnSchema = new mongoose.Schema({
    qns : {type: mongoose.Schema.Types.ObjectId },
    title : {
        type :String,
        required : true
    },
    options : [String],
    selecteds : [Number],
    order : Number
}
);

const oneQnModel = mongoose.model('oneQn',oneQnSchema);
module.exports= oneQnModel;