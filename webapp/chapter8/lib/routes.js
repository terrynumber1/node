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
//var mongodb = require('mongodb');
//var mongoServer = new mongodb.Server('localhost', mongodb.Connection.DEFAULT_PORT);
//var dbHandle = new mongodb.Db('spa', mongoServer, {safe: true});
//var objTypeMap = { 'user':{} };

//var fsHandle = require('fs');

//var checkSchema;
//var JSV = require('JSV').JSV;
//var validator = JSV.createEnvironment();

var configRoutes;
var makeMongoId = mongodb.ObjectID;
var crud = require('./crud');

// ------------- END MODULE SCOPE VARIABLES ---------------

// --------------- BEGIN UTILITY METHODS ------------------
// ---------------- END UTILITY METHODS -------------------

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
    var obj_type = request.params.obj_type;
    var obj_map = request.body;

    checkSchema(obj_type, obj_map, function(error_list) {
        if( error_list.length === 0 ) {
            dbHandle.collection(obj_type, function(outer_error, collection) {
                var options_map = {safe: true};

                collection.insert(
                  obj_map, options_map, function(inner_error, result_map) {
                        response.send(result_map);
                    }
                );
            });
        } else {
            response.send({
                error_msg: 'Input document not valid',
                error_list: error_list
            });
        }
    });

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
        var obj_type = request.params.obj_type;

        checkSchema( obj_type, obj_map, function( error_list ) {
            if( error_list.length === 0 ) { // if there is no error
                dbHandle.collection( obj_type, function(outer_error, collection) {
                        var sort_order = [];
                        var options_map = {'new': true, upsert: false, safe: true };
                        collection.findAndModify( find_map, sort_order, obj_map, options_map,
                            function(inner_errro, updated_map) {
                                response.send(updated_map);
                            }
                        );
                    }
                );
            } else {
                response.send({
                    error_msg: 'Input document not valid',
                    error_list: error_list
                });
            }
        });

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

// load schema into memory (objTypeMap)
(function() {
    var schema_name, schema_path;
    for(schema_name in objTypeMap) {
        if(objTypeMap.hasOwnProperty(schema_name) ) {
            schema_path = __dirname + '/' + schema_name + '.json';
            loadSchema(schema_name, schema_path);
        }
    }
})();

checkSchema = function(obj_type, obj_map, callback) {
    var schema_map = objTypeMap[ obj_type ];
    var report_map = validator.validate(obj_map, schema_map);
    callback( report_map.errors );
};

// -------------- END MODULE INITIALIZATION ---------------