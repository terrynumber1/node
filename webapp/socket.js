/**
 * Created by Tae on 2/17/2015.
 */

'use strict';

var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var fsHandle = require('fs');

var appE = express();
var server = http.createServer(appE);
var io = socketio.listen(server); // listening to what's going on in the server

var countUp;
var countIndex = 0;

var setWatch;
var watchMap = {};

countUp = function () {
    countIndex++;
    console.log(countIndex);
    io.sockets.send(countIndex);
};

setWatch = function (url_path, file_type) {
    console.log('setWatch called on ' + url_path);

    if (!watchMap[url_path]) {
        console.log('setting watch on ' + url_path);
        fsHandle.watchFile(url_path.slice(1), function (current, previous) {
            console.log('file accessed');
            if (current.mtime !== previous.mtime) {
                console.log('file changed');
                io.sockets.emit(file_type, url_path);
            }
        });

        watchMap[ url_path ] = true;
    }
};

appE.configure( function() {
    appE.use(function (request, response, next) {
        if (request.url.indexOf('/js/') >= 0) {
            setWatch(request.url, 'script');
        }
        else if (request.url.indexOf('/css/') >= 0) {
            setWatch(request.url, 'stylesheet');
        }

        next();
    });

    appE.use( express.static(__dirname + '/') );
});

appE.get('/', function (request, response) {
    response.redirect('/socket.html');
});

server.listen(3000);
console.log('Express server listening on port %d in %s mode', server.address().port, appE.settings.env);

//setInterval(countUp, 1000);