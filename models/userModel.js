let mongoose = require('mongoose');
// Create a schema for table
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
});
// Create a schema model
module.exports = mongoose.model('User', userSchema);