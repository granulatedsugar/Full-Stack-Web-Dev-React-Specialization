/*! This file contains the implementation of the 
* handling of REST API endpoint for /promotions and
* promotions/:promoId endpoints.
*/

// Express Route
const express = require('express');
// const bodyParser = require('body-parser'); // Deprecated

// To  use as an express router
const promoRouter = express.Router();

// We will need a JSON parser
// bodyParser is deprecated so we will  use
// express.json()
// promoRouter.use(bodyParser.json()) // Depreated
promoRouter.use(express.json());


// ---------- START ---------- /
// Mount route to index for chaining
// NO semi colon
promoRouter.route('/')

.all((req, res, next) => {
    // Respond status code
    res.statusCode = 200; // 200 OK
    res.setHeader('Content-Type', 'text/plain');
    //Continue
    next();
})

.get((req, res, next) => {
    res.end('Will send all the promotions to you!');
})

.post((req, res, next) => {
    // Parse JSON using req.body
    res.end(`Will add the promotion: ${req.body.name} with details ${req.body.description}`);
})

.put((req, res, next) =>  {
    // Since we cant PUT fow now
    // we will return code 403 
    res.statusCode = 403;
    res.end('PUT operation is not supported on /promotions');
})

.delete((req, res, next) => {
    res.end('Deleting all promotions!')
});

// ---------- Support of /:promoId ---------- /

promoRouter.route('/:promoId')

.all((req, res, next) => {
    // Status code
    res.statusCode = 200; // 200 OK
    res.setHeader('Content-Type', 'text/plain');
    // Continue
    next();
})

// Use req.params. for ID identification
// Use req.body. for JSON parser
.get((req, res, next) => {
    res.end(`Will send details of promotion: ${req.params.promoId} to you!`);
})

.post((req, res, next) => {
    res.statusCode = 403; // 403 Forbidden
    res.end(`POST operation is not supported on /promotions/${req.params.promoId}`);
})

.put((req, res, next) => {
    res.write(`Updating the promotion: ${req.params.promoId} \n`);
    res.end(`Will update the promotion: ${req.body.name} with details ${req.body.description}`);
})

.delete((req, res, next) => {
    res.end(`Deleting promotion: ${req.params.promoId}`);
});


module.exports = promoRouter;