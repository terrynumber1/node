// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var checkType, constructObj, readObj, updateObj,
    destroyObj;
var loadSchema, checkSchema, clearIsOnline;
var mongodb = require('mongodb');
var fsHandle = require('fs');
var JSV = require('JSV').JSV;

var mongoServer = new mongodb.Server('localhost',
mongodb.Connection.DEFAULT_PORT);
var dbHandle = new mongodb.Db('spa', mongoServer, {safe:true});
var validator = JSV.createEnvironment();
var objTypeMap = {'user': {}};

// ------------ END MODULE SCOPE VARIABLES --------------

// ---------------- BEGIN UTILITY METHODS -----------------
loadSchema = function( schema_name, schema_path ) {
    fsHandle.readFile( schema_path, 'utf8', function( err, data ) {
        // convert JSON into javascript object
        objTypeMap[schema_name] = JSON.parse( data );
    } );
};

checkSchema = function (obj_type, obj_map, callback) {
    var schema_map = objTypeMap[ obj_type ];
    var report_map = validator.validate(obj_map, schema_map);
    callback(report_map.errors);
};

// make sure all user is mark as offline when Mongo server starts
clearIsOnline = function() {
    updateObj( 'user', {is_online: true}, {is_online: false},
        function( response_map ) {
            console.log('All users are offline', response_map);
        });
};
// ---------------- END UTILITY METHODS -----------------

// ---------------- BEGIN PUBLIC METHODS ------------------
checkType = function ( obj_type ) {
    if( !objTypeMap[obj_type] ) {
        return ({error_msg: 'Object type ' + obj_type + ' is not supported'});
    }
    return null; // obj_type exist, exit the function
};

// use CONSTRUCT as our method name, CREATE is a Javascript reserve word
constructObj = function ( obj_type, obj_map, callback ) {
    var type_check_map = checkType( obj_type );
    if( type_check_map ) {
        callback(type_check_map);
        return;
    }

    checkSchema( obj_type, obj_map, function( error_list ) {
            if( error_list.length === 0 ) {
                dbHandle.collection( obj_type, function( outer_error, collection) {
                    var options_map = { safe: true };

                    collection.insert( obj_map, options_map, function( inner_error, result_map ) {
                            callback( result_map );
                        }

                    );
                } );
            } else {
                callback({
                    error_msg: 'Input document not valid',
                    error_list: error_list
                });
            }
        }
    );
};

readObj = function( obj_type, find_map, fields_map, callback ) {
  var type_check_map = checkType( obj_type );

  if( type_check_map ) {
      callback(type_check_map);
      return;
  }

  dbHandle.collection( obj_type, function( outer_error, collection ) {
      collection.find(find_map, fields_map).toArray( function( inner_error, map_list ) {
        callback( map_list );
      } );
  } );

};

updateObj = function () {
};

destroyObj = function() {

};

// share this file with the rest of the folder
module.exports = {
    makeMongoId: null,
    checkType: checkType,
    constructObj: constructObj,
    readObj: readObj,
    updateObj: updateObj,
    destroyObj: destroyObj
};

// ---------------- END PUBLIC METHODS ------------------

// ------------- BEGIN MODULE INITIALIZATION --------------
console.log(' CRUD module loaded');
// ------------- END MODULE INITIALIZATION --------------


