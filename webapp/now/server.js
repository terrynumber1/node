var http = require('http');

var server = http.createServer( function(request, response) {

    console.log(request.headers);
    console.log(request.method);
    console.log(request.url);

    // response
    response.write('hdkfdf');
    response.end();
});

server.listen(3000);
console.log('Server running at port 3000');