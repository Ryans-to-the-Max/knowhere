angular.module('travel.itinerary', [])

.controller('ItineraryController', function ($scope, $window, $rootScope, $state, CurrentInfo, Venues, Groups, Util) {
  // var destination = $window.sessionStorage.getItem('knowhere') || CurrentInfo.destination.name;
  $scope.restaurants = [];
  $scope.attractions = [];
  $scope.hotels = [];
  $scope.city = null;
  $scope.inputData = {};
  $scope.fullItinerary = [];
  $scope.groups = [];
  $scope.heading = null;


  ////////////////// GET ALL THE GROUPS OF A USER //////////////////////


  $scope.getUserGroups = function() {
    var query = {
      userInfo: $rootScope.currentUser
    };
    Groups.getUserGroups(query)
      .then(function(groupsInfo){
        $scope.groups = groupsInfo;
      });
  };
  // $scope.getUserGroups();


  ////////////////// SELECTING A GROUP WILL REROUTE TO RESULTS PAGE //////////////////////


  $scope.selectGroup = function(groupInfo) {
    Groups.selectGroup(groupInfo, $rootScope);
    $state.go('itinerary');
  };


  ////////////////// FILTER FOR RESTAURANTS/ATTRACTIONS/HOTELS //////////////////////


  $scope.filterItinerary = function (filterType) {
    var venues = [];

    // set heading to appropriate value
    if (filterType === 1) {
      $scope.heading = 'Hotels';
    } else if (filterType === 2) {
      $scope.heading = 'Restaurants';
    } else if (filterType === 3) {
      $scope.heading = 'Attractions';
    }

    $scope.fullItinerary.forEach(function(venue) {
      if (venue.venue_type_id === filterType) {
        venues.push(rating.venue);
      }
    });
    $scope.filteredItinerary = venues;
  };


  ////////////////// GET GROUP ITINERARY //////////////////////


  $scope.getItinerary = function() {
    var userId = $rootScope.currentUser._id;
    var groupId = $rootScope.currentGroup._id;
    var query = {
      userId : userId,
      groupId : groupId
    };
    Venues.getItinerary(query)
      .then(function(itineraryData){
        $scope.itinerary = fullItineraryData;
        filterItinerary();
      });
  };

  // $scope.getItinerary();


  ////////////////// ADD TO ITINERARY - ADMIN ONLY//////////////////////


  $scope.addDatestoItinerary = function(venueData) {
    var userId = $rootScope.currentUser._id;
    var groupId = $rootScope.currentGroup._id;
    var fromDate = $scope.inputData.fromDate;
    var toDate = $scope.inputData.toDate;
    var data = {
      venue : venueData,
      userId : userId,
      groupId : groupId,
      fromDate : fromDate,
      toDate : toDate
    };
    Venues.addtoItinerary(data);
  };


});
