var http = require('http');
var server = http.createServer();

server.on('request', function(request, response) {
	response.writeHead(200, {'Content-Type' : 'text/plain'});
	response.end('herfffffe');	
});

server.listen(4000);
console.log('http://opsvm3:4000 + control-c to quit');