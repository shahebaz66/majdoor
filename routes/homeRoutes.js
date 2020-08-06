const express=require("express");
const app=express.Router({mergeParams: true});
const {
  home,
  profile,
  myhiring,
  logout,
  majdoor,
  list,status


}=require("../controllers/homeController.js")




app.route('/')
    .get(home);

app.post('/post',majdoor);

app.route('/profile')
    .get(profile)

app.route('/myhiring')
        .get(myhiring)

app.route('/logout')
            .get(logout)

app.post('/list',list)

app.post('/status/:value',status)


module.exports=app
