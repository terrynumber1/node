var prison = (function(){
	var prisoner_name = 'Mike',
	jail_term = '20 seconds';

	return {
		prisoner: prisoner_name + ' ' + jail_term,
		duration: jail_term
	
	}

})();

console.log(prison.prisoner);
console.log(prison.prisoner_name);
console.log(prison.duration);