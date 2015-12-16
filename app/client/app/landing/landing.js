angular.module('travel.landing', [])

.controller('LandingController', function ($scope, $window, $state, $rootScope, CurrentInfo, City, Groups) {
  var data;
  $scope.data = {};

  var cleanInput = function (string) {
    return string.trim().replace(/\s+/g, '-').toLowerCase();
  };

  $scope.sendData = function() {
    $rootScope.destinationPermalink = cleanInput($scope.data.destination);
    var dest = $rootScope.destinationPermalink;
    $window.sessionStorage.setItem('knowhere', dest);
    $rootScope.currentUser = $rootScope.currentUser || "anonymous";
    if ($scope.data.group === undefined) {
      data = {
        groupName: "anonymous",
        userInfo: $rootScope.currentUser,
        destination: $rootScope.destinationPermalink
      };
      Groups.createGroup(data);
      Groups.getGroups("anonymous")
      .then(function(groupsInfo){
        groupsInfo.forEach(function(group){
          if (group.title === "anonymous") {
            group.destination = $rootScope.destinationPermalink; 
            $rootScope.currentGroup = group;
          }
        });
      });
    } else {
      data = {
        groupName: $scope.data.group,
        userInfo: $rootScope.currentUser,
        destination: $rootScope.destinationPermalink
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
