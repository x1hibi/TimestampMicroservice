/**
 * Convert a URL parameter into a date object and return as json with date in utc format and date in miliseconds
 * @param {object} request 
 * @param {object} response 
 */
function getDate(request, response) {
    // Get parameters from URL
    let dateString = request.params.date
    // Validate with regex date string
    let isDateInMiliseconds = /^\d+$/.test(dateString)
    let dateResponse = {}
    // Evaluate if date are in miliseconds
    if (isDateInMiliseconds) {
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

module.exports = {getDate}