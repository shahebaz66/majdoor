const express=require("express");
const bodyParser=require("body-parser");
const app=express();
//routes
const registrationRoutes=require("./routes/registrationRoutes.js")

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const version="V1.0"






app.use(`/app/${version}/home`,registrationRoutes)


app.listen(3000,function () {
  console.log("Server is running at 3000");

});
module.exports=app
