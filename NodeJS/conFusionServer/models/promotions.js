/*
* This is where we will create the
* schema and model.
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Load currency type
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

// ---------- PROMO SCHEMA START ---------- //
// Create Schema
const promoSchema = new Schema({

    // Define values
    name: {
        type: String, // name type is string
        required: true, // Every document will have a required name
        unique: true, // Each item should be unique
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: '' // Default empty as it is not required by all items
    },
    price: {
        type: Currency, // Declared -> mongoose-currency
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Add time stamp to each document
});
// ---------- PROMO SCHEMA END ---------- //

// Contstruct model from shcema
var Promotions = mongoose.model('Promotion', promoSchema);

// Export model
module.exports = Promotions;