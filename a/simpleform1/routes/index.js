var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Variable Express' });   // index.jade, variable title
});

/* GET hello world page */
router.get('/helloworld', function (req, res) {
    res.render('helloworld', {title: 'title variable'});
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page */
router.get('/newuser', function (req, res) {
    res.render('newuser', {title: 'Add a new user'});
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.email;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
            "username": userName,
            "email": userEmail
        }, function (err, doc) {
            if (err) {
                // if it failed, return error
                res.send("There was a problem adding the information to the database.");
            } else {
                // if it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        }
    );

});


module.exports = router;
