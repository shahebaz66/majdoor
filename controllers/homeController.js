const db=require("../models");


exports.home= async function (req,res) {
  //req.user.mylist=[]
  res.render("home/majdoor.ejs",{name:req.user.name,status:""})
}
exports.profile= async function (req,res) {
  const data=await db.User.findOne({_id:req.user._id})
  res.render("home/profile.ejs" ,{name:req.user.name,pname: data.name , pnumber: data.number , pemail: data.email});
}

exports.myhiring= async function (req,res) {
  const data=await db.User.findOne({_id:req.user._id}).populate('mylist.postId').populate('mylist.majdoorid')
  console.log(data.mylist);
  res.render("home/myhiring.ejs",{name:req.user.name,listOfMajdoor:data.mylist})
}
exports.status= async function (req,res) {
  if(req.params.value == 'hired'){

    await db.User.updateOne({_id:req.user._id},{$pull:{mylist:{_id:req.body.id}}});
    await db.User.updateOne({_id:req.user._id},{$addToSet:{myhiring:req.body.majdoorid}});
    res.redirect('/majdoor/myhiring')
  }else{
    await db.User.updateOne({_id:req.user._id},{$pull:{mylist:{_id:req.body.id}}});
    res.redirect('/majdoor/myhiring')
  }
}
exports.logout= async function (req,res) {
  res.clearCookie("token");
  res.redirect('/');

}

exports.majdoor=async function (req, res){


const data=await db.Majdoor.find({category:req.body.option , location:req.body.location});
//console.log(req.body);
const body={
  user_id: req.user._id,
  option: req.body.option,
  description: req.body.description,
  location: req.body.location,
};
const post=await db.Post.create(body);
req.user.mypost.push(post._id)
//console.log(post);
//console.log(data);
if(data.length){
        res.render("home/list", {name:req.user.name,listOfMajdoor: data,postId:post._id,option:req.body.option,location:req.body.location});
}else{
  res.render("home/majdoor.ejs",{name:req.user.name,status:"please try again..."})
}
}

exports.list=async function (req, res){
  const confirm=req.body;
  console.log(confirm);
  var user=await db.User.findOne({_id:req.user._id});
  const body={
    majdoorid:req.body.majdoorid,
    postId:req.body.postId
  }
  user.mylist.push(body);
  user.save();
  var list=[];
  user.mylist.forEach((item) => {
    list.push(item.majdoorid)
  });
//console.log(req.body.category,req.body.location);
  const data=await db.Majdoor.aggregate([
    {$project:{
      _id:1,
      name:1,
      category:1,
      location:1,
      gender:1,
      included:{$in:["$_id",list]}
    }},
    {$match:{
      category:req.body.category,
      location:req.body.location,
      included:false
    }},
    {
      $limit:15
    }
  ]);

res.render("home/list", {name:req.user.name,listOfMajdoor: data,postId:req.body.postId,option:req.body.category,location:req.body.location});

}




// const info=await db.User.findOne({_id:req.user._id})
// User.push(majdoor);
// User.save(function(err){
//   if(err){
//   console.log(err);
// }else{
//   console.log(info);
// }
