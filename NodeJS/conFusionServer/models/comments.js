/*
* This is where we will create the
* schema and model.
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ---------- COMMENT SCHEMA START ---------- //
// Create Schema
const commentSchema = new Schema({
    rating: {
        type:  Number, // type
        min:  1, // Minimum value
        max: 5, // Max value
        required:  true // Required field
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }
},{
    timestamps: true
});

var Commenets = mongoose.model('Comment', commentSchema)

// ---------- COMMENT SCHEMA END ---------- //