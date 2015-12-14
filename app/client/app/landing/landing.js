angular.module('travel.landing', [])

.controller('LandingController', function ($scope, $window, $location, CurrentInfo, City) {
  $scope.data = {};

  var kebabCase = function (string) {
    return string.trim().replace(/\s+/g, '-').toLowerCase();
  };

  $scope.sendData = function() {
    CurrentInfo.origin.name = kebabCase($scope.data.origin);
    CurrentInfo.destination.name = kebabCase($scope.data.destination);
    $window.sessionStorage.setItem('knowhere', CurrentInfo.destination.name);
    $location.path('/attractions');
  };
});
