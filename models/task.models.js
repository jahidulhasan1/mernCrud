import mongoose, { Schema } from "mongoose";


// signup
const taskSchema = new Schema({
title:{
    type:String,
    require:true,

},
description:{
    type:String,
    require:true,  
   
},
isCompleted:{
    type:Boolean,
default:false
},
userInfo:{
    type: Schema.Types.ObjectId,
    ref: "User" // ref to User model
 },

createdAt : {
    type: Date,
    default: Date.now
}
});



export const Task = mongoose.model('task', taskSchema);