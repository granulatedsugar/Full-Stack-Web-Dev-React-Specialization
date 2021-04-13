/*! This file contains the implementation of the 
* handling of REST API endpoint for /upload endpoints.
*/
// Express Route (Already included in Express)
const express = require('express');
const bodyParser = require('body-parser'); // Deprecated
const authenticate = require('../authenticate'); // Authentication
const multer = require('multer');
const cors = require('./cors');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

// File filter
// list of files im willing to accept
const imageFileFilter = (req, file, cb) => {
    // If it doesnt match allowed file ext
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files'), false);
    }
    cb(null, true);
};

const upload= multer({ storage: storage, fileFilter: imageFileFilter })

const uploadRouter = express.Router();
uploadRouter.use(express.json());// Parser

//-----------------------------------------/
//---------- MULTER ROUTER START ----------/
//-----------------------------------------/
// First route '/' because we need to mount
// it in the index. By using this approach
// we are declaring the endpoint at one 
// single location whereby we can chain all
// get, post, put, delete method.
uploadRouter.route('/')

// Pre-flight
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})

// ONLY ALLOWED
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
})

.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
})

module.exports = uploadRouter;