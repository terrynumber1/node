// exercise 1, get the size of a file
// file name a.txt, print the size of that file in bytes @ page 40

var fs = require('fs');

var callback = function(error, data) {
	console.log(data.size + ' bytes');
};

fs.stat('./password.txt', callback);