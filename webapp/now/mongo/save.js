var mongoClient = require('mongodb').MongoClient;

var demoPerson = {name: 'Jin', lastName: 'Jin'};
var findKey = {name: 'Jin'};

mongoClient.connect('mongodb://127.0.0.1:27017/demo',
    function(err, db) {
        if (err)
            throw err;

        console.log('Connected to database');

        var collection = db.collection('people');

        demoPerson.lastName = 'Jang';

        collection.save(demoPerson, function(err) {
            console.log('Updated');

            collection.find(findKey).toArray(function (err, re) {
                console.log(re);

                // cleanup
                collection.drop(function() {});
            });
        });
});
