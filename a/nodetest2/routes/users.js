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

module.exports = router;
