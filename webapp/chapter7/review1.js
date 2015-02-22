/**
 * Created by cnnicentral on 2/16/2015.
 */

'use strict';

// begin scope variable
var http = require('http');
var express = require('express'); // importing EXPRESS module

var appExpress = express(); // an express object
var server = http.createServer(appExpress);
// end scope variable

// begin server routing callback functions
var callback1 = function(request, response) {
    request.send('this is the test page');
};
// end server routing callback functions

// beging environment configuration
// for ALL environment setting
appExpress.configure(function() {
    appExpress.use( express.bodyParser() ); // use to parse form data
    appExpress.use( express.methodOverride() ); // use for RESTful service
    appExpress.use( express.static(__dirname + '/public') ); // use for serving static file

    appExpress.use( appExpress.router ); // use for URL routing
});

// for DEVELOPMENT setting
appExpress.configure('development', function(){
    appExpress.use( express.logger() );
    appExpress.use( express.errorHandler({
        dumpException: true,
        showStack: true
    }));
});

// for PRODUCTION setting
appExpress.configure('production', function() {
    appExpress.use( express.errorHandler );
});
// end environment configuration

// beging server ROUTING
appExpress.get('/', function(request, response) { // GET HTTP method
    response.redirect('spa.html');
});

appExpress.get('/test', function(request, response) {
    response.send('this is a test page');
});

// creating user
appExpress.post('/user/create', function(request, response) {
    response.contentType('json');
    response.send({title: 'user created'});
});

// read user
appExpress.get('/user/read/:id([0-9]+)', function(request, response) {
    response.contentType('json');
    response.send({
        // request.params[id]
        title: 'user with id ' + request.params.id + ' found'
    });
});

// update user
appExpress.post('/user/update/:id([0-9]+)', function(request, response) {
    response.contentType('json');
    response.send({
        title: 'user with id ' + request.params.id + ' updated'
    });
});
// delete user
appExpress.get('/user/delete/:id([0-9]+)', function (request, response) {
    response.contentType('json');
    response.send({
        title: 'user with id ' + request.params.id + ' deleted'
    });
});
// end server ROUTING

// start server
server.listen(3000);
console.log('Express is running on port %d on %s mode',
    server.address().port, appExpress.settings.env);


