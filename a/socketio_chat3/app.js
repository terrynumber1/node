var path = require('path');

var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use( express.static( path.join(__dirname, 'public') ) );

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


server.listen(3000, function () {
    console.log('Server started at port 3000');
});


io.on('connection', function (socket) {
    console.log('a user has connected');

    // receive message from browser on channel 'chat'
    socket.on('chat', function (data1) {
        console.log(data1);

        io.sockets.emit('chat', data1);
    });



});