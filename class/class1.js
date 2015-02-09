// http://book.mixu.net/node/ch6.html
// search Class pattern


// Constructor
function Class1(argument1) {
	this.argument1 = argument1;
}

// class methods
Class1.prototype.method1 = function(argument) {
	console.log('from my FIRST CLASS');
};

// export the class
module.exports = Class1;

// constructor call
// var object1 = new Class1();
// object1.method1();