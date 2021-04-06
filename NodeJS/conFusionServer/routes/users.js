var express = require('express');
const bodyParser = require('body-parser'); // Deprecated
var User = require('../models/user');
var router = express.Router();
// router.use(bodyParser.json()); // Deprecated
router.use(express.json());


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  // Expectation user and pass is provided
  // in json format
  // check for duplicate
  User.findOne({username: req.body.username})
  // If the  user already exists
  .then((user) => {
    if (user != null) {
      var err = new Error('User ' + req.body.username + ' already exists!');
      err.status = 403;
      next(err);
    }
    // Create if not exists
    else {
      return User.create({
        username: req.body.username,
        password: req.body.password
      })
    }
  })
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ status: 'Registration Successful!', user: user});
  }, (err) => next(err))
  .catch((err) => next(err));
});


// To login a user
router.post('/login', (req, res, next) => {
  if (!req.session.user) {
    // *We expect basic authorization to be done
    // Get authorization hearder
    var authHeader = req.headers.authorization;

    if (!authHeader) {
      var err = new Error('You are not authenticated!');

      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401; // Unauthorized
      return next(err);
    }
    // Extract auth header (User and password)
    // Two splits
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

    // For clarity
    var username = auth[0];
    var password = auth[1];

    // User checking
    User.findOne({ username: username})
    .then((user) => {
      // If the user doest not exists
      if (user === null) {
        var err = new Error('User ' + username + ' does not exists!');

        err.status = 403; // Unauthorized
        return next(err);
      }
      // If the user exists but the password 
      // does not match
      else if (user.password !== password) {
        var err = new Error('Your password is incorrect!');
  
        err.status = 401; // Unauthorized
        return next(err);
      }
      // If the username and password are correct
      // for double check
      else if (user.username === username && user.password ===  password) {
        // *If the authorization is successful
        // *then cookie will be setup here
        // Check cookie  user
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are authenticated!');
      }
    })
    .catch((err) => next(err));
  }
  // If the user exists
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');
  }
});

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
