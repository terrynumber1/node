// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var checkType, constructObj, readObj, updateObj,
    destroyObj;
var loadSchema, checkShema, clearIsOnline;
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
}
// ---------------- END UTILITY METHODS -----------------

// ---------------- BEGIN PUBLIC METHODS ------------------
checkType = function () {
};

// use CONSTRUCT as our method name, CREATE is a Javascript reserve word
constructObj = function () {
};

readObj = function () {
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


