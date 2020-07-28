require('dotenv').config()
const db=require("../models")
const jwt = require("jsonwebtoken");
const redis = require("redis");

const protect =async (req, res,next) => {
  //console.log("hello");
	// We can obtain the session token from the requests cookies, which come with every request
  //console.log(req);
	const token = req.header('cookie').replace('token=', '')
  //console.log(token);

	// if the cookie is not set, return an unauthorized error
	if (!token) {
		return res.status(401).end()
	}


	try {

		jwt.verify(token, process.env.JWT_KEY,async (err,obj)=>{
      if(err){console.log(err);}
      const user=await db.User.findOne({_id:obj.id})
      req.user=user;
      next();
    })
	} catch (e) {
    console.log(e);
		if (e instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
			return res.status(401).end()
		}
		// otherwise, return a bad request error
		return res.status(400).end()
	}



}
module.exports=protect;
