var fs = require('fs');

// write
fs.writeFileSync('test.txt', 'this is from fs');

// read
console.log(fs.readFileSync('test.txt') ); // log buffer data
console.log(fs.readFileSync('test.txt').toString() ); // log string data

fs.writeFileSync('test.txt', 'writing somemore stuff to test');

console.log(fs.readFileSync('test.txt').toString() );