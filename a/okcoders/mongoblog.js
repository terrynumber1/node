var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var blogSchema = new Schema({
//    id: { type:String, default: 'id default value' },
    id: { type:String, default: '' },
    title: { type:String, default: '' },
    body: { type:String, default: '' },
    author: { type:String, default: '' }
});

//show collections
//var post = mongoose.model('database collection's name', Schema name);
var mongoposts = mongoose.model('posts', blogSchema);

module.exports = mongoposts;