/**
 * Created by TJ on 2/20/2015.
 */


//import core module
var http = require('http');

// create express object
var express = require('express');

var appE = express();

// create server object
var server = http.createServer(appE);


// configure production and development environment
appE.configure(function () {
    appE.use(express.bodyParser()); // for parsing form data
    appE.use(express.methodOverride());
});

// configure route, GET and POST method
appE.get('/', function (request, response) {
    response.send('HELLELJELJFDJF');
    console.log(request.url);
});

appE.get('/hello', function (request, response) {
    response.send('This is the hello page');
//    console.log(request.headers);
    console.log(request.host + request.url);
});

server.listen(3000);
console.log('running');


//var watchMap = {};
//var ke = 'ke1';
//console.log(watchMap);

//watchMap[1] = true;
//console.log(watchMap);
//watchMap[ke] = 'jdjdkd';
//console.log(watchMap);

