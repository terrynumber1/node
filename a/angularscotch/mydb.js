var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema({
    id: String,
    title: String,
    body: String,
    author: String
});

var mongoPost = mongoose.model('posts', postSchema);

module.exports = mongoPost;