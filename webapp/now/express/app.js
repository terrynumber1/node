/* http://runnable.com/U0sU598vXio2uD-1/example-reading-form-input-with-express-4-0-and-body-parser-for-node-js */

/* body-parser is a middle software that parses html form data
*  and convert it to javascript object
*  acessible through req.body
*  */

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

/* instruct app the use 'bodyParser()' for all routes */
app.use( bodyParser() );


/* Web browser default method is 'GET'
* The form action is '/'  and its method is 'POST'
* 'app.post' will get the form
* */
app.get('/', function(req, res) {
   var html = '<form action="/" method="post">' +
                'Enter your name: ' +
                '<input type="text" name="userName" placeholder="..">' +
                '<br>' +
                '<button type="submit">Submit</button>' +
                '</form>';

//    res.send(html);
   res.send();
});

/* This route receives the POST form
  * 'req.body' will be filled in with the form elements
  * */

app.post('/', function(req, res) {
    var userName = req.body.userName;
    var html = 'Hello: ' + userName; + '<br>' + '<a href="/">Go back</a>';

    res.send(html);
});

app.listen(3000);