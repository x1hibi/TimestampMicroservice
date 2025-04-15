let mongoose = require('mongoose');

// Define a schema for url table
let urlSchema = new mongoose.Schema({
    original_url: {
      type: String,
      required: true
    },
    short_url:{
      type:Number,
      required:true
    }
});

// Create a schema model
let Url = mongoose.model('Url', urlSchema);

module.exports = Url