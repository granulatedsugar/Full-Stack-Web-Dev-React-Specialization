/* 
* This is wehre we will create a node aplpication
* that will interact with the mongodb server
*/
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const url = 'mongodb://localhost:27017/'; // URL where mongo can be accessed:port
const dbname = 'conFusion'; // Database name

// Takes url as first param, and a callback function as a second params 
MongoClient.connect(url, (err, client) => {

    assert.equal(err, null); // Check to see if error is not NULL

    console.log('Connected correctly to server');

    const db = client.db(dbname); // To connect to Database
    const collection = db.collection('dishes'); // Access dishes table

    // We will try to insert one object.
    // First argument is the data and second is a callback function  that takes two params
    collection.insertOne({ "one": "Uthapizza", "description": "test"}, (err, result) => { 
        
        assert.equal(err, null); // Assertion, check to make sure that error is not null

        console.log('After insert: \n'); // After we insert then 
        console.log('result.ops');  // We get the result value, this result will provide OPS property
        
        // We supply an empty js object, so it will search for 
        // everything in the collection and return to us
        collection.find({}).toArray((err, docs) => { 

            assert.equal(err, null);

            console.log('Found\n');
            console.log(docs); // All Documents[Row] in the collection will be returned.

            db.dropCollection('dishes', (err, result) => {

                assert.equal(err, null);

                client.close(); // Close connection the database
            });
        });
    });
});