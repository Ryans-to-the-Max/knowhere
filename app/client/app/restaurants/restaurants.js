angular.module('travel.restaurants', [])

.controller('RestaurantsController', function ($scope, CurrentInfo, Restaurants, City) {
  var origin = CurrentInfo.origin.name;
  var destination = CurrentInfo.destination.name;
  $scope.restaurants = null;
  $scope.city = null;
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
