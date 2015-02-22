/*
 * routes.js - module to provide routing
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var configRoutes;
var mongodb = require('mongodb');
var mongoServer = new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT);
var dbHandle = new mongodb.Db('spa', mongoServer, {safe: true});
var makeMongoId = mongodb.ObjectID;
var objTypeMap = { 'user':{} };
// ------------- END MODULE SCOPE VARIABLES ---------------

// ---------------- BEGIN PUBLIC METHODS ------------------
configRoutes = function ( app, server ) {
  app.get( '/', function ( request, response ) {
    response.redirect( '/spa.html' );
  });

  app.all( '/:obj_type/*?', function ( request, response, next ) {
    response.contentType( 'json' );

    if( objTypeMap[request.params.obj_type] ) {
        next();
    } else {
        response.send( {error_msg : request.params.obj_type + ' is not a valid object type'} );
    }

  });

  app.get( '/:obj_type/list', function ( request, response ) {

    dbHandle.collection(
        request.params.obj_type, function(outer_error, collection) {
            collection.find().toArray(
                function(inner_error, map_list) {
                    response.send(map_list);
                }
            );
        }
    );
//    response.send({ title: request.params.obj_type + ' list' });
  });

  app.post( '/:obj_type/create', function ( request, response ) {

    dbHandle.collection(
        request.params.obj_type, function(outer_error, collection) {
            var options_map = {safe: true};
            var obj_map = request.body;

            collection.insert(
                obj_map, options_map, function(inner_error, result_map) {
                    response.send( result_map );
                }
            );
        }
    );
//    response.send({ title: request.params.obj_type + ' created' });
  });

  app.get( '/:obj_type/read/:id([0-9]+)',
    function ( request, response ) {
        var find_map = { _id: makeMongoId(request.params.id) };

        dbHandle.collection(
            request.params.obj_type, function(outer_error, collection) {
                collection.findOne(
                  find_map, function(inner_error, result_map) {
                        response.send( result_map );
                    }
                );
            }
        );
//      response.send({ title: request.params.obj_type + ' with id ' + request.params.id + ' found' });
    }
  );

  app.post( '/:obj_type/update/:id([0-9]+)',
    function ( request, response ) {
        var find_map = {_id: makeMongoId(request.params.id) };
        var obj_map = request.body;

        dbHandle.collection(
            request.params.obj_type, function(outer_error, collection) {
                var sort_order = [];
                var options_map = { 'new': true, upsert: false, safe:true };

                collection.findAndModify(
                    find_map, sort_order, obj_map, options_map,
                    function(inner_error, updated_map) {
                        response.send( updated_map );
                    }
                );
            }
        );
//      response.send({ title: request.params.obj_type + ' with id ' + request.params.id + ' updated' });
    }
  );

  app.get( '/:obj_type/delete/:id([0-9]+)',
    function ( request, response ) {
        var find_map = {_id: makeMongoId(request.params.id) };

        dbHandle.collection(
            request.params.obj_type, function(outer_error, collection) {
                var options_map = {safe: true, single: true};

                collection.remove(
                    find_map, options_map, function(inner_error, delete_count) {
                        response.send({delete_count: delete_count});
                    }
                );
            }
        );
//      response.send({ title: request.params.obj_type + ' with id ' + request.params.id + ' deleted' });
    }
  );
};

module.exports = { configRoutes : configRoutes };
// ----------------- END PUBLIC METHODS -------------------

// ------------- BEGIN MODULE INITIALIZATION --------------

dbHandle.open( function() {
    console.log('** Connected to MongoDB **');
} );

// -------------- END MODULE INITIALIZATION ---------------