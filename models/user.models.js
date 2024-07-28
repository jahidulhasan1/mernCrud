import mongoose, { Schema } from "mongoose";

// signup
const userSchema = new Schema({
name:{
    type:String,
    require:true,

},
email:{
    type:String,
    require:true,  
   unique:true
},
password:{
    type:String,
    require:true,  
    select:false,

},
createdAt : {
    type: Date,
    default: Date.now
}
});



export const User = mongoose.model('user', userSchema);