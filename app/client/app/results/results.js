angular.module('travel.results', [])

.controller('ResultsController', function ($scope, $window, $rootScope, $state, CurrentInfo, Venues, City, Groups, Util) {
  $scope.venues = [];
  $scope.filteredVenues = [];
  $scope.city = null;
  $scope.heading = null;
  $scope.groups = [];


  ////////////////// GET ALL THE GROUPS OF A USER //////////////////////


  $scope.getGroups = function() {
    if (!$rootScope.currentUser || !$rootScope.currentUser._id) {
      return console.error("Cannot get groups. currentUser id not found!");
    }

    Groups.getGroups($rootScope.currentUser._id)
      .then(function(groupsInfo){
        $scope.groups = groupsInfo;
      });
  };


////////////////// SELECTING A GROUP WILL REROUTE TO RESULTS PAGE //////////////////////


  $scope.selectGroup = function(groupInfo) {
    Groups.selectGroup(groupInfo, $rootScope);
    $rootScope.destinationPermalink = groupInfo.destination;
    $state.go('results');
  };


  ////////////////// FILTER FOR RESTAURANTS/ATTRACTIONS/HOTELS //////////////////////


  $scope.filterVenues = function (filterType) {
    var venues = [];

    // set heading to appropriate value
    if (filterType === 1) {
      $scope.heading = 'Hotels';
    } else if (filterType === 2) {
      $scope.heading = 'Restaurants';
    } else if (filterType === 3) {
      $scope.heading = 'Attractions';
    }

    // populate venues with appropriate results
    $scope.venues.forEach(function(venue) {
      if (venue.venue_type_id === filterType) {
        venues.push(venue);
      }
    });
    $scope.filteredVenues = venues;
  };


  ////////////////// GET ALL VENUES BASED ON A DESTINATION CITY //////////////////////


  $scope.getVenueInformation = function (permalink) {
    permalink = permalink || $rootScope.destinationPermalink;
    if (!permalink) return;
    var query = {
      permalink: permalink
    };
    Venues.getVenues(query)
      .then(function(venueInfo) {
        if (!Array.isArray(venueInfo)) return;

        CurrentInfo.destination.venues = $scope.venues = venueInfo;
        $scope.filterVenues(1);
      })
      .catch(function(error){
        console.error(error);
      });
  };


  ////////////////// GET BASIC DESTINATION CITY INFO //////////////////////


  $scope.getCity = function (permalink) {
    permalink = permalink || $rootScope.destinationPermalink;
    if (!permalink) return;

    City.getCity(permalink)
      .then(function(cityInfo) {
        $scope.city = cityInfo;
        CurrentInfo.destination.basicInfo = cityInfo;
    })
      .catch(function(error){
        console.error(error);
      });
  };



  ////////////////// ADD TO FAVORITE LIST //////////////////////


  $scope.addToRatings = function(venueData) {
    var data = {
      userId : $rootScope.currentUser._id,
      groupId : $rootScope.currentGroup._id,
    };
    Venues.addRating(data);
  };

  /*
    !!!Not sure if this currently works!!!
    @param {obj} venue*
    *the object associated with the
    venue a user adds to their favorites...
  */

  // $scope.addVenueToUserFavorites = function (venue) {
  //   console.log($rootScope.currentUser._id);
  //   Venues.addToUserFavorites(venue, $rootScope.currentUser._id);
  // };


  ////////////////// INIT STATE //////////////////////


  $scope.getGroups();
  $scope.getCity($rootScope.destinationPermalink);
  $scope.getVenueInformation($rootScope.destinationPermalink);


});
