angular.module('travel.restaurants', [])

.controller('RestaurantsController', function ($scope, CurrentInfo, Restaurants) {
  var origin = CurrentInfo.origin.name;
  var destination = CurrentInfo.destination.name;
  $scope.restaurants;
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
  $scope.getRestaurants();
});
