angular.module('travel.itinerary', [])

.controller('ItineraryController', function ($scope, $window, $rootScope, CurrentInfo, Venues, City, Groups, Util) {
  var destination = $window.sessionStorage.getItem('knowhere') || CurrentInfo.destination.name;
  $scope.restaurants = [];
  $scope.attractions = [];
  $scope.hotels = [];
  $scope.city = null;
  $scope.inputData = {};
  $scope.fullItinerary = [];
  $scope.groups = [];


  ////////////////// GET ALL THE GROUPS OF A USER //////////////////////


  $scope.getGroups = function() {
    var query = {
      userInfo: $rootScope.currentUser
    };
    Groups.getGroups(query)
      .then(function(groupsInfo){
        $scope.groups = groupsInfo;
      });
  };
  $scope.getGroups();


  ////////////////// SELECTING A GROUP WILL REROUTE TO RESULTS PAGE //////////////////////


  $scope.selectGroup = function(groupInfo) {
    $rootScope.currentGroup = groupInfo;
    $window.sessionStorage.setItem('knowhere', Util.transToPermalink(groupInfo.destination));
    $state.go('itinerary');
  };


  ////////////////// FILTER FOR RESTAURANTS/ATTRACTIONS/HOTELS //////////////////////


  $scope.filterItinerary = function () {
    var restaurants = [],
        attractions = [],
        hotels = [];

    $scope.fullItinerary.forEach(function(venue) {
      if (venue.venue_type_id === 1) {
        hotels.push(venue);
      } else if (venue.venue_type_id === 2) {
        restaurants.push(venue);
      } else {
        attractions.push(venue);
      }
    });
    $scope.restaurants = restaurants;
    $scope.attractions = attractions;
    $scope.hotels = hotels; 
  };


  ////////////////// GET BASIC DESTINATION CITY INFO //////////////////////


  $scope.getCity = function () {
    City.getCity(destination)
      .then(function(cityInfo) {
        $scope.city = cityInfo;
        CurrentInfo.destination.basicInfo = cityInfo;
    })
      .catch(function(error){
        console.error(error);
      });
  };

  ////////////////// GET GROUP ITINERARY //////////////////////


  $scope.getItinerary = function() {
    var query = {
      userInfo : $rootScope.currentUser,
      groupInfo : $rootScope.currentGroup,
    };
    Venues.getItinerary(query)
      .then(function(itineraryData){
        $scope.itinerary = fullItineraryData;
        filterItinerary();
      });
  };

  $scope.getItinerary();


  ////////////////// ADD TO ITINERARY - ADMIN ONLY//////////////////////


  $scope.addDatestoItinerary = function(venueData) {
    venueData.userInfo = $rootScope.currentUser;
    venueData.groupInfo = $rootScope.currentGroup;
    venueData.fromDate = $scope.inputData.fromDate;
    venueData.toDate = $scope.inputData.toDate;
    Venues.addtoItinerary(venueData);
  };


});