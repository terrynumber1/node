// Single Page Web Application
// page 50
var prison = (function() {
	var prisoner_name = 'Patrick',
	jail_term = 5;

	return {
		prisoner: function() {
			return prisoner_name + ' ' + jail_term;			
		},
		setName: function(n) {
			prisoner_name = n;
		},
		setSentence: function(term) {
			jail_term = term;
		}
	}
})();

console.log(prison.prisoner());
prison.setSentence(2);
console.log(prison.prisoner());
prison.setName("Eldridge");
console.log(prison.prisoner());
