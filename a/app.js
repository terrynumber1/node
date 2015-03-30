var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.all('*', function (req, res) {
    // msg: is a JADE variable
    res.render('index', {msg: 'Welcome to the Practical Node.js'
        , isChecked:'false'
        , ptext: 'ksjdfljlsdfjldsfjl'
    });
});

http
    .createServer(app)
    .listen(3000);

console.log("Server running on port 3000");
