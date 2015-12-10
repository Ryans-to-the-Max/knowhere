angular.module('travel.hotels', [])

.controller('HotelsController', function ($scope, $window, CurrentInfo, Hotels, City) {
  var origin = CurrentInfo.origin.name;
  var destination = $window.sessionStorage.getItem('knowhere') || CurrentInfo.destination.name;
  $scope.hotels = null;
  $scope.city = null;
  $scope.getHotels = function() {
    Hotels.getHotels(destination)
      .then(function(hotelsInfo) {
        $scope.hotels = hotelsInfo;
        CurrentInfo.destination.hotels = hotelsInfo;
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
