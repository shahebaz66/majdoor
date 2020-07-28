
const express=require("express");
const app=express.Router({mergeParams: true});

const {
  home,
  signup,
  login,
  checkuser,
  verifyOtp,
  getOTP,
logout

}=require("../controllers/registrationController.js")


app.route('/')
    .get(home)

app.route('/signup')
    .get(signup)


app.route('/login')
     .get(login)
     .post(checkuser)

app.post('/getOTP',getOTP)

app.route('/verifyOtp')
  .post(verifyOtp)

app.get("/logout",logout)

module.exports=app
