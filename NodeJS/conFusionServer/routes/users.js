var express = require('express');
const bodyParser = require('body-parser'); // Deprecated
var User = require('../models/user');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../authenticate');
var cors = require('./cors')

// router.use(bodyParser.json()); // Deprecated
router.use(express.json());


/* GET users listing. */

// For any  endpoint request  under users
router.options('*', cors.corsWithOptions, (req, res) => { res.statusCode(200); })

router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  User.find({})
  .then((users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err)); 
});

// --------------------------------------------- //
// ---------- USER REGISTRATION START ---------- //
// --------------------------------------------- //
router.post('/signup', cors.corsWithOptions, (req, res, next) => {
  // Expectation user and pass is provided
  // in json format
  // check for duplicate
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    // handle error if user did not
    // register properly
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
      
    }
  });
});
// --------------------------------------------- //
// ---------- USER REGISTRATION END ------------ //
// --------------------------------------------- //

// --------------------------------------------- //
// ---------- USER LOGIN START ----------------- //
// --------------------------------------------- //
// We expect the user and password to be included 
// the body(Passport).
// 1. When we reach the first endpoint "/login"
// 2. We will first call passport authenticate
// 3. If successful we will go to (req, res)
router.post('/login', cors.corsWithOptions, (req, res, next) => {
  // Structure for passport to pass information
  passport.authenticate('local', (err, user, info) => {
    if (err) // If error!
      return next(err);
    
    // If the user does not exists OR Incorrect
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, 
            status: 'Login Unsuccessful!', err: info});
    }
    // otherwise try to login
    //  notice the uppercase I
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, 
            status: 'Login Unsuccessful!', err: 'Could not log in user!'});
      }
    // Issue a TOKEN (jsonwebtoken)
    // Keep the jsonwebtoken small!
    // Token will be created and sent back
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, 
            status: 'Login Successful!', token: token});
    });
  }) (req, res, next);
});
// --------------------------------------------- //
// ---------- USER LOGIN END ------------------- //
// --------------------------------------------- //

// --------------------------------------------- //
// ---------- USER LOGOUT START ---------------- //
// --------------------------------------------- //
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy(); // Session is destroyed and info is removed from Server side.
    res.clearCookie('session-id'); // Clear cookie in client side
    res.redirect('/'); // Re-direct to homepage.
  }
  // if the req.session does not exists
  else {
    var  err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});
// --------------------------------------------- //
// ---------- USER LOGOUT END ------------------ //
// --------------------------------------------- //

// --------------------------------------------- //
// ---------- FACEBOOK START ------------------ //
// --------------------------------------------- //
router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true,
              token: token, 
              status: 'You are successfuly logged in!'});
  }
});
// --------------------------------------------- //
// ---------- FACEBOOK END ------------------ //
// --------------------------------------------- //


// --------------------------------------------- //
// ---------- JWT TOKEN START ------------------ //
// --------------------------------------------- //
router.get('/checkJWTToken', cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else { // if its a valid user
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, err: user});
    }
  }) (req, res);
})
// --------------------------------------------- //
// ---------- JWT TOKEN END ------------------ //
// --------------------------------------------- //

module.exports = router;
