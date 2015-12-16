angular.module('travel.landing', [])

.controller('LandingController', function ($scope, $window, $state, $rootScope, CurrentInfo, City) {
  $scope.data = {};

  var cleanInput = function (string) {
    return string.trim().replace(/\s+/g, '-').toLowerCase();
  };

  $scope.sendData = function() {
    $rootscope.destinationPermalink = cleanInput($scope.data.destination);
    var dest = $rootscope.destinationPermalink;
    $window.sessionStorage.setItem('knowhere', dest);
    $rootScope.currentUser = $rootScope.currentUser || "anonymous";
    $state.go('results');
  };
});
