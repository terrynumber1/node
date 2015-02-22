/**
 * Created by cnnicentral on 2/17/2015.
 */

//var r1 = require('./routes.js');

var configRoutes = function(appExpress) {
// begin routes configurations
    appExpress.get('/', function (request, response) { // GET HTTP method
        response.redirect('spa.html');
    });

    appExpress.get('/test', function (request, response) {
        response.send('this is a test page');
    });

    appExpress.all('/:obj_type/*?', function (request, response, next) {
        response.contentType('json');
        next();
    });

// list user
    appExpress.get('/:obj_type/list', function (request, response) {
//    response.contentType('json');
        response.send({title: request.params.obj_type + ' list'});
    });

// creating user
    appExpress.post('/:obj_type/create', function (request, response) {
//    response.contentType('json');
        response.send({title: request.params.obj_type + ' created'});
    });

// read user
    appExpress.get('/:obj_type/read/:id([0-9]+)', function (request, response) {
//    response.contentType('json');
        response.send({
            // request.params[id]
            title: request.params.obj_type + ' with id ' + request.params.id + ' found'
        });
    });

// update user
    appExpress.post('/:obj_type/update/:id([0-9]+)', function (request, response) {
//    response.contentType('json');
        response.send({
            title: request.params.obj_type + ' user with id ' + request.params.id + ' updated'
        });
    });

// delete user
    appExpress.get('/:obj_type/delete/:id([0-9]+)', function (request, response) {
//    response.contentType('json');
        response.send({
            title: request.params.obj_type + ' user with id ' + request.params.id + ' deleted'
        });
    });
};
// end routes configurations

module.exports = {configRoutes: configRoutes}; // exporting an object
