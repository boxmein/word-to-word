

// I stole this 101% from https://github.com/panicsteve/cloud-to-butt/blob/master/Source/content_script.js
function walk(node, callback, pass) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child, callback, pass);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node, pass);
			break;
	}
}

function handleText(textNode, replacements) 
{
	var v = textNode.nodeValue;

	for (var i=0, r=replacements; i<r.length; i++) {
		v = v.replace(r[i].from, r[i].to);
	}
	
	textNode.nodeValue = v;
}

(function() {
	'use strict';

	var storedReplacements = null;

	chrome.runtime.sendMessage({get: 1}, function(response) {
		if (response.replacements) {
			storedReplacements = response.replacements;
			walk(document.body, handleText, storedReplacements);
		}
		else if (response.err) {
			console.error(response.err);
		}
	});

	chrome.runtime.onMessage.addListener(function(req, snd, respond) {
		console.log('holy shit i got a message', req, snd, respond);
		if (req.update == 1) {
			// gotta re-walk!
			storedReplacements = req.replacements;
			walk(document.body, handleText, req.replacements);
		}
	});

})();

