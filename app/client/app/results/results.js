angular.module('travel.results', [])

.controller('ResultsController', function ($scope, $window, CurrentInfo, Hotels, Attractions, Restaurants, City) {
  var origin = CurrentInfo.origin.name;
  var destination = $window.sessionStorage.getItem('knowhere') || CurrentInfo.destination.name;
  $scope.results = null;
  $scope.city = null;
  $scope.heading = null;
  $scope.getHotels = function() {
    Hotels.getHotels(destination)
      .then(function(hotelsInfo) {
        $scope.heading = 'Hotels';
        $scope.results = hotelsInfo;
        CurrentInfo.destination.hotels = hotelsInfo;
        console.log('hotels', $scope.results);
    })
      .catch(function(error){
        console.error(error);
      });
  };
  $scope.getAttractions = function() {
    Attractions.getAttractions(destination)
      .then(function(attractionsInfo) {
        $scope.heading = 'Attractions';
        $scope.results = attractionsInfo;
        CurrentInfo.destination.attractions = attractionsInfo;
        console.log('attractions', $scope.results);
    })
      .catch(function(error){
        console.error(error);
      });
  };
  $scope.getRestaurants = function() {
    Restaurants.getRestaurants(destination)
      .then(function(restaurantsInfo) {
        $scope.heading = 'Restaurants';
        $scope.results = restaurantsInfo;
        CurrentInfo.destination.restaurants = restaurantsInfo;
        console.log('restaurants', $scope.results);
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
  $scope.getHotels();
});
