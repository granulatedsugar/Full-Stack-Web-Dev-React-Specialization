// Passport base authentication
// We will use this to store
// our authentication strategies
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');


exports.local = passport.use(new LocalStrategy(User.authenticate()));
// Express session logging
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
