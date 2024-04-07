// const mongodb=require('mongodb');
// const mongoConnect=(callBack)=>{
//     console.log(mongoConnect)
//     mongodb.MongoClient.connect('mongodb://slama:l1V7TgZaRfnLA69F@ac-fmgpy9r-shard-00-00.ua2oahk.mongodb.net:27017,ac-fmgpy9r-shard-00-01.ua2oahk.mongodb.net:27017,ac-fmgpy9r-shard-00-02.ua2oahk.mongodb.net:27017/?replicaSet=atlas-i4npv4-shard-0&ssl=true&authSource=admin')
//     .then(client=>{
//         console.log('db connected')
//         callBack(client)
//     })
//     .catch(err=>console.log('error connecting to database',err))
// }
// module.exports=mongoConnect;

const mongoose=require('mongoose');
const url='mongodb://slama:l1V7TgZaRfnLA69F@ac-fmgpy9r-shard-00-00.ua2oahk.mongodb.net:27017,ac-fmgpy9r-shard-00-01.ua2oahk.mongodb.net:27017,ac-fmgpy9r-shard-00-02.ua2oahk.mongodb.net:27017/testdb?replicaSet=atlas-i4npv4-shard-0&ssl=true&authSource=admin'
mongoose.connect(url);
const connectObj=mongoose.connection;
connectObj.on('connected',()=>{
    console.log('Mongodb Connected')
});
connectObj.on('error',(error)=>{
    console.log('Connection Error',error)
});
connectObj.on('disconnected',()=>{
    console.log('Database Disconnected')
});
process.on('SIGINT',async()=>{
    await mongoose.connection.close(
        process.exit(0)
    )
});
module.exports=connectObj;