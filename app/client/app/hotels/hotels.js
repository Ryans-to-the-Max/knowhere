angular.module('travel.hotels', [])

.controller('HotelsController', function ($scope, CurrentInfo, Hotels) {
  var origin = CurrentInfo.origin.name;
  var destination = CurrentInfo.destination.name;
  $scope.hotels;
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
  $scope.getHotels();
});
