var mongoClient = require('mongodb').MongoClient;

var demoPerson = { name: 'John', lastName: 'Smith' };
var findKey = { name: 'John' };

mongoClient.connect('mongodb://127.0.0.1:27017/demo', function(err, db) {
    if(err)
        throw err;

    console.log('Connected to DATABASE!!!');

    var collection = db.collection('people');

    collection.remove(findKey, function(err, results) {
        console.log('Deleted person');
    });

    db.close();
});