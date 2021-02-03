//jshint esversion:6

// Instalacion de paquetes y modulos requeridos

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash')
const app = express();
const mongoose = require('mongoose')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Creacion de base de datos

mongoose.connect("mongodb+srv://admin-sol:vacarosadita@cluster0.hfwrw.mongodb.net/postsDB?retryWrites=true&w=majority" ,{useNewUrlParser : true})

postsSchema = new mongoose.Schema({
  name: String,
  content : String
})

const Post = mongoose.model("Post" , postsSchema)

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.get("/", function (req,res) {

  Post.find({}, function(err,docs){
    if(err){
      console.log(err)
    } else {
      res.render ('home', { content: homeStartingContent, posts : docs })
    }
  })
})

app.post("/compose", function (req,res) {
  
  let postTitle = req.body.postTitle
  let postContent = req.body.postBody

  let newPost = new Post ({
    name: postTitle,
    content : postContent
  })

  newPost.save(function(err){

    if (!err){
 
      res.redirect("/");
 
    }})
})


app.get("/contact", function (req,res) {
  res.render ('contact', {content : contactContent})
})

app.get("/about", function (req,res) {
  res.render ('about', {content : aboutContent})
})

app.get("/compose",function (req,res) {
  res.render ('compose')
})

app.get("/posts/:postId", function (req,res) {

  console.log(req.params)

  let requestedPost = req.params.postId

  Post.findOne({_id: requestedPost}, function(err,docs) {
    if(err) {
      console.log(err)
    }else {
      res.render("post", { title : docs.name, content : docs.content })
    }
  })

})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server up and running in port 3000 at http://localhost:3000");
});
