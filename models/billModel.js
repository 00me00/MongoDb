const mongoose=require('mongoose');
const billSchema=new mongoose.Schema({
    cartList:{type:Array, require:true},
    mode:{type:String, require:true},
    name:{type:String, require:true},
    phoneNumber:{type:String, require:true},
    subTotal:{type:Number, require:true},
    tax:{type:Number, require:true},
    totalAmount:{type:Number, require:true},
    user:{type:String, require:true},
},{timestamps:true});
const billModel=new mongoose.model('bills',billSchema);
module.exports=billModel;