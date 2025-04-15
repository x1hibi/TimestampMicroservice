var express = require('express');
var router = express.Router()
const viewPath = `${__dirname.replace('routes',"views/")}`

/****************/
/* VIEW ROUTES */
/**************/
router.get("/", (request, response) => {
    response.sendFile(viewPath+"index.html")
});

router.get("/timestamp", (request, response) => {
    response.sendFile(viewPath+'timestamp.html');
});

router.get("/request-header", (request, response) => {
    response.sendFile(viewPath+'requestHeader.html');
});

router.get("/url-shortener", (request, response) => {
    response.sendFile(viewPath+'urlShortener.html');
});

router.get("/exercise-tracker", (request, response) => {
    response.sendFile(viewPath+'exerciseTracker.html');
});

router.get("/file-metadata", (request, response) => {
    response.sendFile(viewPath+'fileMetadata.html');
});

module.exports = router