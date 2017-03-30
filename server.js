var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var fs = require("fs");

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/main.html', function (req, res) {
   res.sendFile( __dirname + "/" + "main.html" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.get('/writeFile', function(req,res){
	console.log("asdqw")
	fs.writeFile('input.txt', 'Simply Easy Learning!',  function(err) {
	   if (err) {
	      return console.error(err);
	   }
	   
	   console.log("Data written successfully!");
	   console.log("Let's read newly written data");
	   fs.readFile( __dirname + "/" +'input.txt', function (err, data) {
	      if (err) {
	         return console.error(err);
	      }
	      console.log("Asynchronous read: " + data.toString());
	      res.end(data.toString());
	   });
	});
})

//read file
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users/users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users/users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users/users.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
})

app.delete('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "users/users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 1];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

var server = app.listen(8000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})