/*
* This is where we will create the
* schema and model.
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// What this will do is load a new currency type
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


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
    }
},{
    timestamps: true
});

// ---------- COMMENT SCHEMA END ---------- //

// ---------- DISH SCHEMA START ---------- //
// Create Schema
const dishSchema = new Schema({

    // Define values
    name: {
        type: String, // type
        required: true, // Every doc will have the name as a required field
        unique: true // Meaning NO two documents should have the same name field
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: '' // Default empty as it is not required by all items
    },
    price: {
        type: Currency, // Declared  -> mongoose-currency
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    comments: [ commentSchema ] // Subdocument! Usage of subdocument in mongoose!
},{
    timestamps: true // Add timestamp to each document
});
// ---------- DISH SCHEMA END ---------- //

// Construct model from schema
var Dishes = mongoose.model('Dish', dishSchema);

// Export model
module.exports = Dishes;