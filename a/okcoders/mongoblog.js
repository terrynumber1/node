var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var blogSchema = new Schema({
    id: String,
    title: String,
    body: String,
    author: String
});

//show collections
//var post = mongoose.model('database collection's name', Schema name);
var mongoposts = mongoose.model('posts', blogSchema);

module.exports = mongoposts;