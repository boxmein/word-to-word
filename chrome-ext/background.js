
// if requested, let's send them our replacement data
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {

		if (sender.tab) 
			console.log('got a message from the content script');
		else
			console.log('got a message from the button');

		var r = localStorage.replacements;
		try {

			if (!r) 
				r = '[]';

			r = JSON.parse(r); 

			// if we should notify the content script of new changes
			if (request.notify) {
				chrome.runtime.sendMessage({
					update: 1, 
					replacements: request.data
				});
			}

			// respond with our persistently stored data
			if (request.get == 1) {
				sendResponse({
					replacements: r
				});
			}

			// set the persistently stored data to this new value.
			else if (request.set == 1) {
				localStorage.replacements = JSON.stringify(request.data);
				sendResponse({err: null});
			}
		}
		catch (err) {
			console.log(err.stack);
			sendResponse({err: err.stack});
		}
	});