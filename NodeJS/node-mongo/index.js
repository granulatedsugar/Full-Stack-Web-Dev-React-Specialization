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
MongoClient.connect(url, (err, client) => {

    assert.equal(err, null); // Check to see if error is not NULL

    console.log('Connected correctly to server');

    const db = client.db(dbname); // To connect to Database

    dboper.insertDocument(db, { name: "Vadonut", description:  "Test"}, 'dishes', (result) => {

        console.log(`Insert Document:\n`, result.ops);

        dboper.findDocuments(db, 'dishes', (docs) => {
   
            console.log(`Found Documents:\n`, docs);

            dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" }, "dishes", (result) => {
                
                console.log("Updated Document:\n", result.result);

                dboper.findDocuments(db, 'dishes', (docs) => {
                    console.log(`Found Documents:\n`, docs);

                    db.dropCollection('dishes', (result) => {
                        console.log(`Dropped  Collection:`, result);

                        client.close();
                    });
                });
            });
        });
    });
});
