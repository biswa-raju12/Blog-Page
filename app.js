const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const http = require('http');
const app = express();
app.set("view engine", "ejs");
const port = 3000;
let newItems = ["freshen up", "Taking Breakfast", "attend meeting"];
let workItem = [];


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


//get for home route
app.get("/", function(req, res) {
  let today = new Date();

    //create an object for date
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
    // passing object in inbuild function
  let day = today.toLocaleDateString("en-US", options);
  res.render("list", {
    listTitle: day,
    items: newItems
  });


});

//post for home route
app.post("/", function(req, res) {
  let newItem = req.body.item;

  //giving condition whether it is working directory or home directory
  if (req.body.list === "Work List") {
    workItem.push(newItem);
    res.redirect("/work");

  } else {
    newItems.push(newItem);
    res.redirect("/");
  }


})
//get route for /work
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    items: workItem
  });
});

app.get("/about",function(req,res){
  res.render("about");
});


//listen port
app.listen(port, function() {
  console.log("Execution started at port number 3000!!");
})
