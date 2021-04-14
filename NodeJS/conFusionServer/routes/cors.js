const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3443', 'http://Nikkos-MacBook-Pro:3001']
var corsOptionsDelegate = (req, callback) => { // Check if incoming belongs to whitelist
    var corsOptions;

    if (whitelist.indexOf(req.header('Origin')) != -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false }; // Origin will not be returned
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);