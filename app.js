var{ faker } = require('@faker-js/faker');
var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'allah123.a',
    database: 'join_us'
  });
var express = require('express');
var app = express();
app.set("view engine", "ejs");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    // find count of users in DB
var q = "SELECT COUNT(*) AS total FROM users";
connection.query(q, function (error, results) {
    if (error) throw error;
    console.log(results[0].total);
    var count = results[0].total;
// respond with that count
    //res.send("We have" + count + "users in our DB");
res.render("home", {data: count});
});
//console.log("Someone requested the root route!");
//res.send("You've reached the Home Page!");
// consoile.log(req);  --> to see the request object get all the information about the request
});
app.post("/register", function(req, res){
var person = {
    email: req.body.email
}; // this is an obejct created using javascript object notation
 connection.query('INSERT INTO users SET ?', person, function(err, result) {
if (err) throw err;
res.redirect("/");
//res.send("Thanks for joining our waitlist!");

});  
//console.log("Post request sent to /register email is " + req.body.email);
});

/*app.get("/joke", function(req, res){
    var joke = "What do you call a dog that does magic tricks? A labracadabrador.";
    res.send(joke);
   });

   app.get("/random_num", function(req, res){
    var num = Math.floor((Math.random() * 10) + 1);
    res.send("Your lucky number is " + num);
   });*/

app.listen(8080, function(){
    console.log('Server is running on port 8080 !');
});
