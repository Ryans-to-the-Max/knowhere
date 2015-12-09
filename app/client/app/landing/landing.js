angular.module('travel.landing', [])

.controller('LandingController', function ($scope, $location, CurrentInfo, City) {
  $scope.data = {};
  $scope.sendData = function() {
    CurrentInfo.origin.name = $scope.data.origin;
    CurrentInfo.destination.name = $scope.data.destination;
    $location.path('/attractions');
  };
});
