angular.module('travel.restaurants', [])

.controller('RestaurantsController', function ($scope, $window, CurrentInfo, Restaurants, City) {
  var origin = CurrentInfo.origin.name;
  var destination = $window.sessionStorage.getItem('knowhere') || CurrentInfo.destination.name;
  $scope.restaurants = null;
  $scope.city = null;
  $scope.inputData = {}; 


  ////////////////// PLACES TO EXPLORE //////////////////////


  $scope.getRestaurants = function() {
    Restaurants.getRestaurants(destination)
      .then(function(restaurantsInfo) {
        $scope.restaurants = restaurantsInfo;
        CurrentInfo.destination.restaurants = restaurantsInfo;
    })
      .catch(function(error){
        console.error(error);
      });
  };
  $scope.getCity = function() {
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
  $scope.getRestaurants();
  $scope.addtoFavorites = function(data) {
    data.userInfo = $rootScope.currentUser;
    data.groupInfo = $rootScope.currentGroup;
    Restaurants.rateRestaurant(data);
  };


  ////////////////// PERSONAL FAVORITES //////////////////////


  $scope.getFavRestaurants = function() {
    var data = {
      userInfo : $rootScope.currentUser,
      groupInfo : $rootScope.currentGroup,
      venueType : restaurants
    };
    Restaurants.getFavRestaurants(data);
      .then(function(restaurantsInfo){})
  };


  ////////////////// GROUP FAVORITES //////////////////////



  $scope.getGroupFavRestaurants = function() {
    var data = {
      userInfo : $rootScope.currentUser,
      groupInfo : $rootScope.currentGroup,
      venueType : restaurants
    };
    Restaurants.getFavRestaurants(data);
      .then(function(restaurantsInfo){})
  };
  $scope.postRatings = function (rating, restaurant) {
    var data = {
      userInfo : $rootScope.currentUser,
      groupInfo : $rootScope.currentGroup,
      restaurant: restaurant,
      rating: rating
    };
    Restaurants.rateRestaurant(data);
  };


  ////////////////// GROUP FAVORITES/ITINERARY - ADMIN ONLY //////////////////////


  $scope.addtoItinerary = function(data) {
    data.userInfo = $rootScope.currentUser;
    data.groupInfo = $rootScope.currentGroup;
    data.fromDate = $scope.inputData.fromDate || null;
    data.toDate = $scope.inputData.toDate || null;
    Restaurants.addtoItinerary(data);
  };


  ////////////////// ITINERARY //////////////////////


  $scope.getItinerary = function() {
    var data = {
      userInfo : $rootScope.currentUser,
      groupInfo : $rootScope.currentGroup,
      venueType : restaurants
    };
    Restaurants.getItinerary(data);
      .then(function(restaurantsInfo){})
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
  }
  return {
    restrict: restrict,
    template: template,
    scope: scope,
    link: link
  }
});