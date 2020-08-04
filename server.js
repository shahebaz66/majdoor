const express=require("express");
const bodyParser=require("body-parser");
const cookieParser = require("cookie-parser")
var morgan = require('morgan')
const app=express();
//routes
const homeRoutes=require("./routes/homeRoutes.js")
const registrationRoutes=require("./routes/registrationRoutes.js")

const protect=require("./utills/auth.js")


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan('dev'));
const version="V1.0"






app.use(`/app/${version}/home`,registrationRoutes)
app.use(`/app/${version}/majdoor`,protect,homeRoutes)


var port = process.env.PORT || 8080;

app.listen(port,function () {
  console.log(`Server is running at the ${port}`);

});
module.exports=app
