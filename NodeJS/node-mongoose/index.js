const mongoose = require('mongoose');

const Dishes =  require('./models/dishes');

// Establish connection
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected correctly to server');

    // Will cause this value to be saved/created
    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    }) 
    // Promise
    .then((dish) => {
        console.log(dish);

        return Dishes.find({}).exec(); // Find Dishes
    })
    .then((dishes) => {
        console.log(dishes);

        return Dishes.remove({}); // Remove data from database
    })
    .then(() => {
        return mongoose.connection.close(); // Close Connection
    })
    .catch((err) => {
        console.log(err);
    });
});