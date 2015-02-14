(function() {
	var private_variable = "private";
})();

// output error, undefined variable
// console.log(private_variable);

// passing parameters into a self executing anonymouse function
(function(name) {
	var talk = 'Hello ' + name;
	console.log(talk);
})('Jim');


(function($) {
	console.log($);
})(jQuery);