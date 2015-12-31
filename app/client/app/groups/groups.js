angular.module('travel.groups', [])

.controller('GroupsController', function ($scope, $window, $rootScope, $state, Groups, Util) {
  $scope.newGroupInput = null;
  $scope.newDestinationInput = null;
  $scope.groups = [];
  $scope.newParticipantEmail = null;
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;


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


  $scope.selectGroup = function (groupInfo) {
    Groups.selectGroup(groupInfo, function () {
      $state.go('results');
    });
  };


  ////////////////// SET INIT STATE //////////////////////


  Groups.setUserGroups($scope);
});
