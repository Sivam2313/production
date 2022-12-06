const asyncHandler = require('express-async-handler');
const Family = require('../model/familySchema');
const Patient = require('../model/patientSchema');
const Prescription = require('../model/prescriptionSchema');

const addPrescription = asyncHandler(async (req,res)=>{
    const {id,dateMade,symptoms,instructions,diagnosis,arr,number,date,tests,other} = req.body;
    
    const patient = await Patient.findOne({"patientData.registrationP":id});
    if(!patient){
        res.status(400).send("not Found");
    }
    const patientData = patient.patientData;
    const prescription = await Prescription.create({
        id,
        patientData,
        dateMade,
        symptoms,
        instructions,
        diagnosis,
        medicines:arr,
        number,
        tests,
        other
    })
    if(prescription){
        if(date){
            const patient =await Patient.findOneAndUpdate({"patientData.registrationP":id},{appointedTime:date});
            if(patient){
                res.status(201).json(patient);
            }
            else{
                res.send("failed")
            }
        }
        res.status(500).send("error")
    }
    else{
        res.send("failed")
    }
})

const fetchPrescription = asyncHandler(async(req,res)=>{
    const {id,searchType} = req.body;

    
    if(searchType==="Mobile Number"){
        var family = await Family.findOne({mobile:id});
        
        if(family.length===0){
            res.status(201).json(family);
        }
        else{
            var dataArray = [];
            var prescription;
            // console.log(family);
            for(let i in family.members){
                prescription = await Prescription.find({id:family.members[i].id});
                if(prescription.length!==0){
                    dataArray = dataArray.concat(prescription);
                }
            }
            for(let i in family.additionalMembers){
                prescription = await Prescription.find({id:family.additionalMembers[i].id});
                if(prescription.length!==0){
                    dataArray = dataArray.concat(prescription);
                }
            }

            res.status(201).json(dataArray);
        }
    }
    else{
        var prescriptions = await Prescription.find({id:id})
        if(prescriptions){
            res.status(201).json(prescriptions)
        }
        else{
            res.status(500).send("failed");
        }
    }
    
})

const fetchAllPres = asyncHandler(async (req,res)=>{
    const prescriptions = await Prescription.find({})
    if(prescriptions){
        res.status(201).json(prescriptions)
    }
    else{
        res.status(500).send("failed");
    }
})

module.exports = {addPrescription,fetchPrescription,fetchAllPres}