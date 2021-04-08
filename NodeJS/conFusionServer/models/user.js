// User schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    // removed username and password from the list 
    // since passport will provide it automatically
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin: { // If want to  assign as Admin user
        type: Boolean,
        default: false
    }
});

// To use as a plugin in schema and model
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);