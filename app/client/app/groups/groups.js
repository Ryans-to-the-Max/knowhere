angular.module('travel.groups', [])

.controller('GroupsController', function ($scope, $window, $rootScope, $state, Groups, Util) {
  $scope.newGroupInput = null;
  $scope.newDestinationInput = null;
  $scope.groups = [];
  $scope.newParticipantEmail = null;


  ////////////////// ADD PARTICIPANT (THROUGH EMAIL?) //////////////////////


  $scope.addParticipant = function() {
    var data = {
      groupId: $rootScope.currentGroup._id,
      userId: $rootScope.currentUser._id,
      participantInfo: $scope.newParticipantEmail
    };
    Groups.addParticipant(data);
  };


  ////////////////// SELECTING A GROUP WILL REROUTE TO RESULTS PAGE //////////////////////


  $scope.selectGroup = function(groupInfo) {
    Groups.selectGroup(groupInfo, function () {$state.go('results');})();
  };


  ////////////////// SET INIT STATE //////////////////////

  //TODO: Uncomment below when have actual data
  // Groups.setUserGroups($scope);
  //TODO: Uncomment above when have actual data
  //TODO: Comment below when have actual data
  $scope.mockGroup = {
    _id : $rootScope.currentGroup._id,
    destination : $rootScope.destination,
    host : $rootScope.currentUser,
    members : [$rootScope.currentUser, $rootScope.currentUser],
    title : "Best Group Ever",
  };
  for (var i = 0; i < 5; i++) {
    $scope.groups.push($scope.mockGroup);
  };
  console.log($scope.mockGroup);
  //TODO: Comment above when have actual data
});
