const express=require('express');
const itemsController=require('../controllers/itemsController');
const router=express.Router();
router.get('/get-all-items',itemsController.getAllItems);
router.get('/edit/:_id',itemsController.editItem);
router.post('/update',itemsController.updateItem);
router.post('/deleteItems/:_id',itemsController.deleteItem);

module.exports=router;