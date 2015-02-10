process.stdin.resume();
process.stdin.setEncoding('utf8');

var callback = function(text) {
	process.stdout.write(text.toUpperCase() );
}

process.stdin.on('data', callback);