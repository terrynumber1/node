var makePrison = function(prisoner) {
	return function() {
		return prisoner;
	};
};

var p1 = makePrison('jim');
var p2 = makePrison('flower');

console.log(p1());
console.log(p2());