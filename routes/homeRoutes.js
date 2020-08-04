const express=require("express");
const app=express.Router({mergeParams: true});
const {
  home,
  profile,
  setting,
  logout,
  majdoor,
  list


}=require("../controllers/homeController.js")




app.route('/')
    .get(home)
     .post(majdoor)

app.route('/profile')
    .get(profile)

app.route('/setting')
        .get(setting)

app.route('/logout')
            .get(logout)

app.route('/list', list)
       //.get(list)
module.exports=app
