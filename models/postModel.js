const mongoose=require("mongoose");



const postSchema=new mongoose.Schema({
  user_id: String,
  select: String,
  jobDescription: String,
  area: String


});

const Post= mongoose.model("Post",postSchema);




module.exports=Post
// type: <GeoJSON type> ,
// coordinates: <coordinates>
