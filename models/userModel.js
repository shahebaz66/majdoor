const mongoose=require("mongoose");



const userSchema=new mongoose.Schema({
  name:String,
  number:{type:String,unique:true},
  email:String,
  password:String,
  mypost:[{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  mylist: [{
    majdoorid:{type: mongoose.Schema.Types.ObjectId, ref: 'Majdoor'},
    postId:{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
  }],
  myhiring:[{type: mongoose.Schema.Types.ObjectId, ref: 'Majdoor'}]


});

const User=mongoose.model("User",userSchema);




module.exports=User
