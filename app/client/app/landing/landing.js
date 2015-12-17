angular.module('travel.landing', [])

.controller('LandingController', function ($scope, $window, $state, $rootScope, CurrentInfo, City, Groups, Util) {
  var data;
  $scope.data = { };

  $scope.sendData = function() {
    $window.sessionStorage.setItem('knowhere', Util.transToPermalink($scope.data.destination));
    $rootScope.currentUser = $rootScope.currentUser || "anonymous";
    $scope.data.group = $scope.data.group || "anonymous";

    Groups.createGroup({
      groupName: $scope.data.group,
      userInfo: $rootScope.currentUser,
      destination: $window.sessionStorage.getItem('knowhere')
    })
    .then(function (res) {
      if (!res) return;

      $scope.currentGroup = res.data;
    });

    $state.go('results');
  };
});
