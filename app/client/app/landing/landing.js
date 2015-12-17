angular.module('travel.landing', [])

.controller('LandingController',
            function ($scope, $window, $state, $rootScope, Groups, Util) {
  $scope.data = {};

  $scope.sendData = function() {
    if (!$rootScope.currentUser || !$rootScope.currentUser._id) return;

    $window.sessionStorage.setItem('knowhere',
                                Util.transToPermalink($scope.data.destination));
    $rootScope.currentUser = $rootScope.currentUser || "anonymous";
    $scope.data.group = $scope.data.group || "anonymous";

    Groups.createGroup({
      groupName: $scope.data.group,
      userInfo: $rootScope.currentUser._id,
      destination: $window.sessionStorage.getItem('knowhere')
    })
    .then(function (newGroup) {
      $scope.currentGroup = newGroup;
      $state.go('results');
    })
    .catch(function (err) {
      console.error(err);
    });
  };
});
