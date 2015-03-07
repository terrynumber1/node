var EventEmitter = require('events').EventEmitter;
var emit1 = new EventEmitter();

// Subscribe
emit1.on('event1', function(arg1, arg2) {
    console.log('jon ', arg1, arg2);
});

// Emit
emit1.emit('event1', 'jdkfd', 'kdiik');