angular.module('travel.services', [])
.factory('City', function ($http) {
  var getCity = function(cityName){
    return $http({
      method: 'GET',
      url: '/api/dest',
      params: {name: cityName}
    })
    .then(function(resp){
      return resp.data;
    });
  };

  return {
    getCity: getCity
  };
})
.factory('DestInfo', function ($http) {
  var getDestVenues = function(cityName){
    return $http({
      method: 'GET',
      url: '/api/dest/venues',
      params: {name: cityName}
    })
    .then(function(resp){
      return resp.data;
    });
  };

  return {
    getDestVenues: getDestVenues
  };
})
.factory('CurrentInfo', function ($http) {
  var destination = {
    name: null,
    basicInfo: null,
    hotels: null,
    attractions: null,
    restaurants: null
  };
  var origin = {
    name: null,
    basicInfo: null,
    hotels: null,
    attractions: null,
    restaurants: null
  };
  return {
    destination: destination,
    origin: origin
  };
})
.factory('SessionStorage', function ($http, $location, $window) {
  var sessionExists = function () {
    return !!$window.sessionStorage.getItem('knowhere');
  };

  return {
    sessionExists: sessionExists
  };
});
