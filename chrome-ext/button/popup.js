// some magic work related to the webpage and its interactivity
$("#form").hide();
$('#add').click(function() { $('#form').fadeToggle('fast') });
$('#hide').click(function() { $("#form").fadeOut('fast') });


var bgsr, i;
// let's get a local copy of the localStorage values
chrome.runtime.sendMessage({get: 1}, function(res) {

	bgsr = res.replacements || [];
	console.log('.getBackgroundPage().localStorage.replacements: ');
	console.log(bgsr);

	// also die if there isn't any elements
	if (bgsr.length == 0)
		return;

	// go over the array and add all existing ones
	for (i=0; i<bgsr.length; i++) {
		if (!(bgsr[i] && bgsr[i].from && bgsr[i].to))
			continue;
		
		// bgsr[i].from = sanitize(bgsr[i].from);
		// bgsr[i].to = sanitize(bgsr[i].to);
		var $el = $('<div class="line" data-array-index="'+i+'">'+ bgsr[i].from + 
			' &rarr; ' + bgsr[i].to + '</div>');
	
		$el.click(function(evt) {
			var index = Number($(this).data('array-index'));

			if (!isNaN(index)) {

				bgsr.splice(index, 1);
				$(this).remove();

				console.log('Removed index ' + index);
				console.log(this);
			}
		});

		$('#list').append($el);
	}
});

function save () {
	console.log('Updating background page localStorage with data:');
	console.log(bgsr);

	chrome.runtime.sendMessage({set: 1, data: bgsr}, function(res) {
		if (!res.err) {
			console.log('No error received - successfully saved!');
			setTimeout(save, 30000);
		}
	});
}

// okay when they've given us a new value
$('#form').submit(function(evt) {

	evt.preventDefault();
	var from = $('#from').val(), to = $('#to').val();

	// then just bluntly push it onto our array
	bgsr.push({
		from: from, 
		to: to
	});
	var $el = $('<div title="Remove" class="line" data-array-index="'+(bgsr.length-1)+'">'+ from + ' &rarr; ' + to + '</div>');
	
	$el.click(function(evt) {
		var index = Number($(this).data('array-index'));

		if (!isNaN(index)) {
			
			bgsr.splice(index, 1);
			$(this).remove();

			console.log('Removed index ' + index);
			console.log(this);
		}
	});

	// and our display
	$("#list").append($el);
	console.log('Association saved: ' + from + ' -> ' + to);

	// saving it to background page state
	save();
});

