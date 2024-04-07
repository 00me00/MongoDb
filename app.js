const express=require('express');
const cors=require('cors');
const dbConnect=require('./utils/database');
const app=express();
const itemsRoute=require('./routes/itemsRoute');
const userRoute=require('./routes/userRoute');
const billsRoute=require('./routes/billsRoute');
app.use(express.json());
app.use(cors());
app.use('/api/items',itemsRoute)
app.use('/api',userRoute)
app.use('/api/bills',billsRoute)
const port=8000;
app.listen(port,()=>console.log(`Server is running in ${port}`));