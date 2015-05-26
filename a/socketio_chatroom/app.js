var express = require('express');
var http = require('http');
var app = express();



// view engine set up, HANDLEBARS
var path = require('path');
var handlebars = require('express-handlebars');
app.engine('handlebars', handlebars({extname: 'handlebars', defaultLayout: 'main.handlebars'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);
var io = require('socket.io')(server);


//app.get('/', function (req, res) { res.sendfile(__dirname + '/index.html'); });

app.get('/', function (req, res) {
    res.render('home');

});

server.listen(3000, function () {
    console.log('Express server is running at port 3000');
});

// Socket.io pipeline between SERVER and WEB BROWSER
// execute the call-back function for every 'connection' via WebSocket to our HTTP server
io.on('connection', function (socket) {

    console.log('a user just connected');

    // web browser, socket.emit('name',{key:value})
    socket.on('disconnect', function () {
        console.log('a user just disconnected');
    });

    socket.on('chat', function (message) {
        socket.broadcast.emit('chat', message);
    });

    socket.emit('name1', {
        key: 'this code is inside app.js'
    });

    socket.on('name2', function (data) {
        console.log(data);
    });
});
