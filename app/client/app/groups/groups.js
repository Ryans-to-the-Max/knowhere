angular.module('travel.groups', [])

.controller('GroupsController', function ($scope, $window, $rootScope, $state, Groups, Util) {
  $scope.newGroupInput = null; 
  $scope.groups = [];
  $scope.newParticipantEmail = null;
  $scope.destination = null;


  ////////////////// GET LIST OF ALL GROUPS A USER BELONGS TO //////////////////////


  $scope.getGroups = function() {
    if (!$rootScope.currentUser || !$rootScope.currentUser._id) return;

    Groups.getGroups($rootScope.currentUser._id)
        .then(function(groupsInfo){
          $scope.groups = groupsInfo;
        });
  };


  ////////////////// CREATE A NEW GROUP //////////////////////


  $scope.createGroup = function() {
    Groups.createGroup({
      groupName: $scope.newGroupInput,
      userInfo: $rootScope.currentUser,
      destination: Util.transToPermalink($scope.destination)
    })
    .then(function (res) {
      $rootScope.currentGroup = res.data;
    });
  };


  ////////////////// ADD PARTICIPANT (THROUGH EMAIL?) //////////////////////


  $scope.addParticipant = function() {
    var data = {
      groupName: $rootScope.currentGroup,
      userInfo: $rootScope.currentUser,
      participantInfo: $scope.newParticipantEmail
    };
    Groups.addParticipant(data);
  };


  ////////////////// SELECTING A GROUP WILL REROUTE TO RESULTS PAGE //////////////////////


  $scope.selectGroup = function(groupInfo) {
    $rootScope.currentGroup = groupInfo;
    $rootScope.destinationPermalink = Util.transToPermalink(groupInfo.destination);
    var dest = $rootScope.destinationPermalink;
    $window.sessionStorage.setItem('knowhere', dest);
    $state.go('results');
  };


  ////////////////// SET INIT STATE //////////////////////


  $scope.getGroups();


});
