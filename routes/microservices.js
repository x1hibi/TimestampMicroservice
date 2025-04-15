let express = require('express');
let router = express.Router()
// Import API controllers
let timestampController = require('../controllers/timestampController')
let requestHeaderController = require('../controllers/requestHeaderController')
let shortUrlController = require('../controllers/shortUrlController')
let exerciseTrackerController = require('../controllers/exerciseTrackerController')
let fileMetadataController = require('../controllers/fileMetadataController')
/***************/
/* API ROUTES */
/*************/

/* Timestamp microservice */
router.get("/timestamp/api/:date?", timestampController.getDate);

/* Request header microservice */
router.get("/request-header/api/whoami", requestHeaderController.getUserHardwareInfo);

/* URL shortener microservice */
router.post('/url-shortener/api/shorturl',shortUrlController.shortUrlHandler);
router.get('/url-shortener/api/shorturl/:url',shortUrlController.sendToURL)

/* Exercise tracker microservice */
router.post('/exercise-tracker/api/users',exerciseTrackerController.userCreation)
router.get('/exercise-tracker/api/users',exerciseTrackerController.getUsers)
router.post('/exercise-tracker/api/users/:_id/exercises',exerciseTrackerController.createExercise)
router.get('/exercise-tracker/api/users/:_id/logs',exerciseTrackerController.logsHandler)

/* File metadata microservice */
router.post('/file-metadata/api/fileanalyse',fileMetadataController.uploadCallback,fileMetadataController.fileAnalizer)

// Export routes
module.exports = router