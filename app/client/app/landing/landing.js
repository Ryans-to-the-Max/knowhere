angular.module('travel.landing', [])

.controller('LandingController', function ($scope, $window, $state, $rootScope, Groups, Util) {

  $scope.data = {};

  $scope.sendData = function() {
    if (!$rootScope || !$rootScope.currentUser || !$rootScope.currentUser._id) return;
    // $rootScope.currentUser = $rootScope.currentUser || "anonymous";

    $rootScope.destinationPermalink = Util.transToPermalink($scope.data.destination);
    $scope.data.group = $scope.data.group || "anonymous";

    Groups.createGroup({
      groupName: $scope.data.group,
      userInfo: $rootScope.currentUser._id,
      destination: $rootScope.destinationPermalink
    })
    .then(function (newGroup) {
      $rootScope.currentGroup = newGroup;
      $state.go('results');
    })
    .catch(function (err) {
      console.error(err);
    });
  };

});
