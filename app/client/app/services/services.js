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


////////////////// VENUES //////////////////////


.factory('Venues', function ($http) {


  ////////////////// PLACES TO EXPLORE //////////////////////


  var getVenues = function(city_permalink){
    return $http({
      method: 'GET',
      url: '/api/dest/venues',
      params: {name: city_permalink}
    })
    .then(function(resp){
      return resp.data;
    });
  };


  ////////////////// FAVORITES //////////////////////


  var getFavs = function(data){
    return $http({
      method: 'GET',
      url: '/api/dest/venues/favs',
      params: {data: data}
    })
    .then(function(resp){
      return resp.data;
    });
  };
  var rateVenue = function(data) {
    return $http({
      method: 'POST',
      url: '/api/dest/venues/favs',
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
    getVenues: getVenues,
    rateVenue: rateVenue,
    getFavs: getFavs,
    getItinerary: getItinerary,
    addtoItinerary: addtoItinerary
  };

})


////////////////// TRANSFACTORY STORAGE //////////////////////


.factory('CurrentInfo', function ($http) {
  var destination = {
    name: null,
    basicInfo: null,
    venues: null 
  };
  return {
    destination: destination
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
