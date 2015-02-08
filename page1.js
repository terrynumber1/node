var http = require('http');
var server = http.createServer();

var callback = function(resquest, response) {
	response.end("yayayaya1");
};

server.on('request', callback);

server.listen(8080);
console.log('Server is running on port 8080, press ctrl-c to abort');