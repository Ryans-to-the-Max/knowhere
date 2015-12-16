angular.module('travel.landing', [])

.controller('LandingController', function ($scope, $window, $state, $rootScope, CurrentInfo, City, Groups, Util) {
  var data;
  $scope.data = {};

  $scope.sendData = function() {
    $window.sessionStorage.setItem('knowhere', Util.transToPermalink($scope.data.destination));
    $rootScope.currentUser = $rootScope.currentUser || "anonymous";

    if ($scope.data.group === undefined) {
      data = {
        groupName: "anonymous",
        userInfo: $rootScope.currentUser,
        destination: $window.sessionStorage.getItem('knowhere')
      };
      Groups.createGroup(data);
      Groups.getGroups("anonymous")
      .then(function(groupsInfo){
        groupsInfo.forEach(function(group){
          if (group.title === "anonymous") {
            group.destination = $window.sessionStorage.getItem('knowhere'); 
            $rootScope.currentGroup = group;
          }
        });
      });
    } else {
      data = {
        groupName: $scope.data.group,
        userInfo: $rootScope.currentUser,
        destination: $window.sessionStorage.getItem('knowhere')
      };
      Groups.createGroup(data);
      Groups.getGroups($rootScope.currentUser)
        .then(function(groupsInfo){
          groupsInfo.forEach(function(group){
            if (group.title === $scope.data.group) {
              $rootScope.currentGroup = group;
            }
          });
        });
    }

    $state.go('results');
  };
});
