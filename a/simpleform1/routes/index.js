var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Variable Express' });
});

/* GET hello world page */
router.get('/helloworld', function (req, res) {
    res.render('helloworld', {title: 'title variable'});
});

/* GET Userlist page */
router.get('/user/list', function (req, res) {
    var db = req.db;

    var collection = db.get('usercollection');
    collection.find({}, {}, function (error, docs) {
        res.render('userlist', {
            "userlist": docs
        });
    });
});


module.exports = router;
