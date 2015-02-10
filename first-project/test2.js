var object1 = require('./myclass');
var module2 = require('./module-2');

console.log(object1.method() );
console.log( module2.method() );
console.log( module2.method2() );

// require.resolve shows full path name to the file
console.log( require.resolve('./myclass') );

console.log('__dirname: ' + __dirname);
console.log('__filename: ' + __filename);

var name = 'alex';
var user = {name: 'alex'};

// console.log('Hello');
console.log('Hello %s', name);
console.log('Hello:', user);
// console.log('Hello:', user);

// console.error('Error, bad user:', user);