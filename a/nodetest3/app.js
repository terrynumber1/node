var express = require('express');
var path = require('path');
var mongoose = require('mongoose');


var app = express();
app.set('port', process.env.PORT || 3000);

//app.use( require('body-parser')() );
var bodyParser = require('body-parser');
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: false }));


// View engine, Handlebars =================
// views/layouts/main.handlebars, default location where express looks for layouts
var handlebars = require('express-handlebars')
    .create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Static content folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect to amazeriffic data store in Mongo
mongoose.connect('mongodb://localhost/amazeriffic');

// This is our mongoose model for todos
var todoSchema = mongoose.Schema({
    description: String,
    tags: [String]
});

var todo = mongoose.model("todo", todoSchema);


// Routing, Express ===============
app.get('/', function(req, res){
    // tour1 is and array of objects, look at the bottom
    res.render('home', {tour1:tour1, title:'1title1'} );
});

app.get('/about', function (req, res) {
    // about.handlebars
    res.render('about');
});

app.get('/newsletter', function (req, res) {
    // newsletter.handlebars
    res.render('newsletter', {csrf: 'CSRF token goes here'});
});

app.post('/process', function (req, res) {
    console.log('Form (from querystring): ' + req.body._csrf);
    console.log('CSRF token (from hidden field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);
    // http://ubuntu14:3000/thank-you
    res.redirect(303, '/thank-you');
});

app.get('/todos.json', function (req, res) {
    todo.find({}, function (err, todo1) {

        if (err !== null) {
            console.log("ERROR: " + err);
            // get out of the function
            return;
        }

        res.json(todo1);
    });
});

app.post('/todos', function (req, res) {
    console.log(req.body);

    var newtodo = new todo({
        'description': req.body.description,
        'tags': req.body.tags
    });

    newtodo.save(function (err, result) {
        if (err !== null) {
            console.log(err);
            res.send("ERROR!");
        } else {
            todo.find({}, function (err, result) {
                if (err !== null) {
                    res.send("ERROR");
                }

                res.json(result);
            });
        }
    });

});


// custom 404 page
app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});
// custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});


// Run server ===============
app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});


// variables =================
var tour1 = [
    {name: 'tour1', price: 100},
    {name: 'tour2', price: 200}
];

