const userModel=require('../models/userModel');
exports.userRegister=async(req,res)=>{
    // console.log(req.body)
    try{
        const newUser=new userModel({...req.body,verified:false});
        await newUser.save();
        // res.send('User registered successfully')
        res.status(200).json({Message:'Register Successful Wait! for the Verification'})
    }
    catch(error){
        res.status(400).json(error)
    }
};
exports.userLogin=async(req,res)=>{
    // console.log(req.body)
    try{
        const user=await userModel.findOne({
            email:req.body.email,
            password:req.body.password,
            verified:true
        })
        if(user){
            res.status(200).json({Message:'Login Successful',user:user})
        }
        else res.status(400).json({Message:'Login Failed'})
    }
    catch(error){
        res.status(400).json(error)
    }
};