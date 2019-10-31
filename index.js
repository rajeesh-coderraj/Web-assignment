
/* including API's */
var express = require('express');
var app = express();
var bodyParser=require("body-parser"); 
const mongoose = require('mongoose'); 
/* connect to db with db_lms */
mongoose.connect('mongodb://localhost:27017/db_lms'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "Connection failed!")); 
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
}));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('index');
});
/*  get the data from collection routes to the stocks  */
app.get('/stocks', function(req, res) {
  db.collection("bookstock").find({}).toArray(function(err, result) {
    if (err) throw err;
    res.render('stocks',{result:result});
    db.close;
});});
/*assign each value to varible*/
 app.post('/', function(req,res){ 
  var ISBN = req.body.ISBN;
  var title= req.body.title;
  var author=req.body.author;
  var edit=req.body.edit;
 /*  var data = { 
    "name": name, 
    "email":email, 
    "password":pass, 
    "phone":phone 
} */
/* Insert the data into collection bookstock */
  var write={"ISBN": ISBN,"title":title,"author":author,"edit":edit}
  db.collection('bookstock').insertOne(write,function(err, collection){ 
    if (err) throw err; 
    console.log("Insert Sucessfully!"); 
    db.close;
});});

app.listen(8080);