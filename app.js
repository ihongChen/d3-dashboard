var express = require('express')
var app = express()
var sql = require('mssql')
// var bodyParser = require('body-Parser')
// server 

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

// app.use(function(req, res, next) {
//   res.contentType('application/json');
//   next();
// });

var server = app.listen(5000, function () {
    console.log('Server is running..');
});


//api router
var deposit = require('./route/deposit') //api route

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// GET方法的路由，處理「/」路徑
app.get('/deposit', deposit.getDeposit);
