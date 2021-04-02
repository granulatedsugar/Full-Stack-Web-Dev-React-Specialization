/*
* This is where we will create
* the schema and model.
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// No need for currency since we will not use
// currency in the leaders

// ---------- LEADER SCHEMA START ---------- //
// Create Schema
const leaderSchema = new Schema({

    // Define values
    name: {
        type: String, // Name should be string
        required: true, // Every leader should have a name
        unique: true // Meaning NO two documents(record) should have the same value
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true // Add  timestamp to each document
});

// ---------- LEADER SCHEMA END ---------- //
var Leaders = mongoose.model('Leader', leaderSchema);

// Export model
module.exports = Leaders;


