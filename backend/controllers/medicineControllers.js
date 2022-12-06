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
    const {name} = req.body;
    const isPresent = await Medicine.find({name:name})
    var medicine
    if(isPresent.length===0){
        medicine = await Medicine.create({
            name:name,
            quantity:'0'
        })
    }
    else{
        medicine = isPresent;
    }
    if(medicine){
        const medicines = await Medicine.find({});
        res.status(201).json(medicines);
    }
    else{
        res.status(400).send('not Found');
    }
})

module.exports = {changeNumber,fetch,add}