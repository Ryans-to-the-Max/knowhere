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
.factory('Restaurants', function ($http) {
  var getRestaurants = function(cityName){
    return $http({
      method: 'GET',
      url: '/api/dest/rests',
      params: {name: cityName}
    })
    .then(function(resp){
      return resp.data;
    });
  };

  return {
    getRestaurants: getRestaurants
  };

})
.factory('Attractions', function ($http) {
  var getAttractions = function(cityName){
    return $http({
      method: 'GET',
      url: '/api/dest/places',
      params: {name: cityName}
    })
    .then(function(resp){
      return resp.data;
    });
  };

  return {
    getAttractions: getAttractions
  };

})
.factory('Hotels', function ($http) {
  var getHotels = function(cityName){
    return $http({
      method: 'GET',
      url: '/api/dest/hotels',
      params: {name: cityName}
    })
    .then(function(resp){
      return resp.data;
    });
  };

  return {
    getHotels: getHotels
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
