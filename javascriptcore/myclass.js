function MyClass( ) {}

MyClass.prototype = {
	method: function() { 
		return 'Hello'; 
	}
};

var object = new MyClass();
module.exports = object;


