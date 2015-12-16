angular.module('travel.services', [])


////////////////// Groups //////////////////////


.factory('Groups', function ($http) {
  var getGroups = function(query){
    return $http({
      method: 'GET',
      url: '/api/groups',
      params: {userInfo: query}
    })
    .then(function(resp){
      return resp.data;
    });
  };
  var createGroup = function(data){
    return $http({
      method: 'POST',
      url: '/api/groups',
      data: data
    });   
  };
  var addParticipants = function(data) {
    return $http({
      method: 'POST',
      url: '/api/favs',
      data: data
    });   
  }
  return {
    getGroups: getGroups,
    createGroup: createGroup,
    addParticipants: addParticipants
  };
})


////////////////// CITY //////////////////////


.factory('City', function ($http) {
  var getCity = function(query){
    return $http({
      method: 'GET',
      url: '/api/dest',
      params: {name: query}
    })
    .then(function(resp){
      return resp.data;
    });
  };

  return {
    getCity: getCity
  };
})


////////////////// VENUES //////////////////////


.factory('Venues', function ($http) {


  ////////////////// PLACES TO EXPLORE //////////////////////


  var getVenues = function(query){
    return $http({
      method: 'GET',
      url: '/api/dest/venues',
      params: {permalink: query}
    })
    .then(function(resp){
      return resp.data;
    });
  };


  ////////////////// FAVORITES //////////////////////


  var getFavs = function(query){
    return $http({
      method: 'GET',
      url: '/api/favs',
      params: {query: query}
    })
    .then(function(resp){
      return resp.data;
    });
  };
  var rateVenue = function(data) {
    return $http({
      method: 'POST',
      url: '/api/favs',
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


  var getItinerary = function(query){
    return $http({
      method: 'GET',
      url: '/api/itin',
      params: {query: query}
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
