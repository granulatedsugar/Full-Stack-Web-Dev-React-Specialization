/*! This file contains the implementation of the 
* handling of REST API endpoint for /dishes and
* dishes/:dishId endpoints.
*/
// Express Route (Already included in Express)
const express = require('express');
// const bodyParser = require('body-parser'); // Deprecated

// To use an express router
const dishRouter = express.Router();

// dishRouter.use(bodyParser.json()); // Deprecated
// Using latest
dishRouter.use(express.json());

// First route '/' because we need to mount
// it in the index. By using this approach
// we are declaring the endpoint at one 
// single location whereby we can chain all
// get, post, put, delete method.
dishRouter.route('/')

//---------- START REST ----------
// first parameter is the endpoint, second is the callback function
.all((req, res, next) => {
    // Insidee we are gonna handle the incoming request
    // When a request comes in, no matter which method is invoke
    // This code will be executed first
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    
    // Call next
    // What it means is that it will continue on
    // Passing it to the next  "app.get"
    next();
})

// Will receive next() / Get Request
.get((req, res, next) => {
    res.end('Will send all the dishes to you!');
})

// Post Request
.post((req, res, next) => {
    // JSON will be parse as a JS Object
    res.end('Will add the dish: ' + req.body.name + 
        ' with  details: ' + req.body.description);
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
    res.end('Deleting all the dishes!');
});


// //----- Setup to support /dishes/:dishID

// // Will receive next() / Get Request
// app.get('/dishes/:dishId', (req, res, next) => {
//     res.end('Will send details of the dish:'
//         + req.params.dishId + ' to you!'); // dishID should match params in /dishes/:dishId
// });

// // Post Request
// app.post('/dishes/:dishId', (req, res, next) => {
//     res.end('POST operation not supported on /dishes/'
//         + req.params.dishId);
// });

// // Put Request
// // When you do a put you are sending back the info
// // of which dishId you are updating.
// app.put('/dishes/:dishId', (req, res, next) => {
//     res.write('Updating the dish: '
//         + req.params.dishId + '\n');
//     // Notice we use req.body instead of req.params - Because 
//     // we can access json strings that contains the details 
//     // because we are using the body parser.
//     res.end('Will update the dish: ' + req.body.name
//         + ' with details: ' + req.body.description)
// });

// // Delete  Request
// app.delete('/dishes/:dishId', (req, res, next) => {
//     res.end('Deleting dish: ' + req.params.dishId);
// });

//---------- END ----------

// Export
module.exports = dishRouter;