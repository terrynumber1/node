var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// default express, jade routes
//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup, express-handlebars
var handlebars = require('express-handlebars');
app.engine('handlebars', handlebars({extname: 'handlebars', defaultLayout: 'main.handlebars'}));
app.set('view engine', 'handlebars');

// view engine setup, jade
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', function (req, res) {
    var link1 = req.url;

    // home.handlebars
    res.render('home', {
        randomvar:'test variable'.toUpperCase(),
        link: link1
    });
});

app.get('/admin', function (req, res) {
    var admin1 = true;
    var link1 = req.url;
    res.render('admin', {
        link: link1,
        admin: admin1
    });
});

app.get('/heartbeat', function (req, res) {
    console.log(req.url);
    res.send('you requested /hearbeat');
});

// GET /posts, show all posts
app.get('/posts', function (req, res) {
//    res.send('showing all post');

    var posts1 = [
        {
            title: "Building web application is boring",
            author: "The boring man",
            body: "There is nothing to learn from it."
        },
        {
            title: "Using Template with Handlebars",
            author: "Handle dude",
            body: "Handlebars is better than Jade."
        },
        {
            title: "I like hot cheerleaders.",
            author: "Chill man",
            body: "I want 3 of them."
        }
    ];

    // post.handlebars
    res.render('post', {
//        posts: posts1[0].title
          // variable posts in post.handlebars /view
          posts: posts1
    });
});

// GET /posts/new, show form for creating new post
app.get('/posts/new', function (req, res) {
    res.send('HTML form for creating new post');
});

// POST /posts, create a new post
app.post('/posts', function (req, res) {
    res.send('posting new data to the server');
});

// GET /posts/:id, display a specific post
app.get('/posts/:id', function (req, res) {
    var userid = req.params.id;
    res.send('you requested post with id: ' + userid);
});

// GET /posts/:id/edit, return an HTML form for editing a post
app.get('/posts/:id/edit', function (req, res) {
    var userid = req.params.id; // :id
    res.send('you reqested post with id: ' + userid + ' to be edited');
});

// PUT /posts/:id, update a specific post
app.put('/posts/:id', function (req, res) {
    var userid = req.params.id;
    res.send('you requrest put for id: ' + userid);
});

// DELETE /posts/:id, delete a specific post
app.delete('/posts/:id', function (req, res) {
    var userid = req.params.id;
    res.send('you request delete for post with id: ' + userid);
});




// default express, jade routes
//app.use('/', routes);
//app.use('/users', users);

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
