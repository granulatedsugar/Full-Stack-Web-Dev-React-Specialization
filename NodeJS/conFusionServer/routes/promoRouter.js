/*! This file contains the implementation of the 
* handling of REST API endpoint for /promotions and
* promotions/:promoId endpoints.
*/

// Express Route
const express = require('express');
// const bodyParser = require('body-parser'); // Deprecated

// To  use as an express router
const promoRouter = express.Router();

// Mongoose - to interact
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');

// We will need a JSON parser
// bodyParser is deprecated so we will  use
// express.json()
// promoRouter.use(bodyParser.json()) // Depreated
promoRouter.use(express.json());


// ---------- START ---------- /
// Mount route to index for chaining
// NO semi colon
promoRouter.route('/')

// Get Request
.get((req, res, next) => {
    // Get all promotions
    Promotions.find({})
    // Promise Start
    .then((promotions) => {
        res.statusCode = 200; // 200 OK!
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    // Promise end
    .catch((err) => next(err))
})

.post((req, res, next) => {
    // Parse JSON using req.body
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('Promotion Cread: ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err))
})

.put((req, res, next) =>  {
    // Since we cant PUT fow now
    // we will return code 403 
    res.statusCode = 403;
    res.end('PUT operation is not supported on /promotions');
})

.delete((req, res, next) => {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
});

// ---------- Support of /:promoId ---------- /

promoRouter.route('/:promoId')

// Use req.params. for ID identification
// Use req.body. for JSON parser
.get((req, res, next) => {
    Promotions.findById(req.params.promoId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err))
})

.post((req, res, next) => {
    res.statusCode = 403; // 403 Forbidden
    res.end(`POST operation is not supported on /promotions/${req.params.promoId}`);
})

.put((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err))
})

.delete((req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err))
});


module.exports = promoRouter;