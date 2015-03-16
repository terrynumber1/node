var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.get('/', function(req, res) {
    res.send('it is here');
});

app.listen(3000);
console.log('Server running');