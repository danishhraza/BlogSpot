//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");

const homeStartingContent = "This is a blog site i made while learning web development. Go to /compose to make a blog and write your heart out ;) There are no restrictions!";
const aboutContent = "About me, but well you could wikipedia me as well so just do that";
const contactContent = "You could contact me but i am too busy to answer you, hehe just kidding, email my manager";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let posts = [];

app.get("/",function(req,res){
  res.render("home", {startingContent:homeStartingContent, posts: posts});
})

app.get("/about",function(req,res){
  res.render("about", {whatContent:aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact", {callContent:contactContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})

app.post("/compose", function(req,res){
  let post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post);
  res.redirect("/");
})

app.get("/posts/:postName", function(req,res){
  const requested = _.lowerCase([string=req.params.postName]);
  posts.forEach(function(post){
    if (requested===_.lowerCase([string=post.title])){
      res.render("post", {
        title:post.title,
        content: post.content
      });
    }
  })
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
