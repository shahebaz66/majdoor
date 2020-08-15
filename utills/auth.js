require('dotenv').config()
const db=require("../models")
const jwt = require("jsonwebtoken");
const redis = require("redis");

const protect =async (req, res,next) => {
	try{
		//console.log("hello");
		// We can obtain the session token from the requests cookies, which come with every request
	  //console.log(req);
		if(req.header('cookie')){
			var token = req.header('cookie').replace('token=', '')
		}else{
			res.clearCookie("token");
			res.redirect('/');
		}

		//var token="null"
	  //console.log(token);
		// if(req.headers.authorization && req.headers.authorization.StartWith['bearer']){
		// 	token=req.headers.authorization.split(' ')[1]
		// }
		// if(req.headers.cookies){
		// 	token=req.headers.cookies
		// }
		// console.log(token);
		// // if the cookie is not set, return an unauthorized error
		// if (token == "null") {
		// 	return res.status(401).end()
		// }


		try {

			jwt.verify(token, process.env.JWT_KEY,async (err,obj)=>{
	      if(err){
					console.log(err);
					res.clearCookie("token");
				  res.redirect('/');

				}
	      const user=await db.User.findOne({_id:obj.id})
	      req.user=user;
	      next();
	    })
		} catch (e) {
			console.log(e);
			res.clearCookie("token");
			res.redirect('/');

		}
	}catch(e){
		console.log(e);
		res.clearCookie("token");
	  res.redirect('/');

	}




}
module.exports=protect;
