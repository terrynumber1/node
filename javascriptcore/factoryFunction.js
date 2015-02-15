var proto = {
	sentence: 2,
	probation: 1
};

// this is a FACTORY FUNCTION (a constructor)
var makePrisoner = function(name, id) {
	var prisoner = Object.create(proto);
	prisoner.name = name;
	prisoner.id = id;

	return prisoner;
};

var p1 = new makePrisoner("matt", "1");
var p2 = new makePrisoner('yousef', '2');

console.log(p1.name);
console.log(p2.name);

