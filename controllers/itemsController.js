const Item=require('../models/itemsModel');
exports.getAllItems=async(req,res)=>{
    try{
        const items=await Item.find()
        res.send(items)
    }
    catch(error){
        res.status(400).json(error)
    }
};
exports.editItem=async(req,res)=>{
    // const id=req.params._id;
    // console.log(id)
    try{
        const id=req.params._id;
        const item=await Item.findById(id);
        if(item){
            res.send(item)
        }
        else{
            console.log("error")
        }
    }
    catch(err){
        res.status(400).json(err)
    }
};
exports.updateItem=async(req,res)=>{
    const {id,name,price,image,category}=req.body
    try{
        await Item.findByIdAndUpdate(id,{name,price,image,category})
        res.send('updated')
    }
    catch(err){
        res.status(400).json(err)
    }

}
exports.deleteItem=async(req,res)=>{
   const id=req.params._id
 //  console.log(id)
    try{
        await Item.findByIdAndDelete(id)
        res.send('deleted')
    }
    catch(err){
        res.status(400).json(err)
    }

}