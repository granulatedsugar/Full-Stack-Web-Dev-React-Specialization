/*! This file contains the implementation of the 
* handling of REST API endpoint for /dishes and
* dishes/:dishId endpoints.
*/
// Express Route (Already included in Express)
const express = require('express');
// const bodyParser = require('body-parser'); // Deprecated

// To use an express router
const dishRouter = express.Router();

// Mongoose - to interact
const mongoose = require('mongoose');
const Dishes = require('../models/dishes'); // Model

// dishRouter.use(bodyParser.json()); // Deprecated
// Using latest json parser
dishRouter.use(express.json());

//---------- START ----------/
// First route '/' because we need to mount
// it in the index. By using this approach
// we are declaring the endpoint at one 
// single location whereby we can chain all
// get, post, put, delete method.
dishRouter.route('/')


// first parameter is the endpoint, second is the callback function
// Get Request
.get((req, res, next) => {
    // Expecting all to be returned in response to GET request
    // From express server we are accessing the database
    Dishes.find({})
    // Promise Start
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish); // JSON response 
    }, (err) => next(err)) // If error exists here
    // Promise End
    .catch((err) => next(err)) // Error will be passed here
})

// Post Request
.post((req, res, next) => {
    // Create dishes
    Dishes.create(req.body)
    // Promise Start
    .then((dish) => {
        console.log('Dish Created ', dish); // Repond Dish Created + whatever dish
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish); // JSON response 
    }, (err) => next(err)) // If error exists here
    // Promise End
    .catch((err) => next(err)) // Error will be passed here
})

// Put Request
.put((req, res, next) => {
    // JSON will be parse as a JS Object
    res.statusCode = 403; // Use Code 403 - not supported
    res.end('PUT operation not supported on /dishes');
})

// Delete  Request
// Delete will have the semi colon.
.delete((req, res, next) => {
    // DANGEROUS OPERATION!!!
    Dishes.remove({})
    // Promise Start
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp); // JSON response 
    }, (err) => next(err)) // If error exists here
    // Promise End
    .catch((err) => next(err)) // Error will be passed here
});

//----- Setup to support /dishes/:dishID

// Assignment 1 - Update dishRouter for dishId
// No semi colon for dishRouter.route()
// Notice we use req.body instead of req.params - Because 
// we can access json strings that contains the details 
// because we are using the body parser.
dishRouter.route('/:dishId')
// Will receive next() / Get Request
.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    // Promise Start
    .then((dish) => {
        console.log('Dish Created ', dish); // Repond Dish Created + whatever dish
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish); // JSON response 
    }, (err) => next(err)) // If error exists here
    // Promise End
    .catch((err) => next(err)) // Error will be passed here
})

// Post Request
// Mongoose methods: findBy
.post((req, res, next) => {
    res.statusCode = 403; // 403 Forbidden
    res.end('POST operation not supported on /dishes/'
        + req.params.dishId);
})

// Put Request
// When you do a put you are sending back the info
// of which dishId you are updating.
.put((req, res, next) => {
    // Identified by dish ID
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true}) // Return updated Dish.
    .then((dish) => {
        console.log('Dish Created ', dish); // Repond Dish Created + whatever dish
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish); // JSON response 
    }, (err) => next(err)) // If error exists here
    // Promise End
    .catch((err) => next(err)) // Error will be passed here
})

// Delete  Request
.delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp); // JSON response 
    }, (err) => next(err)) // If error exists here
    // Promise End
    .catch((err) => next(err)) // Error will be passed here
});

//---------- END ----------/

// Export
module.exports = dishRouter;