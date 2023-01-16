const asyncHandler = require('express-async-handler');
const Family = require('../model/familySchema');
const Medicine = require('../model/medicineSchema');

const add = asyncHandler(async(req,res)=>{
    const {csvData} = req.body;
    for(var i = 0; i<csvData.length;i++){
        var ob = {
            name:csvData[i][1],
            mobile:csvData[i][4],
            address:csvData[i][5],
            date:csvData[i][3],
            locationCode:csvData[i][6],
            education:csvData[i][30],
            familyIncome:csvData[i][31],
            maritalStatus:csvData[i][32],
            id:csvData[i][2],
            members:[],
            additionalMembers:[],
        }
        console.log(ob);
    //     for(var j = 0;j<8;j++){
    //         temp = {
    //             name:csvData[i][j+7],
    //             relationship:csvData[i][j+15],
    //             id:ob.id + '0'+toString(j+1),
    //         }   
    //         ob.members.push(temp)
    //     }
    //     for(var j = 0;j<6;j++){
    //         temp = {
    //             name:csvData[i][j+23],
    //             relationship:'Relative',
    //             id:ob.id+'1'+toString(j+1),
    //         }
    //         ob.additionalMembers.push(temp)
    //     }
    //     const family = await Family.create(ob);
    }
    res.json(csvData)
})

module.exports = {add}