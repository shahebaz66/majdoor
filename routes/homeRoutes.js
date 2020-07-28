const express=require("express");
const app=express.Router({mergeParams: true});
const {
  home,
  profile,
  setting,
  logout

}=require("../controllers/homeController.js")




app.route('/')
    .get(home)

app.route('/profile')
    .get(profile)

app.route('/setting')
        .get(setting)

app.route('/logout')
            .get(logout)
module.exports=app
