
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/routes');   // loading the routes FOldER, routes.js FILE

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');   // setup jade folder
  app.set('view engine', 'jade');           // set view engine to jade
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));   // static file folder
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);         // folder /routes/routes.js exported index function
app.get('/about', routes.about);    // folder /routes/routes.js about exported function
app.get('/todo', routes.todo);

app.post('/myaction', function(req, res) {
    res.send('You send the name ' + req.body.name + ' ' + req.body.name2);
})


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
