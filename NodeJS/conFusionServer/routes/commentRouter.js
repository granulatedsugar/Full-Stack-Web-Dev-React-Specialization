/*! This file contains the implementation of the 
* handling of REST API endpoint for /dishes and
* dishes/:dishId endpoints.
*/
// Express Route (Already included in Express)
const express = require('express');
// const bodyParser = require('body-parser'); // Deprecated

// To use an express router
const commentRouter = express.Router();

// Mongoose - to interact
const mongoose = require('mongoose');
const authenticate = require('../authenticate'); // Authentication
const cors = require('./cors');

const Comments = require('../models/comments');

const commentRouter = express.Router();

commentRouter.use(express.json());

//-------------------------------------------/
//---------- COMMENTS ROUTER START ----------/
//-------------------------------------------/
// First route '/' because we need to mount
// it in the index. By using this approach
// we are declaring the endpoint at one 
// single location whereby we can chain all
// get, post, put, delete method.
commentRouter.route('/')

// Pre-flight
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// first parameter is the endpoint, second is the callback function
// Get Request
.get(cors.cors, (req, res, next) => {
    // Expecting all to be returned in response to GET request
    // From express server we are accessing the database
    Comments.find(req.query) // Return a specific dish
    .populate('author')
    // Promise Start
    .then((comments) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comments); // JSON response comments only 
    }, (err) => next(err)) // If error exists here
    // Promise End
    .catch((err) => next(err)) // Error will be passed here
})

// Post Request
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    if (req.body != null) {
        req.body.author = req.user._id;
        // Create dishes
        Comments.creat(req.body)
        // Promise Start
        .then((comment) => {
            Comments.findById(comment._id)
            .populate('author')
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', ' application/json');
                res.json(comment);
            })
        }, (err) => next(err)) // If error exists here
        // Promise End
        .catch((err) => next(err)) // Error will be passed here
    }
    else {
        err = new Error('Comment not found in request body');
        err.status = 404;
        return next(err);
    }
})

// Put Request
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    // JSON will be parse as a JS Object
    res.statusCode = 403; // Use Code 403 - not supported
    res.end('PUT operation not supported on /comments/ ');
})

// Delete  Request
// Delete will have the semi colon.
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    // DANGEROUS OPERATION!!!
    Comments.remove({})
    // Promise Start
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', ' application/json');
        res.json(resp);
    }, (err) => next(err)) // If error exists here
    // Promise End
    .catch((err) => next(err)) // Error will be passed here
});

//----- Setup to support /:dishId/comments/:commentId

// Assignment 1 - Update commentRouter for dishId
// No semi colon for commentRouter.route()
// Notice we use req.body instead of req.params - Because 
// we can access json strings that contains the details 
// because we are using the body parser.
commentRouter.route('/:commentId')

// Pre-flight
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// Will receive next() / Get Request
.get(cors.cors, (req, res, next) => {
    // We will start locating the dish
    Comments.findById(req.params.commentId)
    .populate('author')
    // Promise Start
    .then((comment) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', ' application/json');
        res.json(comment);
    }, (err) => next(err)) // If error exists here
    // Promise End
    .catch((err) => next(err)) // Error will be passed here
})

// Post Request
// Mongoose methods: findBy
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403; // 403 Forbidden
    res.end('POST operation not supported on /comments/'+ req.params.commentId);
})

// Put Request
// When you do a put you are sending back the info
// of which dishId you are updating.
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    // We will start locating the dish
    Comments.findById(req.params.commentId)
    // Promise Start
    .then((comment) => {
        // We need to be able to deal with situation
        // where either the dish doesnt exist or comments
        // 3 conditions required
        // Only then we can send a comment
        // If the first condition is met, then we can proceed with PUT
        if (comment != null) { // If dish is NOT NULL
            if (!comment.author.equals(req.user._id)) {
                var err = new Error('You are not authorized to edit this comment!');
                err.status = 403;
                return next(err);
            }
            req.body.author = req.user._id;
            Comments.findByIdAndUpdate(req.params.commentId, {
                $set: req.body
            }, { new: true })
            .then((comment) => {
                // Return updated dish
                Comments.findById(comment._id)
                .populate('author')
                .then((comment) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(comment); // JSON response comments only 
                })
            }, (err) => next(err));
        }
        else { // If the dish exists and comment doesnt exists!
            err = new Error('Comment ' + req.params.commentId + ' not found.');
            err.status =  404;
            return next(err); // Invoking error in app.js
        }
    }, (err) => next(err)) // If error exists here
    // Promise End
    .catch((err) => next(err)) // Error will be passed here
})

// Delete  Request
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
     // DANGEROUS OPERATION!!!
     Comments.findById(req.params.dishId)
     // Promise Start
     .then((comment) => {
         if (comment != null) { // If dish is NOT NULL
            if (!comment.author.equals(req.user._id)) {
                err = new Error('You are not authorized to edit this comment!');
                err.status = 403;
                return next(err);
            }
             // Delete ONLY a specific ID
             Comments.findByIdAndRemove(req.params.commentId)
             .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp); // JSON response comments only 
             }, (err) => next(err))
             .catch((err) => next(err)); // Error will be passed here
         }
        else { // If the dish exists and comment doesnt exists!
            err = new Error('Dish ' + req.params.commentId + ' not found.');
            err.status =  404;
            return next(err); // Invoking error in app.js
        }
     }, (err) => next(err)) // If error exists here
     // Promise End
     .catch((err) => next(err)); // Error will be passed here
});

//----------------------------------------/
//---------- COMMENT ROUTER END ----------/
//----------------------------------------/

module.exports = commentRouter;