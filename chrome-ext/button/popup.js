// some magic work related to the webpage and its interactivity
angular.module('app',[])
.controller('Ctrl', function($scope){
	
	$scope.items = [];

	var save = function() {
		chrome.runtime.sendMessage({ set: 1, 
														     notify: 1, 
														     data: $scope.items }, function(res) {
			if (!res.err) {
				console.log('yay save succeeded!');
			}
		});
	};

	$scope.addItemToList = function() {
		$scope.items.push({
			from: $scope.thing.from,
			to:   $scope.thing.to
		});
		$scope.thing = {};
		save();
	};

	$scope.removify = function(index) {
		var t = null;

		return {
			turnOn: function() {
				t = setTimeout(function() {
					$scope.items.splice(index, 1);
					save();
					$scope.$digest();
				}, 800);			
			},
			turnOff: function() {
				clearTimeout(t);
			}
		};
	};

	// let's get a local copy of the localStorage values
	chrome.runtime.sendMessage({get: 1, notify: 0}, function(res) {

		var bgsr = res.replacements || [];

		// also die if there isn't any elements
		if (bgsr.length == 0)
			return;

		$scope.items = bgsr;
		$scope.$digest();
	});	

});



