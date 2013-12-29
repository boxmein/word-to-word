// ==UserScript==
// @name Word To Word Replacer
// @description Replaces words predetermined by a wordlist
// @version 1.0
// @namespace http://boxmein.x10.mx/
// @include *
// @run-at document-end
// ==/UserScript==

// ctrl+f "var replacements"

// just a mash together of userscript stuff and cloud-to-butt stuff

// http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
  if ('function' == typeof source) {
    source = '(' + source + ')();'
  }
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}



contentEval(function() {

	
	var replacements = [
		// a list of objects with keys from and to, signifying what to find and what
		// to replace the string to
		// the from key can also be a Javascript compatible (perl compatible) regex
		// {"from": "cloud", "to": "butt" },
		{"from": /[aeiou]/ig, "to": "o"}
		// ...
	];

	// I stole this 101% from https://github.com/panicsteve/cloud-to-butt/blob/master/Source/content_script.js
	function walk(node) 
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
					walk(child);
					child = next;
				}
				break;

			case 3: // Text node
				handleText(node);
				break;
		}
	}

	function handleText(textNode) 
	{
		var v = textNode.nodeValue;

		for (var i=0, r=replacements; i<r.length; i++) {
			v = v.replace(r[i].from, r[i].to);
		}
		
		textNode.nodeValue = v;
	}

	// notifying any stronger would be disastrously annoying
	if (replacements.length == 0) 
		console.log('Configure replacements in script source code');

	walk(document.body, handleText);
});