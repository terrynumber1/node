// .addListener 

var fs = require('fs'); // get the fs

var readStream = fs.createReadStream('./password.txt');

readStream.addListener('data', function(data) {
	console.log(data);
});

readStream.addListener('end', function() {
	console.log('file ended');
});