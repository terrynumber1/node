var express = require('express');
var http = require('http').Server(app);

var app = express();
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

//http://stackoverflow.com/questions/24609991/using-socket-io-in-express-4-and-express-generators-bin-www

// Socket.IO is composed of two parts;
// 1. A server that integrates with Node.JS HTTP Server: socket.io
// 2. A client library that loads on the browser side: socket.io-client
// sudo npm install --save socket.io