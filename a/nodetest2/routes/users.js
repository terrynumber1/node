var express = require('express');
var router = express.Router();

/* GET userlist.*/
// http://opsvm3.turner.com:3000/users/userlist
router.get('/userlist', function (req, res) {
    var db = req.db;
    db.collection('userlist').find().toArray(function (err, items) {
        res.json(items);    // JSON
    });
});

/* POST to adduser */
router.post('/adduser', function (req, res) {
    var db = req.db;

    // userlist collection is the name in MongoDB
    db.collection('userlist').insert(req.body, function (err, result) {
        res.send(
            (err === null ? {msg: ''} : {msg: err} )
        );
    });
});

/* DELETE to deleteuser */
router.delete('/deleteuser/:id', function (req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    // DEBUG
    console.log(userToDelete);

    db.collection('userlist').removeById(userToDelete, function (err, result) {
        res.send( (result === 1) ? {msg: ''} : {msg: 'error: ' + err} );
    });
});


module.exports = router;

HERE
http://scottksmith.com/blog/2014/05/05/beer-locker-building-a-restful-api-with-node-crud/
make a new project with mongoose