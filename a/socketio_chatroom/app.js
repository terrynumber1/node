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

// Testing MongoDB driver,
var mongo = require('mongodb').MongoClient;

app.get('/mongo', function (req, res) {

    mongo.connect('mongodb://localhost/todo1', function (err, dbConnectionObject) {

        if (err) {
            console.log('DATABASE CONNECTION ERROR: ' + err);
        } else {
            var collection = dbConnectionObject.collection('todocollection1');
            var result = collection.find().stream();

//            console.log(result);
        }
    });

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

    // display previous 10 mesasges when a user is connected to our server
    mongo.connect('mongodb://localhost/chat1', function (err, dbConnectionObject) {

        if (err) {
            console.log('DATABASE CONNECTION ERROR: ' + err);
        } else {
            var collection = dbConnectionObject.collection('c1');
            var stream = collection.find().sort().limit(10).stream();

//            console.log(stream);

            stream.on('data', function (message) {
                socket.emit('chat', message.content);
            });
        }
    });

    // Received a message in 'chat' channel
    socket.on('chat', function (message) {

        // insert chat message to MongoDB
        mongo.connect('mongodb://localhost/chat1', function (err, dbConnectionObject) {
            if (err) {
                console.log('Database connection error: ' + err);
            } else {
                var collection = dbConnectionObject.collection('c1');
                collection.insert({content: message}, function (err, o) {
                    if (err) {
                        console.warn(err.message);
                    } else {
                        console.log('chat message inserted into db: ' + message);
                    }
                });
            }
        });

        // send chat message to all connected web browsers
        socket.broadcast.emit('chat', message);
    });





    socket.emit('name1', {
        key: 'this code is inside app.js'
    });

    socket.on('name2', function (data) {
        console.log(data);
    });
});
