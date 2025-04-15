let express = require('express');
let router = express.Router()
const viewPath = `${__dirname.replace('routes',"controllers/")}`
// Import API controllers
let timestampController = require('../controllers/timestampController')
let shortUrlController = require('../controllers/shortUrlController')

/***************/
/* API ROUTES */
/*************/

/* Timestamp microservice */
router.get("/timestamp-microservice/api/:date?", timestampController.getDate);

/* URL shortener microservice */
router.post('/url-shortener/api/shorturl',shortUrlController.shortUrlHandler);
router.get('/url-shortener/api/shorturl/:url',shortUrlController.sendToURL)

module.exports = router