var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog1');
var db = mongoose.connection;

db.on('error', function () {
    console.log('Database connection error');
});
db.once('open', function () {
    console.log('Connected to database');
});


//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

// routes ========================================================
var mongoPost = require('./mydb.js');

// GET all posts
app.get('/api/allposts', function (req, res) {

    // use mongoose to get all todo list from the database
    mongoPost.find(function (err, result) {
        // if there is an error retrieving, send the error, nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(result);
    });
});

// GET 1 post with specified :id
app.get('/api/post/:id', function (req, res) {

    // use mongoose to get a post with specific :id
    var reqid = req.params.id;

    mongoPost.findById( reqid ).exec( function (err, result) {
        if (err) {
            res.send(err);
        }

        res.json(result);
    });

});

app.post('/api/todos', function (req, res) {
    mongoTodo.create({
        todotext: req.body.text

    }, function ( err, result) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            mongoTodo.find( function(err, result) {
                if (err)
                    res.send(err);

                res.json(result);
            });
        });
});


// delete a task
app.delete('/api/todos/:todo_id', function (req, res) {
    mongoTodo.remove({
        _id : req.params.todo_id
    }, function (err, result) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            mongoTodo.find( function(err, result) {
                if (err)
                    res.send(err);

                res.json(result);
            });

        });
});


// application =================================================================
app.get('*', function (req, res) {

    // load the single view file (angular will hand the page changes on the front-end
    res.sendfile('./public/index.html');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
