const db=require("../models")
var qs = require("querystring");
var http = require("http");
const bcrypt = require('bcrypt');               // HOME PAGE
exports.home=async function (req,res) {
  res.render("home.ejs")
}
                     // SIGNUP PAGE

exports.signup=async function (req,res) {
  res.render("sign-up.ejs",{data:""})
}

exports.getOTP=async function (req,response) {
     req.app.locals=req.body
     const number=await db.User.find({number:req.body.number})
     if(number.length===0){
  var options = {
    "method": "GET",
    "hostname": "2factor.in",
    "port": null,
    "path": `/API/V1/a764436d-c6a3-11ea-9fa5-0200cd936042/SMS/${req.body.number}/AUTOGEN`,
    "headers": {
      "content-type": "application/x-www-form-urlencoded"
    }
  };

  var req1 = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);

      var data= JSON.parse(body.toString());
      req.app.locals.oid=data.Details
      if(data.Status === "Success"){
      response.render("verifyotp.ejs",{data:""})
    }else{
      response.render("sign-up.ejs",{data:"pls try again.."})
    }
    });
    });


  req1.write(qs.stringify({}));
  req1.end();

}else{
    response.render("sign-up.ejs",{data:"Phone number already exsits.."})
}
}



                          // REGISTERING PAGE

exports.registeringUser=async function (req,res) {
//console.log(req.body);
if(req.body.number.length==10){
  const number=await db.User.find({number:req.body.number})
  console.log(number.length);
  if(number.length==0){
    if(req.body.password===req.body.repassword){
      const data=await db.User.create({name:req.body.name,number:req.body.number,email:req.body.email,password:req.body.password});
      console.log(data);
        //console.log(data);,email:req.body.email,password:req.body.password
        req.app.locals.userId=data._id
        req.app.locals.number=data.number;

        res.render("otp.ejs",{data:""})
    }else{
      res.render("sign-up.ejs",{data:"password mismatch"})
  }}else{
    res.render("sign-up.ejs",{data:"account with this number already exsist"})
}}else{
  res.render("sign-up.ejs",{data:"invalid number"})
}
}

                       // VERIFY OTP PAGE

exports.verifyOtp=async function (req,response) {
//var sessionId=body.toString();
//var
//console.log(req.app.locals);
var options = {
  "method": "POST",
  "hostname": "2factor.in",
  "port": null,
  "path": `/API/V1/a764436d-c6a3-11ea-9fa5-0200cd936042/SMS/VERIFY/${req.app.locals.oid}/${req.body.otp}`,
  "headers": {
    "content-type": "application/x-www-form-urlencoded"
  }
};

var req1 = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end",async function () {
    var body = Buffer.concat(chunks);
    const data=JSON.parse(body.toString());
    console.log(data);
    if(data.Status === "Success"){
      console.log(req.app.locals.password);
      const pass=await bcrypt.hash(req.app.locals.password, 10);
      const data=await db.User.create({name:req.app.locals.name,number:req.app.locals.number,email:req.app.locals.email,password:pass});
      if(data != null){
        response.render("majdoor.ejs",{name:data.name})
      }else{
        response.render("sign-up.ejs",{data:"pls try again.."})
      }
    }else{
      response.render("verifyotp.ejs",{data:"pls enter correct otp.."})
    }
  });
});

req1.write(qs.stringify({}));
req1.end();


};



exports.login=async function (req,res) {
  res.render("login.ejs",{data:""})
}

                            // CHECKING USER DETAILS
exports.checkuser=async function (req,res) {
  //console.log(req.body);
 db.User.findOne({number:req.body.number},(err,data)=>{
   //console.log(data);
   if(data != null){
     bcrypt.compare(req.body.password , data.password, function (err, result) {
          if (result === true) {
            res.render("majdoor.ejs",{name:data.name})
          } else {
            res.render("login.ejs",{data:"invalid credentials.."})
          }
        })
   }else{
     res.render("login.ejs",{data:"invalid credentials.."})
   }
 })



}
