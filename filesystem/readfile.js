// on page 39

var fs = require('fs');

var callback = function(error, fd) {
	if (error) throw error;

	var readBuffer = new Buffer(1024),
	bufferOffset = 0,
	bufferLength = readBuffer.length,
	filePosition = 100;

	var callback2 = function(error, readBytes) {
		if (error) throw error;
		console.log('just read ' + readBytes + ' bytes');

		if (readBytes > 0)
			console.log( readBuffer.slice(0, readBytes) );

	};

	fs.read(fd, readBuffer, bufferOffset, bufferLength, filePosition, callback2);
};

 fs.open('/var/log/syslog', 'r', callback);