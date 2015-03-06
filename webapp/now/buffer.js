// a string
var str = 'Hello';

var buffer = new Buffer(str, 'utf-8');
console.log(buffer);

console.log(buffer.toString());

