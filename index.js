// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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


// params 
// can convert both date types ..
// can return clean error if input not valid ..
// can handle all dates that can be successfully parsed by new Date(date_string)
// empty date return current time in unix & utc

app.get("/api/:date?", function(req, res){
  let date = req.params.date;
  let match = /[\D]/g;

  let tempDate
  if(date === undefined){
    tempDate = new Date()
  }else if(match.test(date) == false){
    tempDate = new Date(Number(date))
  }else{
    tempDate = new Date(date)
  }

  // if invalid date string input
  let reply
  if(tempDate == 'Invalid Date'){
    reply = {error: "Invalid Date"}
  }else{
    reply = {
      unix: tempDate.getTime(),
      utc: tempDate.toUTCString()
    }
  }

  res.json(reply);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
