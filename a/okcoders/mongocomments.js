var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
    body: String,
    author: String,
    postid: mongoose.Schema.Types.ObjectId
});

//show collections
//var post = mongoose.model('database collection's name', Schema name);
var mongocomments = mongoose.model('comments', commentSchema);

module.exports = mongocomments;