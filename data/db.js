import mongoose from "mongoose";

// connect db
export const dbConnect =()=>  mongoose.connect("mongodb://localhost:27017",{
    dbName:"crudApi"
}).then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
console.log(err);
});