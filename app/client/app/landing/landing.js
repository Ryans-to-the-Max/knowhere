angular.module('travel.landing', [])

.controller('LandingController', function ($scope, $location, CurrentInfo, City) {
  $scope.data = {};
  $scope.sendData = function() {
    CurrentInfo.origin.name = cleanInput($scope.data.origin);
    CurrentInfo.destination.name = cleanInput($scope.data.destination);
    $location.path('/attractions');
  };
});

var removeSpace = function(string) {
	var result = string;
	var arrayofString = string.split("");
	if (arrayofString[arrayofString.length - 1] === " ") {
		arrayofString.pop();
		result = removeSpace(arrayofString.join(""));
		return result;
	} else {
		return result;
	}; 
};

var cleanInput = function(string) {
	return removeSpace(string).replace(/\s/g, '-').toLowerCase();
};
