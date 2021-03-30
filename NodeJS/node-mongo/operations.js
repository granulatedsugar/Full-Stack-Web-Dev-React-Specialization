/*
* This file will encapsulate all database oeprations
* find, remove, insert, update a documenbt in the 
* database and will be organize as a file base module
*/

const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insert(document,  (err,  result) => {
        assert.equal(err, null); // Check if error is not null
        console.log(`Inserted ${result.result.n} documents into the collection ${collection}`);

        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => { // Find documents in the collection
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        callback(docs);
    }); // Empty js string, calls all
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) =>  {
        assert.equal(err, null);
        console.log("Removed the document ", document);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update}, null, (err, result) => {
        assert.equal(err, null);
        console.log("Updated the document with ", update); // F-string doesnt work in some
        callback(result);
    });
};