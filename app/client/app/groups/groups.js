angular.module('travel.groups', [])

.controller('GroupsController', function ($scope, $window, $rootScope, $state, Groups) {
	$scope.newGroupInput = null; 
	$scope.groups = [];
	$scope.newParticipantEmail = null;
	var cleanInput = function (string) {
    return string.trim().replace(/\s+/g, '-').toLowerCase();
  };


  ////////////////// GET LIST OF ALL GROUPS A USER BELONGS TO //////////////////////


	$scope.getGroups = function() {
    var query = {
      userInfo: $rootScope.currentUser
    };
    Groups.getGroups(query)
      .then(function(groupsInfo){
        $scope.groups = groupsInfo;
      })
  };
  $scope.getGroups();


  ////////////////// CREATE A NEW GROUP //////////////////////


  $scope.createGroup = function() {
  	var data = {
  		groupName: $scope.newGroupInput,
  		userInfo: $rootScope.currentUser
  	};
  	Groups.createGroup(data);
  	$rootScope.currentGroup = $scope.newGroupInput;
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
  	$rootscope.currentGroup = groupInfo;
  	$rootscope.destinationPermalink = cleanInput(groupInfo.destination);
  	var dest = $rootscope.destinationPermalink;
  	$window.sessionStorage.setItem('knowhere', dest);
  	$state.go('results')
  };
});