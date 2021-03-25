// Import modules
// Use getpostman for testing
const express = require('express');
const http = require('http');
const morgan = require('morgan');
// const bodyParser = require('body-parser'); // Deprecated

// Import  dishRouter
const dishRouter = require('./routes/dishRouter')
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


// Mount Router
// What this means is that any request coming to /dishes 
// will be handled by dishRouter
app.use('/dishes', dishRouter);

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