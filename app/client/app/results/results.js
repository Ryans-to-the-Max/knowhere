angular.module('travel.results', [])

.controller('ResultsController', function ($scope, $window, CurrentInfo, DestInfo, City) {
  var origin = CurrentInfo.origin.name;
  var destination = $window.sessionStorage.getItem('knowhere') || CurrentInfo.destination.name;
  $scope.apiVenueData = null;
  $scope.venues = [];
  $scope.city = null;
  $scope.heading = null;

  /*
    @param {number} filterType [venue_type_id]
  */
  $scope.filterVenueInformation = function (filterType) {
    var venues = [];

    // set heading to appropriate value
    if (filterType === 1) {
      $scope.heading = 'Hotels';
    } else if (filterType === 2) {
      $scope.heading = 'Restaurants';
    } else if (filterType === 3) {
      $scope.heading = 'Attractions';
    }

    // populate venues with appropriate results
    $scope.apiVenueData.forEach(function(venue) {
      if (venue.venue_type_id === filterType) {
        venues.push(venue);
      }
    });
    $scope.venues = venues;
  };
  $scope.getVenueInformation = function () {
    DestInfo.getDestVenues(destination)
      .then(function(venueInfo) {
        $scope.apiVenueData = venueInfo;
        CurrentInfo.destination.venues = venueInfo;
        $scope.filterVenueInformation(1);
        console.log('destVenueInfo', $scope.apiVenueData);
    })
      .catch(function(error){
        console.error(error);
      });
  };
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
  $scope.getVenueInformation();
});
