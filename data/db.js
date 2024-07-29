import mongoose from "mongoose";

// connect db
export const dbConnect =()=>  mongoose.connect(process.env.MONGOURI,{
    dbName:"crudApi"
}).then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
console.log("error from db",err);
});