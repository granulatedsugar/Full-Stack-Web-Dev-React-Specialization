var express = require('express');
const bodyParser = require('body-parser'); // Deprecated
var User = require('../models/user');
var router = express.Router();
var  passport = require('passport');

// router.use(bodyParser.json()); // Deprecated
router.use(express.json());


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// --------------------------------------------- //
// ---------- USER REGISTRATION START ---------- //
// --------------------------------------------- //
router.post('/signup', (req, res, next) => {
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
      passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
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
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, status: 'You are successfuly logged in!'});
});
// --------------------------------------------- //
// ---------- USER LOGIN END ------------------- //
// --------------------------------------------- //

// Logging out
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

module.exports = router;
