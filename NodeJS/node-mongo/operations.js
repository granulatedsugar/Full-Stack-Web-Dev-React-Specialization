/*
* This file will encapsulate all database oeprations
* find, remove, insert, update a documenbt in the 
* database and will be organize as a file base module
*/

const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.insert(document); // Return the promise
};

exports.findDocuments = (db, collection, callback) => { // Find documents in the collection
    const coll = db.collection(collection);
    return coll.find({}).toArray(); // Empty js string, calls all // Return the promise
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document); // Return the promise
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update}, null); // Return the promise
};