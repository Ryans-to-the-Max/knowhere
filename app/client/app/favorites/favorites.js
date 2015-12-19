angular.module('travel.favorites', [])

.controller('FavoritesController', function ($scope, $window, $rootScope, $state, CurrentInfo, Venues, City, Groups, Util) {
  var destination = $rootScope.destinationPermalink || CurrentInfo.destination.name;
  $scope.filteredUserFavs = [];
  $scope.filteredGroupFavs = [];
  $scope.city = null;
  $scope.heading = null;
  $scope.favorites = [];
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
  // $scope.getGroups();


  ////////////////// SELECTING A GROUP WILL REROUTE TO RESULTS PAGE //////////////////////


  $scope.selectGroup = function(groupInfo) {
    Groups.selectGroup(groupInfo, $rootScope);
    $rootScope.destinationPermalink = groupInfo.destination;
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
    // not working with groups removed this code...
    // if (favorite.userInfo === $rootScope.currentUser) {
    //   console.log(favorite.venue);
    // } else {
    //   groupFavs.push(favorite);
    // }

    $scope.favorites.forEach(function(favorite) {
      if (favorite.venue.venue_type_id === filterType) {
        userFavs.push(favorite.venue);
      }
    });
    $scope.filteredGroupFavs = groupFavs;
    $scope.filteredUserFavs  = userFavs;
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

  $scope.fetchUserFavorites = function () {
    var userId = $rootScope.currentUser._id;
    Venues.getUserFavorites(userId)
    .then(function(favorites) {
      $scope.favorites = favorites;
      console.log('favorites', $scope.favorites);
      $scope.filterFavorites(1);
    });
  };

  $scope.fetchUserFavorites();

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
  $scope.fetchUserFavorites();

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
