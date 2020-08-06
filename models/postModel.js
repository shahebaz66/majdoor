const mongoose=require("mongoose");



const postSchema=new mongoose.Schema({
  user_id: String,
  option: String,
  description: String,
  location: String,
  myhiring:[{type: mongoose.Schema.Types.ObjectId, ref: 'Majdoor'}]

});

const Post= mongoose.model("Post",postSchema);




module.exports=Post
// type: <GeoJSON type> ,
// coordinates: <coordinates>
