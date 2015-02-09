var fs = require('fs');

var callback = function(error, data) {
	console.log(data);
	// console.log(__dirname); print current directory path in the console
};

fs.readFile('./password.txt', 'utf8', callback);