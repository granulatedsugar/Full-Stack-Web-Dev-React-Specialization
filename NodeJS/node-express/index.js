// Import modules
// Use getpostman for testing
const express = require('express');
const http = require('http');
const morgan = require('morgan');
// const bodyParser = require('body-parser'); // Deprecated

// Port  and Hostname declaration
const hostname = 'localhost';
const port = 3000;


const app = express();
// Will print additional information for development
app.use(morgan('dev'));
// Allows to parse the body in json format
// app.use(bodyParser.json()); // Deprecated
//Used to parse JSON bodies - LATEST!
app.use(express.json()); 

//---------- START ----------
// first parameter is the endpoint, second is the callback function
app.all('/dishes', (req, res, next) => {
    // Insidee we are gonna handle the incoming request
    // When a request comes in, no matter which method is invoke
    // This code will be executed first
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    
    // Call next
    // What it means is that it will continue on
    // Passing it to the next  "app.get"
    next();
});

// Will receive next() / Get Request
app.get('/dishes', (req, res, next) => {
    res.end('Will send all the dishes to you!');
});

// Post Request
app.post('/dishes', (req, res, next) => {
    // JSON will be parse as a JS Object
    res.end('Will add the dish: ' + req.body.name + 
        ' with  details: ' + req.body.description);
});

// Put Request
app.put('/dishes', (req, res, next) => {
    // JSON will be parse as a JS Object
    res.statusCode = 403; // Use Code 403 - not supported
    res.end('PUT operation not supported on /dishes');
});

// Delete  Request
app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all the dishes!');
});


//----- Setup to support /dishes/:dishID

// Will receive next() / Get Request
app.get('/dishes/:dishId', (req, res, next) => {
    res.end('Will send details of the dish:'
        + req.params.dishId + ' to you!'); // dishID should match params in /dishes/:dishId
});

// Post Request
app.post('/dishes/:dishId', (req, res, next) => {
    res.end('POST operation not supported on /dishes/'
        + req.params.dishId);
});

// Put Request
// When you do a put you are sending back the info
// of which dishId you are updating.
app.put('/dishes/:dishId', (req, res, next) => {
    res.write('Updating the dish: '
        + req.params.dishId + '\n');
    // Notice we use req.body instead of req.params - Because 
    // we can access json strings that contains the details 
    // because we are using the body parser.
    res.end('Will update the dish: ' + req.body.name
        + ' with details: ' + req.body.description)
});

// Delete  Request
app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

//---------- END ----------

// Serve html files from public folders
app.use(express.static(__dirname + '/public'))

// express takes three parameters req, res,  next
app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>');
});


// Create server
const server = http.createServer(app);

// Start server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});