let express = require('express');
let router = express.Router()
const viewPath = `${__dirname.replace('routes',"controllers/")}`

let timestampMicroservice = require('../controllers/timestamp')

/***************/
/* API ROUTES */
/*************/

/* Timestamp microservice */
router.get("/timestamp-microservice/api/:date?", timestampMicroservice.getDate);

module.exports = router