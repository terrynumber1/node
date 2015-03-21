var express = require('express');
var bodyParser = require('body-parser');

// The express app
var app = express();

// Create a mongodb connection
// and only start express listing once the connection is ok
var MongoClient = require('mongodb').MongoClient;
var db , itemsCollection;

MongoClient.connect('mongodb://127.0.0.1:27017/demo', function(err, database) {
    if (err) throw err;

    // Connected!
    db = database;
    itemsCollection = db.collection('items');

    app.listen(3000);
    console.log('Listening on port 3000');

//    console.log(itemsCollection); // too much junk
//    itemsCollection.find().toArray(function(err, results) {
//        console.log('RESULTS: ', results);
//    })

});

// Create a router that can accept JSON
var router = express.Router();
router.use( bodyParser.json() );

// Setup the collection routes
router.route('/')
    .get(function(req, res, next) {
        console.log('route /');
        itemsCollection.find().toArray(function(err, docs) {
            res.send({
                status: 'Items found',
                items: docs
            });
        });
    })



app.use(express.static(__dirname + '/public')).use('/todo', router);
