const db=require("../models")
exports.home=async function (req,res) {
  res.render("home.ejs")
}



exports.signup=async function (req,res) {
  res.render("sign-up.ejs")
}
exports.registeringUser=async function (req,res) {
console.log(req.body);
  const data=await db.User.create({name:req.body.name,number:req.body.number});
    console.log(data);
    res.render("login.ejs",{data:"Please login to use our services"})


}
exports.login=async function (req,res) {
  res.render("login.ejs",{data:""})
}
exports.checkuser=async function (req,res) {
  const data=await db.User.findOne({name:req.body.name,number:req.body.number})
  if(data != null){
    console.log(data);
    res.render("majdoor.ejs",{name:data.name})
  }else{
    res.render("login.ejs",{data:"invalid credentials"})
  }
}
