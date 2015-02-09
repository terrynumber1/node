var fs = require('fs');

var callback = function(error, stats) {
	if (error) {
		console.log(error.message);
		return;
	}

	console.log(stats);	
};

// keep executing the code, don't have to wait for this line to finish executing.
fs.stat('./password.txt', callback);