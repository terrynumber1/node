var express = require('express');
var http = require('http');
var app = express();

var server = http.createServer(app);
var io = require('socket.io')(server);


app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

server.listen(3000, function () {
    console.log('Express server is running at port 3000');
});

// Socket.io pipeline between SERVER and WEB BROWSER
io.on('connection', function (socket) {
    socket.emit('name1', {
        key: 'this code is inside app.js'
    });

    socket.on('name2', function (data) {
        console.log(data);
    });
});
