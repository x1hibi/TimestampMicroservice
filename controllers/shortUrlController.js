let Url = require('../models/urlModel')
const dns = require('dns');
/**
 * Use Regex to check if url string is valid
 * @param {String} url 
 * @returns Boolean
 */
function urlValidator(url) {
    regex = /https?:\/\/[ww\.]?.+\.[a-z]{2}[a-z]+?/
    let status = regex.test(url)
    return status
  }
  
/**
 * Get a host name of valid URL
 * @param {String} url 
 * @returns 
 */
function getHostname(url) {
    // Create a new URL
    let newURL = new URL(url)
    let host = newURL.host
    return host
}

/**
 * Check if url is in database if not will be created
 * @param {String} url 
 * @returns Object
 */
async function checkOrSaveUrl(url) {
    let urlResponse = await Url.findOne({original_url:url}).select('url short_url').exec()
    // If documnet exist return the same short id
    if (urlResponse){
      return urlResponse
    }else{
      // If data is not in database create a new one
      let short_url = await Url.estimatedDocumentCount({}).exec()
      // Create a new document
      let newData = {original_url:url,short_url:short_url}
      let new_url = new Url(newData)
      new_url.save()
      return newData
    }
}

/**
 * Route handler to run URL shortener API
 * @param {Object} request 
 * @param {Object} response 
 */
async function shortUrlHandler(request,response) {
    // Get data from post request
    console.log(request.body)
    let url = request.body.url
    // Check with regex if url is valid
    let urlIsValid = urlValidator(url)
    // Catch an error if url is not valid
    if (!urlIsValid){
      response.json({ error: 'invalid url' })
    }else{
      let host = getHostname(url)
      dns.lookup(host, async (error,address)=>{
        if (address) {
          response.data = await checkOrSaveUrl(url)
          response.json(response.data)
        }else{
          response.json({ status: 'Invalid host' })
        }
      })
    }
}

/**
 * Get original URL from database and redirect page to original URL
 * @param {Object} request 
 * @param {Object} response 
 */
async function sendToURL(request,response) {
    let shortURL = request.params.url
    let document = await Url.findOne({short_url:shortURL}).exec()
    let originalURL = document.original_url
    response.statusCode = 302
    response.setHeader("Location",originalURL) 
    response.end()
}


module.exports = {shortUrlHandler,sendToURL}