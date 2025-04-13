// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



/**
 * Convert a URL parameter into a date object and return as json with date in utc format and date in miliseconds
 * @param {object} request 
 * @param {object} response 
 */
function getDateApi(request, response) {
  // Get parameters from URL
  let dateString = request.params.date
  // Validate with regex date string
  let isDateInMiliseconds = /^\d+$/.test(dateString)
  let dateResponse = {}
  // Evaluate if date are in miliseconds
  if (isDateInMiliseconds) {
    console.log("miliseconds:", dateString)
    dateResponse.unix = parseInt(dateString)
    dateResponse.utc = new Date(dateResponse.unix).toUTCString()
  // Evaluate if string is empty
  }else if(dateString == undefined){
    let date = new Date()
      dateResponse.unix = date.getTime()
      dateResponse.utc = date.toUTCString()
  // Evaluate if date string is valid or not
  }else {
    date = new Date(dateString)
    if (date == "Invalid Date") {
      dateResponse.error = "Invalid Date"
    }else{
      let date = new Date(dateString)
      dateResponse.unix = date.getTime()
      dateResponse.utc = date.toUTCString()
    }
  }
  // Return date in seconds and UTC formart
  response.json(dateResponse)
}

// your first API endpoint... 
app.get("/api/:date?", getDateApi);



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
