angular.module('travel.services', [])


////////////////// CITY //////////////////////


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


////////////////// RESTAURANTS //////////////////////


.factory('Restaurants', function ($http) {3


  ////////////////// PLACES TO EXPLORE //////////////////////


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


  ////////////////// FAVORITES - PERSONAL AND GROUP //////////////////////


  var getFavRestaurants = function(data){
    return $http({
      method: 'GET',
      url: '/api/fav/rests',
      params: {data: data}
    })
    .then(function(resp){
      return resp.data;
    });
  };
  var rateRestaurant = function(data) {
    return $http({
      method: 'POST',
      url: '/api/fav/rests',
      data: data
    })   
  };


  ////////////////// GROUP FAVORITES - ADMIN ONLY //////////////////////


  var addtoItinerary = function(data) {
    return $http({
      method: 'POST',
      url: '/api/itin',
      data: data
    })   
  };


  ////////////////// ITINERARY //////////////////////


  var getItinerary = function(data){
    return $http({
      method: 'GET',
      url: '/api/itin',
      params: {data: data}
    })
    .then(function(resp){
      return resp.data;
    });
  };
  return {
    getRestaurants: getRestaurants,
    rateRestaurant: rateRestaurant,
    getFavRestaurants: getFavRestaurants,
    getItinerary: getItinerary,
    addtoItinerary: addtoItinerary
  };

})


////////////////// ATTRACTIONS //////////////////////


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


////////////////// HOTELS //////////////////////


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


////////////////// TRANSFACTORY STORAGE //////////////////////


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


////////////////// SESSION STORAGE //////////////////////


.factory('SessionStorage', function ($http, $location, $window) {
  var sessionExists = function () {
    return !!$window.sessionStorage.getItem('knowhere');
  };

  return {
    sessionExists: sessionExists
  };
});
