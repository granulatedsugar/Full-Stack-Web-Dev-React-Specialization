// Node base HTTP Server
const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 3000;


// Create Server
const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method == 'GET')  { // GET request method
        var fileUrl; 
        // Examine the URL that comes in | 
        // If you just request localhost:3000 it will default to index.html
        if (req.url == '/') fileUrl = '/index.html';
        // Otherwise file URL will be equal to request URL
        else fileUrl = req.url;

        // Find the path of the file. Path  module supports resolve.
        // It will give us the full path for the file.
        var  filePath = path.resolve('./public' + fileUrl);
        // Making sure the filename extension is HTML
        const fileExt = path.extname(filePath);
        // If file extention is an HTML file
        if (fileExt == '.html') {
            // The exists method will check to see if the file exists
            // It will be a bool  (True or False)
            fs.exists(filePath, (exists) => {
                // If the file does not exists, respond 404
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: ' + fileUrl + ' not found</h1></body></html>');

                    return;
                }
                // If the file exists
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                // We need to read in  the file, will take the file path as a parameter and then  convert
                // into a stream of bytes.
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else { // If NOT an HTML file
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl + ' not an HTML file</h1></body></html>');

            return;
        }
    }
    else { // If request NOT GET method
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + ' not supported</h1></body></html>');

        return;
    }
})


// Start server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});


// Basic Node Server Setup
// const http = require('http');

// const hostname = 'localhost';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     console.log(req.headers);
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end('<html><body><h1>Hello, World!</h1></body></html>');
// })

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });