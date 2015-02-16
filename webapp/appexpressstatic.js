// Using a Mac or Linux, set it like this:
// NODE_ENV=production node app.js

'user strict';

// beging module scope variable
var http = require('http');	// load http module
var express = require('express'); // load express module

var appExpress = express(); // crete an app object
var server = http.createServer(appExpress);
// end module scope variable

// server routing callback functions
var callback2 = function(rq, re) {
	re.send('this is the test page');
};
// end server routing callback functions

// begin environment settings
// use bodyParser(), methodOVerride() for every environment
appExpress.configure(function() {
	appExpress.use( express.bodyParser() );
	appExpress.use( express.methodOverride() );

	appExpress.use( express.static(__dirname + '/public') );
	appExpress.use( appExpress.router );
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
// end enviroment settings

// server routing configurations
appExpress.get('/', function(reqest, response) {
	response.redirect('/spa.html');
});

appExpress.get('/user/list', function(request, response) {
	response.contentType( 'json' );
	response.send( {title: 'user list'} );
});

appExpress.get('/test', callback2);

appExpress.post('/user/create', function(request, response) {
	response.contentType( 'json' );
	response.send( {title: 'user created'} );
});

appExpress.get( '/user/read/:id', function(request, response) {
	response.contentType('json');
	response.send({
		title: 'user with id ' + request.params.id + ' found' //request.params[id]
	});
});
// end server routing configuration

// start server
server.listen(3000);
console.log('Express server running at port %d in %s mode',
	server.address().port, appExpress.settings.env);
