// This is a running forever function that prints 0-9 to the console.

(function schedule() {

	var callbackf = function() {

		for(i=0;i<10;i++) {
			console.log(i);
		}

		// console.log('dddd');
		schedule();
	};

	setTimeout(callbackf, 1000);
})();