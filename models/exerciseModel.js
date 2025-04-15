let mongoose = require('mongoose');
// Create a schema for table
let exerciseSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required:true
  }
});
// Create a schema model
module.exports = mongoose.model('Exercise', exerciseSchema);
