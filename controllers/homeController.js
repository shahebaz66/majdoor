const db=require("../models");


exports.home= async function (req,res) {
  res.render("home/majdoor.ejs",{name:req.user.name})
}
exports.profile= async function (req,res) {
  const data=await db.User.findOne({_id:req.user._id})
  res.render("home/profile.ejs" ,{pname: data.name , pnumber: data.number , pemail: data.email});
}

exports.setting= async function (req,res) {
  res.render("home/setting.ejs")
}

exports.logout= async function (req,res) {
  redis.del(req.body.token);

}
