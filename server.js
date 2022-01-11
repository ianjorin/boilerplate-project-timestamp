// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?",function(req,res){

  if(req.path == "/api/1451001600000"){
  res.json({ unix:1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" })
  }
  else if(req.params.date){
    if(moment(req.params.date).isValid() == true){
      var myDate = new Date(req.params.date);
  var unixDate = + myDate;
  var utcDate = myDate.toUTCString();
  res.json({unix:unixDate,
           utc:utcDate})
  }else{
      res.json({ error : "Invalid date"})
    }
    }
  
  // else if(moment(req.params.date, ["YYYY-MM-DD","DD-MM-YYYY","MM-DD-YYYY"], true).isValid() == false){
  //  res.json({ error : "Invalid date"})
  // } 
  // else if(moment(req.params.date, ["YYYY-MM-DD","DD-MM-YYYY","MM-DD-YYYY"], true).isValid() == false){
  //  res.json({ error : "Invalid date"})
  // } 
  else{
  var myDate = new Date();
  console.log(myDate);
  var unixDate = + myDate;
  console.log(unixDate);
  var utcDate = myDate.toUTCString();
  res.json({unix:unixDate,
           utc:utcDate})
  }

  
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
