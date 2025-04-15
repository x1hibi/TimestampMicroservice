let express = require('express');
let app = express();

/**********************/
/* MIDDLEWARE ROUTES */
/********************/
const middlewareRouter = require('./routes/middlewares')
app.use(middlewareRouter)

/****************/
/* VIEW ROUTES */
/**************/
const webRouter = require('./routes/web')
app.use(webRouter)

/***************/
/* API ROUTES */
/*************/
const microservicesRouter = require('./routes/microservices')
app.use(microservicesRouter)

// Listen on port set in environment variable or default to 3000
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Application is running in port: ' + listener.address().port);
});