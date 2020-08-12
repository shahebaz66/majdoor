const mongoose=require("mongoose");


const majdoorSchema=new mongoose.Schema({
  name:String,
  number:String,
  gender:String,
  location:String,
  category:String,
  fcmTokem:String,
  verified:String
});



const Majdoor=mongoose.model("Majdoor",majdoorSchema);




module.exports=Majdoor
