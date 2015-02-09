var http = require('http'); // get the http module
var server = http.createServer(); // create server 

// turn on server 
server.on('request', function(request, response) {
	response.end('Wel to the Server');
})

// this method will run only once
server.once('connection', function() {
	console.log('We have a first user.');
});


// listen for incoming connection 
server.listen(8080);

console.log('Server is running at http://opsvm3:8080, press control-c to exit');