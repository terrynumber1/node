var fs = require('fs');
var http = require('http');


function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'} );
    response.writeHead('Error 404: Resource not found.');
    response.end();
}

var server = http.createServer(function (req, res) {

//    console.log(request.headers);
//    console.log(request.method);
//    console.log(request.url);

    if(req.method === 'GET' && req.url ==='/' ) {
        res.writeHead(200, {'content-type' : 'text/html'} );
        fs.createReadStream('./index.html').pipe(res);
    } else {
        send404(res);
    }
});

server.listen(3000);

console.log('Server running at port 3000');