const asyncHandler = require('express-async-handler');
const Medicine = require('../model/medicineSchema');

const changeNumber = asyncHandler(async (req,res)=>{
    const {query,id} = req.body;
    const medicine = await Medicine.findOneAndUpdate({_id:id},{quantity:query})
    const medicines = await Medicine.find({});
    res.status(201).json(medicines);
})

const fetch = asyncHandler(async(req,res)=>{
    const medicine = await Medicine.find({});
    res.status(201).json(medicine);
})

const add = asyncHandler(async(req,res)=>{
    const {csvData} = req.body;
    for(var i = 0;i<csvData.length;i++){
        const med = {
            name1: csvData[i][0],
            name2: csvData[i][1],
            quantity: csvData[i][2],
            txt: csvData[i][3],
        }
        if(!med.name1){
            continue;
        }
        const isPresent = await Medicine.find({name1:med.name1})
        var medicine;
        if(isPresent.length===0){
            medicine = await Medicine.create(med)
        }
        else{
            medicine = await Medicine.findOneAndUpdate({name1:med.name1},{quantity:med.quantity})
        }
    }
    const medicines = await Medicine.find({})
    res.status(201).json(medicines)
})

module.exports = {changeNumber,fetch,add}