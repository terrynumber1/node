var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

// Connect to cloud database
//var username = "user1";
//var password = "password1";
//var address = ' @dbh42.mongolab.com:27427/nockmarket';
connect();

// Connect to mongo
function connect() {
    var url = 'mongodb://user1:password1@ds049651.mongolab.com:49651/taewon';
    console.log(url);
    mongoose.connect(url);
}

function disconnect() {
    mongoose.disconnect();
}