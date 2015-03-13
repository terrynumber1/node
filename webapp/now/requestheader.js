var express = require('express');
var app = express();


app.get('/headers', function(req, res) {
    res.set('Content-Type', 'text/plain');
    var string1 = '';

   for(var i in req.headers) {
       console.log(i);
       console.log(req.headers[i]);
       string1 = string1 + ' ' + req.headers[i];
   }

   console.log(req.headers);
   res.send(req.ip);
});

app.listen(3000);