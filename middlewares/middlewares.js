/**
 * Varify the origin of request and print basic information
 * @param {Object} request 
 * @param {Object} response 
 * @param {Object} next 
 */
function getRequestData(request,response,next) {
    let method = request.method
    let ip = request.ip
    let url = request.url
    let body = request.body
    // Print 
    console.log(`${method} ${ip} - ${url}`)
    console.log("Body:",body)
    next()
}

module.exports = {getRequestData}