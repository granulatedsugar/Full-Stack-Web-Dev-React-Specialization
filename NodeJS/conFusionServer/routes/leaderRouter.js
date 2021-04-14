/*! This file contains the implementation of the 
* handling of REST API endpoint for /leaders and
* leaders/:leaderId endpoints.
*/
// Express Route (Already included in Express)
const express = require('express');
// const bodyParser = require('body-parser'); // Deprecated

// Use leaderRouter as Router
const leaderRouter = express.Router();

// Mongoose - to interact
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');
const Leaders = require('../models/leaders'); // Model

// Parser
// We will use lates because bodyparser is deprecated
// leaderRouter.use(bodyParser.json()); // Deprecated
leaderRouter.use(express.json());

//-----------------------------------------/
//---------- LEADER ROUTER START ----------/
//-----------------------------------------/
// First route '/' because we need to mount
// it in the index. By using this approach
// we are declaring the endpoint at one 
// single location whereby we can chain all
// get, post, put, delete method.
leaderRouter.route('/')

// Pre-flight
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// Get Request
.get(cors.cors, (req, res, next) => {
    // Expecting all to be returned in response to GET request
    // From express server we are accessing the database
    Leaders.find(req.query)
    // Promise Start
    .then((leaders) => {
        res.statusCode = 200; // 200 OK
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders); // JSON response
    }, (err) => next(err)) // If error exists here pass to catch
    // Promise End
    .catch((err) => next(err))
})

// Post Request
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    // Create New Leader
    Leaders.create(req.body)
    // Promise  Start
    .then((leader) => {
        console.log('Leader Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    // Promise end
    .catch((err) => next(err))
})

// Put Request
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403; // 403 Forbidden
    res.end('PUT Operation is not supported on /leaders')
})

// Delete Request
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    // DANGEROUS OPERATION!!!
    Leaders.remove({}) // Deleting all leaders
    // Promise Start
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
});


// ---------- Support for /:leaderId ---------- /
// No semi colon for leaderRouter.route()
// Notice we use req.body instead of req.params - Because 
// we can access json strings that contains the details 
// because we are using the body parser.
// Mongoose methods: findBy
leaderRouter.route('/:leaderId')

// Pre-flight
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// Get Request
.get(cors.cors, (req, res, next) => {
    Leaders.findById(req.params.leaderId)
    // Promise Start
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    // Promise End
    .catch((err) => next(err))
})

// Post Request
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403; // 403 Forbidden
    res.end(`POST operation not supported on /leaders/${req.params.leaderId}`);
})

// Put Request
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true }) // Return Updated leader
    // Promise Start
    .then((leader) => {
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => name(err))
    // Promise end
    .catch((err) => next(err))
})

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    // Promise Start
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) =>  next(err))
    // Promise end
    .catch((err) => next(err))
});

//-----------------------------------------/
//---------- LEADER ROUTER END ----------/
//-----------------------------------------/

module.exports = leaderRouter;