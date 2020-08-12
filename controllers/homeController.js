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
  //console.log(data.mylist);
  if(data.mylist.length){
    res.render("home/myhiring.ejs",{message:"please give your response for the following employees you contacted",name:req.user.name,listOfMajdoor:data.mylist})
  }else{
    res.redirect('/majdoor')
  }

}
exports.status= async function (req,res) {
  if(req.params.value == 'hired'){

    await db.User.updateOne({_id:req.user._id},{$pull:{mylist:{_id:req.body.id}}});
    await db.User.updateOne({_id:req.user._id},{$addToSet:{myhiring:req.body.majdoorid}});
    const post=await db.Post.findOne({_id:req.body.postid});
    post.myhiring.push(req.body.majdoorid);
    post.save();
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
//db.employeeInformation.aggregate([{$sample:{size:1}}]).pretty();

exports.majdoor=async function (req, res){

if(req.user.mylist.length){
  res.redirect('/majdoor/myhiring')
}else{
  const data=await db.Majdoor.aggregate([
    {$match:{
      category:req.body.option,
      location:req.body.location,
      verified:'true'

    }},
    {$sample:{
      size:15
    }}
  ]);
  //console.log(req.body);
  const body={
    userid: req.user._id,
    option: req.body.option,
    description: req.body.description,
    location: req.body.location,
  };
  const post=await db.Post.create(body);
  req.user.mypost.push(post._id);
  req.user.save();
  //console.log(post);
  //console.log(data);
  if(data.length){
          res.render("home/list", {message:"",name:req.user.name,listOfMajdoor: data,postId:post._id,option:req.body.option,location:req.body.location});
  }else{
    res.render("home/majdoor.ejs",{name:req.user.name,status:"please try again after sometime..."})
  }
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
      verified:1,
      included:{$in:["$_id",list]}
    }},
    {$match:{
      category:req.body.category,
      location:req.body.location,
      verified:'true',
      included:false
    }},
    {
      $limit:15
    }
  ]);
  //console.log(data);
if(data.length >0){
res.render("home/list", {message:"Our employee will contact you shortly..",name:req.user.name,listOfMajdoor: data,postId:req.body.postId,option:req.body.category,location:req.body.location});
}else{
  res.render("home/majdoor.ejs",{name:req.user.name,status:"please try again after sometime ..."})
}
}




// const info=await db.User.findOne({_id:req.user._id})
// User.push(majdoor);
// User.save(function(err){
//   if(err){
//   console.log(err);
// }else{
//   console.log(info);
// }
