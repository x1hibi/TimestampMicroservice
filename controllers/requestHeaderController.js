
/**
 * Upload file and return info of file 
 * @param {Onject} requests 
 * @param {Onject} response 
 */
function getUserHardwareInfo(requests,response) {
    let ip = requests.ip
    let language = requests.headers["accept-language"]
    let userAgent = requests.headers["user-agent"]
    response.json({
    "ipaddress":ip,
    "language":language,
    "software":userAgent
    })
}

module.exports = {getUserHardwareInfo}