// Using a Mac or Linux, set it like this:
// NODE_ENV=production node app.js

'user strict';

// beging module scope variable
var http = require('http');
var express = require('express');
var appExpress = express();
var server = http.createServer(appExpress);
// end module scope variable

// server routing configurations
var callback1 = function(request, response) {
	response.send('hello from express');
};

var callback2 = function(rq, re) {
	re.send('this is the test page');
};

// use bodyParser(), methodOVerride() for every environment
appExpress.configure(function() {
	appExpress.use( express.bodyParser() );
	appExpress.use( express.methodOverride() ); // RESTful service
});

// development environment, use logger() and errorHandler to dump exception
// and show stack trace
appExpress.configure('development', function() {
	appExpress.use( express.logger() );
	appExpress.use( express.errorHandler({
		dumpException: true,
		showStack: true
	  })
	);
});

// production environment, use errorHandler
appExpress.configure('production', function() {
	appExpress.use( express.errorHandler() );
});

appExpress.get('/', callback1);
appExpress.get('/test', callback2);
// end server routing configuration

// start server
server.listen(3000);
console.log('Express server running at port %d in %s mode',
	server.address().port, appExpress.settings.env);
