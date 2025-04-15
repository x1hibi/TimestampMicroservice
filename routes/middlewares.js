let express = require('express');
let router = express.Router()
let middlewares = require('../middlewares/middlewares')

router.use(middlewares.getRequestData)
// Enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
router.use(cors({ optionsSuccessStatus: 200 }));  
// some legacy browsers choke on 204
// Set public static media
router.use(express.static('public'));

module.exports = router