var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');


// --------- MONGOOSE START ---------- //
// Connection to MongoDB server
const mongoose = require('mongoose');

// Models
const Dishes = require('./models/dishes');

// Establish conneciton
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correctly to server');
}, (err) => { console.log(err); });

// ---------- MONGOOSE END --------- //

var app = express();


// MIDDLEWARES
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-67890-09876-54321')); // Signed cookie

// --------- BASIC AUTHENTICATION START ---------- //
function auth(req, res, next) {
  console.log(req.signedCookies);


  // *If the incoming request user or signed cookie
  // *does not exists
  if (!req.signedCookies.user) {
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


    if (username === 'admin' && password ===  'password') {
      // *If the authorization is successful
      // *then cookie will be setup here
      // Check cookie  user
      res.cookie('user', 'admin', { signed: true })
      next();
    }
    else { // IF wrong input of user or pass
      var err = new Error('You are not authenticated!');

      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401; // Unauthorized
      return next(err);
    } 
  }
  // Signed cookie exists
  else {
    // *Then all subsequent cookie carried
    // *Will be checked here
    if (req.signedCookies.user === 'admin') {
      next();//  Authorized
    }
    else {
      var err = new Error('You are not authenticated!');

      err.status = 401; // Unauthorized
      return next(err);
    }
  }
}
// --------- BASIC AUTHENTICATION END ---------- //

app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
