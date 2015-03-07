var config = require('./config.json');

console.log(config.foo);

var a1 = { a: 1, b: 'string', c: true};

console.log(a1);

// convert Javascript object to JSON
var b1 = JSON.stringify(a1);
console.log(b1);

// convert JSON to Javascript object
var c1 = JSON.parse(b1);
console.log(c1);