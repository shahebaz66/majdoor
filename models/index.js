require('dotenv').config()
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://majdoor:majdoor@cluster0.pv3iy.mongodb.net/majdoordb?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology: true},function (err) {
  if(err){console.log(err);}else{console.log("success fully connected");}
});




module.exports.User=require("./userModel.js");
