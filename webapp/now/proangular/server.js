var connect = require('connect');
var serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic("./") );
app.listen(5000);
console.log("Server running at port 5000");