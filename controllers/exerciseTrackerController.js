const User = require('../models/userModel');
const Exercise = require('../models/exerciseModel');

/**
 * Route handler for user creation
 * @param {*} request 
 * @param {*} response 
 */
async function userCreation(request,response) {
    let username = request.body.username
    // Check if user is in database
    let user = await User.findOne({username:username}).exec()
    if (user == null){
      let newUser = new User({username:username}) 
      newUser.save()
      user = newUser
    }
    response.json(user)
}

/**
 * Route handler to display a list of users
 * @param {Object} request 
 * @param {Object} response 
 */
async function getUsers(request,response) {
    // Query for all users
    let allUsers = await User.find({}).exec()
    response.json(allUsers)
}

/**
 * Create a new exercise and save in database
 * @param {Object} request 
 * @param {Object} response 
 */
async function createExercise(request,response) {
    let body = request.body
    // Verify if description and duration are filled
    if(request.body.description == "" | request.body.duration == ""){
      response.json({error:"Description and duration are required",body:request.body})
    }else{
      let date = (body.date == "" | body.date == undefined) ? new Date() : new Date(body.date);
      let userId = request.params._id
      // // Get username
      let user = await User.findOne({_id:userId}).exec()
      let username = user.username
      let duration = parseInt(body.duration)
      let description = body.description
      // Create a new exercise 
      let newExercise = new Exercise({username:username,duration:duration,description:description,date:date})
      // Save exercise
      await newExercise.save()
      newExercise._id=userId
      response.json(newExercise)
    }
}

/**
 * Manage all user logs 
 * @param {Object} request 
 * @param {Object} response 
 */
async function logsHandler(request,response) {

    let limit = request.query.limit
    let from = request.query.from
    let to = request.query.to
  
    let user = await User.findOne({_id:request.params._id}).exec()
    let userexercises = []
    if(from && to && limit){
      userexercises = await Exercise.find({username:user.username,date:{$gte:request.query.from,$lte:request.query.to}},{_id: 0,__v:0 }).limit(parseInt(request.query.limit)).exec()
    }else if(from && to){
      userexercises = await Exercise.find({username:user.username,date:{$gte:request.query.from,$lte:request.query.to}},{_id: 0,__v:0 }).exec()
    }else if (limit){
      userexercises = await Exercise.find({username:user.username}).limit(parseInt(request.query.limit)).exec()
    }else{
      userexercises = await Exercise.find({username:user.username}).exec()
    }
  
    let exercisesList = []
    userexercises.forEach(exercise => {
      exerciseObject = {
        "description":exercise.description,
        "duration":exercise.duration,
        "date":exercise.date.toDateString()
      }
      exercisesList.push(exerciseObject)
    });
  
    response.json({
      _id:request.params._id,
      username:user.username,
      count:userexercises.length,
      log:exercisesList
    })
}

module.exports = {userCreation,getUsers,createExercise,logsHandler}