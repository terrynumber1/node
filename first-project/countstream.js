var Writable = require('stream').Writable;
var util = require('util');

util.inherits(CountStream, Writable);

// constructor
function CountStream(matchText, options) {
	Writable.call(this, options);
	count = 0;	// declaring GLOBAL count variable
	matcher = new RegExp(matchText, 'ig');	// declaring GLOBAL matcher variable
											// new Regular Expression object
}

// writing a method _write
CountStream.prototype._write = function(inputchunk, encoding, cb) {
	var matches = inputchunk.toString().match(this.matcher);
	if (matches) {
		this.count = this.count + matches.length;
	}

	cb();
};

// writing a method end
CountStream.prototype.end = function() {
	// emit inherit from EventEmitter
	this.emit('total', this.count);
}

module.exports = CountStream; // make CountStream class portable