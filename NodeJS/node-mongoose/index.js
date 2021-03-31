const mongoose = require('mongoose');

const Dishes =  require('./models/dishes');

// Establish connection
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected correctly to server');

    // 1. Created dish
    // 2. Updated dish
    // 3. Inserted comment
    // 4. Printed out
    // Will cause this value to be created
    Dishes.create({ // 1
        name: 'Uthappizza',
        description: 'test'
    }) 
    // Promise
    .then((dish) => { // 2
        console.log(dish); // console  log dish

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test' },
        },{
            new: true  // Meaning once the  update  is complete, return updated dish (NEW)
        }).exec(); // Find Dishes, and update
    })
    .then((dish) => { // 3
        console.log(dish);

        // Push an item
        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });
    
        return dish.save(); // Save comment
    })
    .then((dish) => { // 4
        console.log(dish);

        return Dishes.remove({}); // Remove data from database
    })
    .then(() => {
        return mongoose.connection.close(); // Close Connection
    })
    .catch((err) => {
        console.log(err);
    });
});