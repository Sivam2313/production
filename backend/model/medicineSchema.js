const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    name:{
        type:String,
    },
    quantity:{
        type:String,
    }
},{
    timestamp:true,
});

const Medicine = mongoose.model('Medicine',medicineSchema);

module.exports = Medicine;
