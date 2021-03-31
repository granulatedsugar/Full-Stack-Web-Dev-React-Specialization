/*
* This is where we will create the
* schema and model.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const dishSchema = new Schema({

    // Define values
    name: {
        type: String, // Schema type
        required: true, // Every doc will have the name as a required field
        unique: true // Meaning NO two documents should have the same name field
    },
    description: {
        type: String,
        required: true
    }
},{
    timestamps: true // Add timestamp to each document
});


// Construct model from schema
var Dishes = mongoose.model('Dish', dishSchema);

// Export model
module.exports = Dishes;