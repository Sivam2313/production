const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    ssfID:{
        type: String,
        required: true,
    },
    registrationID:{
        type: String,
        required: true,
    },
    adress:{
        type: String,
        required: true,
    },
    mobile:{
        type:String,
        required: true,
    },
    gender:{
        type:String,
        required:true,
    },
    speciality:{
        type:String,
        required:true,       
    },
    timeAvailable:[{
        day: String,
        from: String,
        to: String,
    }],
},{
    timestamp:true,
});


const Doctor = mongoose.model('Doctor',doctorSchema);

module.exports = Doctor;
