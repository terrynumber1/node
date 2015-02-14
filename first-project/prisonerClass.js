var staticClassVar = {
	sentence: 4,
	goof: 5
};

var Prisoner = function(name, id) {
	this.name = name;
	this.id = id;
};

Prisoner.prototype = staticClassVar;

var p1 = new Prisoner('jane', '1');

console.log(p1.name);
console.log(p1.sentence);

