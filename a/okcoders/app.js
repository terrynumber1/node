var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var mongoose = require('mongoose');

// default express, jade routes
//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// connect to MongoDB
mongoose.connect('mongodb://localhost/blog1');
var db = mongoose.connection;

db.on('error', function () {
    console.log('Database connection error');
});

db.once('open', function () {
    console.log('Connected to Database');
});


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
app.use(methodOverride (function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {

        // DEBUG
        console.log(req.body);

        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

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


// GET /posts, show all posts from blogposts.js
app.get('/posts', function (req, res) {
//    res.send('showing all post');

    var blogposts = require('./blogposts.js');
    // Call the function 'all' in blogposts.js
    var allposts1 = blogposts.all();

    // post.handlebars
    res.render('post', {
//        posts: posts1[0].title
          // variable posts in post.handlebars /view
          posts: allposts1
    });
});

// GET /posts/:id, display a specific post
app.get('/posts/:id', function (req, res) {
    var userid = req.params.id;
    var url1 = req.url;

//    res.send('you requested post with id: ' + userid);

    var blogposts = require('./blogposts.js');
    var post11 = blogposts.find(userid);

    // postwithid.handlebars
    res.render('postwithid', {
        url1: url1,
        post1: post11
    })

});

var request = require('request');

app.get('/weather', function (req, res) {

    request.get('http://api.openweathermap.org/data/2.5/weather?q=georgia,%20us', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log( JSON.parse(body) );

            var weatherdatausa = JSON.parse(body);

            res.render('weather', {
                message1: weatherdatausa.sys.message,
                country1: weatherdatausa.sys.country,
                sunrise1: weatherdatausa.sys.sunrise,
            });
        }
    });

});

// MONGO SECTION =================================================
// mongoblog.js, create Schema(table structure), create model object
var mongoposts = require('./mongoblog.js');

// GET
// show all posts from MongoDB
app.get('/mongoposts', function (req, res) {
    var theurl = req.url;

    mongoposts.find( {} ).exec(function (err, results) {
        res.render('mongoposts', {
            theurl: theurl,
            mongoposts: results
        });

//        console.log(mongoposts);

    });
});

app.get('/mongoposts/:id', function (req, res) {
    var reqid = req.params.id;

    mongoposts.findById( reqid ).exec( function (err, result) {
        res.render('mongopostsid', {
            result: result,
            reqid: reqid
        });
    });

    /*
    res.render('mongopostsid', {
        reqid: reqid

    });
    */

});

var Comment = require('./mongocomments.js');

// show all comments
app.get('/mongocomments', function (req, res) {

    Comment.find({}).exec(function (err, results) {
        res.render('comments/allcomments', {
            results: results
        });

        // DEBUG
//        res.json(results);
    });
});

// show comments for a specific post
app.get('/mongocomments/:pid', function (req, res) {
    var postid = req.params.pid;

    Comment.find({ postid: postid }).exec(function (err, results) {

            res.render('comments/commentwithid', {
                results: results,
                postid: postid
            });

    });

});

// showing the form
app.get('/mongonewpost/new', function (req, res) {

    var post = new mongoposts();

    // mongonewpost.handlebars
    res.render('mongonewpost', {
        title: "Creating New Blog Post",
        post: post
    });
});

// posting the form to MongoDB
app.post('/mongonewpost', function (req, res) {
//    console.log(req.body);
    mongoposts.create(req.body, function (err, results) {
        if (err) {
            console.log('db error in POST: ' + err);
        } else {
//            res.send('post created');
            var url = '/mongoposts/' + results._id;
            res.redirect(url);
        }
    });

});

// Bring up edit form for a specific post
app.get('/mongopost/:id/edit', function (req, res) {

    var reqid = req.params.id;

    mongoposts.findById(reqid).exec(function (err, result) {
        res.render('mongopostedit', {
            result: result,
            reqid: reqid
        });
    });

});

// PUT
app.put('/mongoposts/:id', function (req, res) {
    console.log('>>>>>>>>>>>>> INSIDE app.put <<<<<<<<<<');
    console.log(req.body);
//    res.status(404).send('updated post: ' + req.params.id);

    mongoposts.findById(req.params.id).exec(function (err, result) {
        if (err) {
            console.log('Error, cannot find post');
        } else if (!result) {
            console.log('No Post Found!');
        } else {
            // update post
            result.title = req.body.title;
            result.body = req.body.body;

            console.log('>>>>>>>>>>>> DEBUG <<<<<<<<<<<<<');
            console.log(result.title);
            console.log(result.body);
            console.log('>>>>>>>>>>>> DEBUG <<<<<<<<<<<<<');

            result.save(function (err) {
                console.log('?????????? ARE WE THERE YET ??????');

                if (err) {
                    console.log('database save error: ' + err);
                } else {
                    var url = 'http://opsvm3.turner.com:3000/mongoposts/' + req.params.id;
                    res.redirect(url);
                }
            });
        }
    });

});

// delete a post
app.delete('/mongodelete/:id', function (req, res) {
    console.log(req.params.id);
    mongoposts.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log('Post delete error');
        } else {
            res.redirect('/mongoposts');
        }
    });
});

// MONGO SECTION =================================================


// GET /posts/new, show form for creating new post
app.get('/posts/new', function (req, res) {
    res.send('HTML form for creating new post');
});

// POST /posts, create a new post
app.post('/posts', function (req, res) {
    res.send('posting new data to the server');
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
