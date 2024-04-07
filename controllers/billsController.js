const billModel=require('../models/billModel');
exports.newBillCharge=async(req,res)=>{
    // console.log(req.body)
    try{
        const newBill=new billModel(req.body)
        await newBill.save()
        res.send('Bill Charge Successfully')
    }
    catch(error){
        res.status(400).json(error)
    }
};
exports.getAllBills=async(req,res)=>{
    try{
        const bills =await  billModel.find()
        res.send(bills)
    }
    catch(error){
        res.status(500).json(error)
    }
};