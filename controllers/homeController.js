const db=require("../models");


exports.home= async function (req,res) {
  res.render("home/majdoor.ejs",{name:req.user.name,status:""})
}
exports.profile= async function (req,res) {
  const data=await db.User.findOne({_id:req.user._id})
  res.render("home/profile.ejs" ,{name:req.user.name,pname: data.name , pnumber: data.number , pemail: data.email});
}

exports.setting= async function (req,res) {
  res.render("home/setting.ejs",{name:req.user.name})
}

exports.logout= async function (req,res) {
  redis.del(req.body.token);

}

exports.majdoor=async function (req, res){


const data=await db.Majdoor.find({category:req.body.option , location:req.body.location});
console.log(data);
if(data.length){
        res.render("home/list", {name:req.user.name,listOfMajdoor: data});
}else{
  res.render("home/majdoor.ejs",{name:req.user.name,status:"please try again..."})
}




}
