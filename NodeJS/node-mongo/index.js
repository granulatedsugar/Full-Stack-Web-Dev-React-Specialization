/* 
* This is wehre we will create a node aplpication
* that will interact with the mongodb server
*/
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/'; // URL where mongo can be accessed:port
const dbname = 'conFusion'; // Database name

// Takes url as first param, and a callback function as a second params 
MongoClient.connect(url).then((client, err) => { // 1st part of the promise

    assert.equal(err, null); // Check to see if error is not NULL

    console.log('Connected correctly to server');

    const db = client.db(dbname); // To connect to Database

    dboper.insertDocument(db, { name: "Vadonut", description:  "Test"}, 'dishes') 
    .then((result) => {

        console.log(`Insert Document:\n`, result.ops);

        return dboper.findDocuments(db, 'dishes')

    })
    .then((docs) => {
   
        console.log(`Found Documents:\n`, docs);

        return dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" }, "dishes")

    })
    .then((result) => {
                
        console.log("Updated Document:\n", result.result);

        return dboper.findDocuments(db, 'dishes')

    })
    .then((docs) => {

        console.log(`Found Documents:\n`, docs);

        return db.dropCollection('dishes')
    
    })
    .then((result) => {

        console.log(`Dropped  Collection:`, result);

        client.close();
    })
    .catch((err) => console.log(err));
})
// 2nd part of the promise
.catch((err) => console.log(err));