const express=require('express');
const billsController=require('../controllers/billsController');
const router=express.Router();
router.post('/charge-bill',billsController.newBillCharge);
router.get('/bill',billsController.getAllBills);
module.exports=router;