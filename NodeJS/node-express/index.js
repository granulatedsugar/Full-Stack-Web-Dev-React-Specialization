// Import modules
const express = require('express');
const http = require('http');
const morgan = require('morgan');

// Port  and Hostname declaration
const hostname = 'localhost';
const port = 3000;


const app = express();
// Will print additional information for development
app.use(morgan('dev'));

// Serve html files from public folders
app.use(express.static(__dirname + '/public'))

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