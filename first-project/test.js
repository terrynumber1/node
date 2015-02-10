var assert = require('assert');
var CountStream = require('./countstream');
var countStream = new CountStream('example');

var fs = require('fs');
var passed = 0;

// total event will be emitted when the stream is finished.
countStream.on('total', function(count) {
	assert.equal(count, 1);
	passed++;
});
