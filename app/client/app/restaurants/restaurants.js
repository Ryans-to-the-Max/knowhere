angular.module('travel.restaurants', [])

.controller('RestaurantsController', function ($scope, $window, CurrentInfo, Restaurants, City) {
  var origin = CurrentInfo.origin.name;
  var destination = $window.sessionStorage.getItem('knowhere') || CurrentInfo.destination.name;
  $scope.restaurants;
  $scope.city;
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
});
