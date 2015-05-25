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
io.on('connection', function (socket) {
    socket.emit('name1', {
        key: 'this code is inside app.js'
    });

    socket.on('name2', function (data) {
        console.log(data);
    });
});
