angular.module('travel.favorites', [])

.controller('FavoritesController', function ($scope, $window, $rootScope, CurrentInfo, Venues, City, Groups) {
  var destination = $window.sessionStorage.getItem('knowhere') || CurrentInfo.destination.name;
  $scope.filteredUserFavs = [];
  $scope.filteredGroupFavs = [];
  $scope.city = null;
  $scope.heading = null;
  $scope.favs = {}; 
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
    $rootScope.destinationPermalink = cleanInput(groupInfo.destination);
    var dest = $rootScope.destinationPermalink;
    $window.sessionStorage.setItem('knowhere', dest);
    $state.go('favorites');
  };


  ////////////////// FILTER FOR RESTAURANTS/ATTRACTIONS/HOTELS //////////////////////


  $scope.filterFavorites = function (filterType) {
    var groupFavs = [];
    var userFavs = [];

    // set heading to appropriate value
    if (filterType === 1) {
      $scope.heading = 'Hotels';
    } else if (filterType === 2) {
      $scope.heading = 'Restaurants';
    } else if (filterType === 3) {
      $scope.heading = 'Attractions';
    }

    // populate venues with appropriate results
    $scope.favs.forEach(function(venue) {
      if (venue.venue_type_id === filterType) {
        if (venue.userInfo === $rootScope.currentUser) {
          userFavs.push(venue);
        } else {
          groupFavs.push(venue);
        }
      }
    });
    $scope.filteredGroupFavs = groupFavs;
    $scope.filteredUserFavs = userFavs;
  };


  ////////////////// GET ALL FAVORITES OF THE GROUP //////////////////////


  $scope.getFavs = function() {
    var query = {
      userInfo : $rootScope.currentUser,
      groupInfo : $rootScope.currentGroup,
    };
    Venues.getFavs(query)
      .then(function(venuesInfo){
        $scope.faves = venuesInfo;
        $scope.filterFavorites(1);
      });
  };
  $scope.getFavs();

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
  $scope.getCity();


  ////////////////// USER ADD RATING //////////////////////


  $scope.addRating = function(venueData, rating) {
    venueData.userInfo = $rootScope.currentUser;
    venueData.groupInfo = $rootScope.currentGroup;
    venueData.rating = rating;
    Venues.rateVenue(venueData);
  };


  ////////////////// ADMIN ONLY //////////////////////


  $scope.addtoItinerary = function(venueData) {
    venueData.userInfo = $rootScope.currentUser;
    venueData.groupInfo = $rootScope.currentGroup;
    venueData.fromDate = null;
    venueData.toDate = null;
    Venues.addtoItinerary(venueData);
  };
})


////////////////// DYNAMIC STAR RATING //////////////////////


.directive('starRating', function () {
  var restrict = 'A';
  var template = '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>';
  var scope = {
    ratingValue: '=',
    max: '=',
    onRatingSelected: '&'
  };
  var link = function (scope, elem, attrs) {
    var updateStars = function () {
      scope.stars = [];
      for (var i = 0; i < scope.max; i++) {
        scope.stars.push({
          filled: i < scope.ratingValue
        });
      }
    };
    scope.toggle = function (index) {
      scope.ratingValue = index + 1;
      scope.onRatingSelected({
        rating: index + 1
      });
    };
    scope.$watch('ratingValue', function (oldVal, newVal) {
      if (newVal) {
        updateStars();
      }
    });
  };
  return {
    restrict: restrict,
    template: template,
    scope: scope,
    link: link
  };
});
