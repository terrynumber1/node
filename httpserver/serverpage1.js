// Simple JavaScript web server
// 1. create http object
// 2. use http object to create a web server
// 3. turn on web server
// 4. make web server listen 

// 1:04 8

var http = require('http')
var server = http.createServer();

server.on('request', function(request, response) {
	response.end('hsdfkdddddddsjfldsfjd');
});

server.listen(8080);
