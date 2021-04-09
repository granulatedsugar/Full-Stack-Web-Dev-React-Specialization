// Passport base authentication
// We will use this to store
// our authentication strategies
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

// Import config from root
var config = require('./config');


exports.local = passport.use(new LocalStrategy(User.authenticate()));
// Express session logging
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// --------------------------------------------------- //
// ---------- TOKEN BASED AUTH START ----------------- //
// --------------------------------------------------- //
exports.getToken = (user) => {
    // This help create json  web token
    return jwt.sign(user, config.secretKey, 
        // Declare how long it will expire (3600 is 1 hour)
        // Once expired it will ask user to re-authenticate
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('JWT payload: ', jwt_payload);
    User.findOne({_id: jwt_payload._id}, (err, user) => {
        if (err) {
            // this done is a call back that passport will pass.
            // Because this is an error, we will just use false
            return done(err, false); 
        }
        else if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));

// Verify incoming user
// means we are not creating sessions since we are using token base
// Normal User
exports.verifyUser = passport.authenticate("jwt", { session: false });

// Admin User Verification
exports.verifyAdmin = (req, res, next) => {
    if (req.user.admin) {
        next();
    }
    else {
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
};
// --------------------------------------------------- //
// ---------- TOKEN BASED AUTH END ------------------- //
// --------------------------------------------------- //