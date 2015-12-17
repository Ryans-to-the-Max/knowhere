angular.module('travel.landing', [])

.controller('LandingController',
            function ($scope, $window, $state, $rootScope, Groups, Util) {
  $scope.data = { };

  $scope.sendData = function() {
    $window.sessionStorage.setItem('knowhere',
                                Util.transToPermalink($scope.data.destination));
    $rootScope.currentUser = $rootScope.currentUser || "anonymous";
    $scope.data.group = $scope.data.group || "anonymous";

    Groups.createGroup({
      groupName: $scope.data.group,
      userInfo: $rootScope.currentUser,
      destination: $window.sessionStorage.getItem('knowhere')
    })
    .then(function successCb (res) {
      $scope.currentGroup = res.data;
    }, function errCb (res) {
      return console.error(res);
    });

    $state.go('results');
  };
});
