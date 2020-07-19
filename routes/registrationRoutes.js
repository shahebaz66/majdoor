
const express=require("express");
const app=express();

const {
  home,
  signup,
  registeringUser,
  login,
  checkuser,
  verifyOtp,
  getOTP
}=require("../controllers/registrationController.js")


app.route('/')
    .get(home)

app.route('/signup')
    .get(signup)
    .post(registeringUser)
app.route('/login')
     .get(login)
     .post(checkuser)
app.route('/verifyOtp')
  .post(verifyOtp)
app.post('/getOTP',getOTP)
module.exports=app
