/*! This file contains the implementation of the 
* handling of REST API endpoint for /leaders and
* leaders/:leaderId endpoints.
*/

// Express Route
const express = require('express');
// const bodyParser = require('body-parser'); // Deprecated

// Use leaderRouter as Router
const leaderRouter = express.Router();

// Parser
// We will use lates because bodyparser is deprecated
// leaderRouter.use(bodyParser.json()); // Deprecated
leaderRouter.use(express.json());

// ---------- START ---------- /
// Mount to index  first
// NO semi colon required
// Put semi colon after delete
leaderRouter.route('/')

.all((req, res, next) => {
    // Respond status code
    res.statusCode = 200; // 200 OK
    res.setHeader('Content-Type', 'text/plain');
    // Continue
    next();
})

.get((req, res, next) => {
    res.end('Will send all leaders to you!');
})

.post((req, res, next) => {
    res.end(`Will add leader: ${req.body.name} with details ${req.body.description}`);
})

.put((req, res, next) => {
    res.statusCode = 403; // 403 Forbidden
    res.end('PUT Operation is not supported on /leaders')
})

.delete((req, res, next) => {
    res.end('Deleting all leaders!');
})


// ---------- Support for /:leaderId ---------- /
leaderRouter.route('/:leaderId')

.all((req, res, next) => {
    res.statusCode = 200; // 200 OK
    res.setHeader('Content-Type', 'text/plain');
    // Continue
    next();
})

.get((req, res, next) => {
    res.end(`Will send details of leader: ${req.params.leaderId} to you!`);
})

.post((req, res, next) => {
    res.statusCode = 403; // 403 Forbidden
    res.end(`POST operation not supported on /leaders/${req.params.leaderId}`);
})

.put((req, res, next) => {
    res.write(`Updating the leader: ${req.params.leaderId} \n`)
    res.end(`Will update the leader: ${req.body.name} with details ${req.body.description}`)
})

.delete((req, res, next) => {
    res.end(`Deleting leader ${req.params.leaderId}`)
});


module.exports = leaderRouter;