var callMeLater = function() {
		console.log('This will keep going every 1 second');		
		return;
	};

(function schedule() {
	setTimeout(callMeLater, 1000);
	schedule();
})();