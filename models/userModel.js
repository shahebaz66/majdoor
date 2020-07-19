const mongoose=require("mongoose");



const userSchema=new mongoose.Schema({
  name:String,
  number:{type:String,unique:true},
  email:String,
  password:String


});

const User=mongoose.model("User",userSchema);




module.exports=User
