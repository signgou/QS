const mongoose = require('mongoose');


const oneQnSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId },
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