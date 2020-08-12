require('dotenv').config()
const db=require("../models")
var qs = require("querystring");
var http = require("http");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
//var nodemailer = require('nodemailer');

                  // HOME PAGE
async function createWebToken(id){

  const token = jwt.sign({id}, process.env.JWT_KEY, {
    expiresIn: 60 * 60 * 5

	});
  //console.log(token);

  return token;
}
exports.home=async function (req,res) {
  res.clearCookie("token");
  res.render("home.ejs")
}
                     // SIGNUP PAGE

exports.signup=async function (req,res) {
  res.clearCookie("token");
  res.render("registration/sign-up.ejs",{data:""})
}

exports.getOTP=async function (req,response) {

     const number=await db.User.find({number:req.body.number});

     if(number.length==0){
  var options = {
    "method": "GET",
    "hostname": "2factor.in",
    "port": null,
    "path": `/API/V1/${process.env.FACTOR_API}/SMS/${req.body.number}/AUTOGEN`,
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

      var data= JSON.parse(body.toString());

      if(data.Status === "Success"){
        const password=await bcrypt.hash(req.body.password, 10);
      response.render("registration/verifyotp.ejs",{data:"",oid:data.Details,name:req.body.name,number:req.body.number,email:req.body.email,password:password})
    }else{
      response.render("registration/sign-up.ejs",{data:"pls try again.."})
    }
    });
    });


  req1.write(qs.stringify({}));
  req1.end();

}else{
    response.render("registration/sign-up.ejs",{data:"Phone number already exsits.."})
}
}



                          // REGISTERING PAGE



                      // VERIFY OTP PAGE

exports.verifyOtp=async function (req,response) {
//var sessionId=body.toString();
//var
//console.log(req.app.locals);
var options = {
  "method": "POST",
  "hostname": "2factor.in",
  "port": null,
  "path": `/API/V1/${process.env.FACTOR_API}/SMS/VERIFY/${req.body.oid}/${req.body.otp}`,
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
      const data=await db.User.create({name:req.body.name,number:req.body.number,email:req.body.email,password:req.body.password});
      if(data != null){
        const cookie=await createWebToken(data._id);
        //console.log(cookie);
        response.cookie('token',cookie);
        response.redirect("/majdoor");
        response.end();
      }else{
        response.render("registration/sign-up.ejs",{data:"pls try again.."})
      }
    }else{
      response.render("registration/verifyotp.ejs",{data:"pls enter correct otp.."})
    }
  });
});

req1.write(qs.stringify({}));
req1.end();


};



exports.login=async function (req,res) {
  res.clearCookie("token");
  res.render("registration/login.ejs",{data:""})
}

                          //  CHECKING USER DETAILS
exports.checkuser=async function (req,res) {
  //console.log(req.body);
 const data=db.User.findOne({number:req.body.number},(err,data)=>{
   //console.log(data);
   if(data != null){
     bcrypt.compare(req.body.password , data.password,async function (err, result) {
          if (result === true) {
            //console.log(data._id);
            const cookie=await createWebToken(data._id);
            //console.log(cookie);
            res.cookie("token",cookie)
            res.redirect("/majdoor")
            res.end()
          } else {
            res.render("registration/login.ejs",{data:"invalid credentials.."})
          }
        })
   }else{
     res.render("registration/login.ejs",{data:"invalid credentials.."})
   }
 })
}
exports.logout=async function (req,res) {
  res.clearCookie("token");
  res.render("home")
}


                              //NODE MAILER
// exports.nodemail=async function (req ,res){
//   var transporter = nodemailer.createTransport({
//
//               service: 'gmail',
//               auth: {
//               user: 'sumaiyahfayaz318@gmail.com',
//               pass: 'sumaiyah234sum'
//   }
//   });
//
//   var mailOptions = {
//               from: 'sumaiyahfayaz318@gmail.com',
//               to: 'ahamedshahebaz666@gmail.com.com',
//               subject: 'Sending Email using Node.js',
//               text: 'That was easy!'
//   };
//
// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//   }
//   });
//
// };
