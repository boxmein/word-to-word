
// if requested, let's send them our replacement data
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {

		console.log('Received message from somewhere');
		console.log(request, sender);

		var r = localStorage.replacements;
		try {

			if (!r) 
				r = '[]';

			r = JSON.parse(r); 

			// get the localStorage data
			if (request.get == 1) {
				console.log('woo! someone wants our data! let\'s give it to them');
				console.log(r);

				sendResponse({
					replacements: r
				});
			}

			// set the localStorage data
			else if (request.set == 1) {
				console.log('woo! got new data! setting it as my own');

				localStorage.replacements = JSON.stringify(request.data);
				sendResponse({err: null});
			}
		}
		catch (err) {
			console.log(err.stack);
			sendResponse({err: err.stack});
		}
	});