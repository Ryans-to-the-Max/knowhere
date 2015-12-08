angular.module('travel.attractions', [])

.controller('AttractionsController', function ($scope, CurrentInfo, Attractions) {
  var origin = CurrentInfo.origin.name;
  var destination = CurrentInfo.destination.name;
  $scope.attractions;
  $scope.getAttractions = function() {  
    Attractions.getAttractions(destination)
      .then(function(attractionsInfo) {
        $scope.attractions = attractionsInfo;
        CurrentInfo.destination.attractions = attractionsInfo;
    })
      .catch(function(error){
        console.error(error);
      });
  };
  $scope.getAttractions();
});
