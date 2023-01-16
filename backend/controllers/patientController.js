const asyncHandler = require('express-async-handler');
const Patient = require('../model/patientSchema');
const Family = require('../model/familySchema');

const fetchPatient = asyncHandler(async (req,res)=>{
    const {regId} = req.body;
    const fId = regId.substring(0,regId.length-2);
    const family = await Family.findOne({id:fId});
    var mem = family.members.filter((item)=>{
        return item.id == regId
    })
    if(!mem[0]){
        mem = family.additionalMembers.filter((item)=>{
            return item.id == regId
        })
    }
    if(mem[0]){
        const listPatient = await Patient.find({registrationP:regId})
        var count = listPatient.length;
        var number="";
        if(count+1<10){
            number = "000" + (count+1);
        }
        else if(count+1<100){
            number = "00"+(count+1);
        }
        else if(count+1<1000){
            number = '0'+(count+1);
        }
        else{
            number = (count+1)+"";
        }
        const ticket = mem[0].id + number+ "";
        res.status(201).json({
            registrationP: mem[0].id,
            registrationNumber:fId,
            name:mem[0].name,
            ticketId:ticket,
            relationship:mem[0].relationship,
        })
    }
})

const addPatient = asyncHandler(async(req,res)=>{
    const {marital,DOB,education,profession,height,weight,temperature,pulse,sbp,dbp,alcohol,asthama,diabetes,familyIll,smoking,spo2,admitted,currentMed,healthCondition,injuries,pastDiseases,abortion,numberOfChild,otherComplications,totalPregnancies,others,otherHistory,patientData,mobile,gender} = req.body;
    const medical={
        height:height,
        weight:weight,
        temperature:temperature,
        pulse:pulse,
        sbp:sbp,
        dbp:dbp,
        alcohol:alcohol,
        asthama:asthama,
        diabetes:diabetes,
        familyIll:familyIll,
        smoking:smoking,
        spo2:spo2,
        others:others,
    };
    const pastHistory={
        admitted:admitted,
        currentMed:currentMed,
        healthCondition:healthCondition,
        injuries:injuries,
        otherHistory:otherHistory,
        pastDiseases:pastDiseases,
    };
    const gynocoligical={
        abortion:abortion,
        numberOfChild:numberOfChild,
        otherComplications:otherComplications,
        totalPregnancies:totalPregnancies,
    };
    const patient = await Patient.create({
        patientData,
        marital,
        gender,
        DOB,
        education,
        profession,
        mobile,
        medical,
        pastHistory,
        gynocoligical
    });
    if(patient){
        res.status(201).json(patient);
    }
})

const appointedPatients = asyncHandler(async (req,res)=>{
    var  {from,to,id} = req.body;
    if(!from || !to){
        from = new Date(1111,12,12);
        to = new Date(4000,12,12);
    }
    // console.log(year,month-1,day+1);
    var patients;
    if(!id){
        patients = await Patient.find({
            appointedTime:{$gte:from},
        }).find({
            appointedTime:{$lte:to},
        }).find({
            isVisited:'false'
        })
    }
    else{
        patients = await Patient.find({
            appointedTime:{$gte:from},
        }).find({
            appointedTime:{$lte:to},
        }).find({
            isVisited:'false'
        }).find({
            doctor:id,
        })
    }
    if(patients){
        res.status(201).json(patients);
    }
    else{
        res.status(400)
        throw new Error ("Error")
    }
    
})

const setAppointedDate = asyncHandler(async (req,res)=>{
    const {date,id,doctor} = req.body;
    // const [day,month,year] = date.split('/');
    const patient = await Patient.updateOne({'patientData.ticketId':id},{appointedTime:date,doctor:doctor})
    if(patient){
        const updated = await Patient.findOne({'patientData.ticketId':id})
        res.status(201).json(updated);
    }
    else{
        res.status(400)
        throw new Error ("Error")
    }
})

const changeVisited = asyncHandler (async (req,res)=>{
    const {id} = req.body; 
    const patient = await Patient.findOneAndUpdate({'patientData.registrationP':id},{isVisited:true})
    if(patient){
        res.status(201).json(patient)
    }
})

const fetchAll = asyncHandler(async (req,res)=>{
    const patients = await Patient.find({doctor:"0"})
    if(patients){
        res.status(201).json(patients)
    }
})

const trueFetch = asyncHandler(async (req,res)=>{
    const {id} = req.body;
    console.log(id);
    const patient = await Patient.findOne({'patientData.registrationP':id})
    if(patient){
        res.json(patient)
    }
    else{
        res.send('not found')
    }
})

module.exports = {fetchPatient,addPatient,appointedPatients,setAppointedDate,fetchAll,changeVisited,trueFetch};
