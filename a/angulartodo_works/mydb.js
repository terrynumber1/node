var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
    todotext: String
});

var mongoTodo = mongoose.model('todocollection1', todoSchema);

module.exports = mongoTodo;