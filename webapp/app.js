// app.js - Basic routing

var http, server;

http = require('http');

var cServer = function(request, response) {
	var response_text = request.url === '/test' ? 'test page' : 'home';
	response.writeHead(200, {'Content-Type': 'text/plain'} );
	response.end(response_text);
};

server = http.createServer(cServer);
server.listen(3000);

console.log('Listening on port %d', server.address().port );


