var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('chat message', function (msg) {
        console.log(msg);
        io.emit('chat message', msg);
    });

//    socket.on('disconnect', function () { console.log('user disconnected'); });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

//
//
// http://stackoverflow.com/questions/24609991/using-socket-io-in-express-4-and-express-generators-bin-www
