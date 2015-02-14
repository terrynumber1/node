var prison = {
	names: 'Pat',
	who: function() {
		$.ajax({
			success: function() {
				console.log(this.names);
		    }
		});
	}
};

prison.who();