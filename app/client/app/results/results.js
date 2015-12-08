angular.module('travel.results', [])

.controller('ResultsController', function ($scope, CurrentInfo, City) {
  var origin = CurrentInfo.origin.name;
  var destination = CurrentInfo.destination.name;
  $scope.city;
  $scope.getResults = function() {  
    City.getCity(destination)
      .then(function(cityInfo) {
        $scope.city = cityInfo;
        CurrentInfo.destination.basicInfo = cityInfo;
    })
      .catch(function(error){
        console.error(error);
      });
  };
  $scope.getResults();
});
