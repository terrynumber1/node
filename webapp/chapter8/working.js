/**
 * Created by Tae on 2/16/2015.
 * Express server with Generic routing
 */

'use strict';

// begin scope variable
var http = require('http');
var express = require('express'); // importing EXPRESS module

var routes = require('./routes.js');

var appExpress = express(); // an express object
var server = http.createServer(appExpress);
// end scope variable

// begin environment configuration
// for ALL environment setting
appExpress.configure(function() {
    appExpress.use( express.bodyParser() ); // use to parse form data
    appExpress.use( express.methodOverride() ); // use for RESTful service
    appExpress.use( express.basicAuth('user', 'password') ); // add authentication
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

// begin server ROUTING
routes.configRoutes(appExpress); // I do not understand this line
// end server ROUTING

// start server
server.listen(3000);
console.log('Express is running on port %d on %s mode',
    server.address().port, appExpress.settings.env);


