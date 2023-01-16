const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    name1:{
        type:String,
    },
    name2:{
        type:String,
    },
    quantity:{
        type:String,
    },
    txt:{
        type:String,
    }
},{
    timestamp:true,
});

const Medicine = mongoose.model('Medicine',medicineSchema);

module.exports = Medicine;
