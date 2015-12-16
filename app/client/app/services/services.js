angular.module('travel.services', [])


////////////////// Groups //////////////////////


.factory('Groups', function ($http) {
  var getGroups = function(userId){
    return $http({
      method: 'GET',
      url: '/api/group',
      params: { userId: userId }
    })
    .then(function(resp){
      return resp.data;
    });
  };
  var createGroup = function(data){
    return $http({
      method: 'POST',
      url: '/api/group',
      data: data
    });
  };
  var addParticipants = function(data) {
    return $http({
      method: 'POST',
      url: '/api/group/add',
      data: data
    });
  };
  return {
    getGroups: getGroups,
    createGroup: createGroup,
    addParticipants: addParticipants
  };
})


////////////////// CITY //////////////////////


.factory('City', function ($http) {
  var getCity = function(destPermalink){
    return $http({
      method: 'GET',
      url: '/api/dest',
      params: { name: destPermalink }
    })
    .then(function(resp){
      return resp.data;
    });
  };

  return {
    getCity: getCity
  };
})


////////////////// UTIL //////////////////////


.factory('Util', function () {
  var transToPermalink = function (string) {
    // Leave commented-out to let the server throw errors for now
    // if (!string) return;

    return string.trim().replace(/\s+/g, '-').toLowerCase();
  };

  return {
    transToPermalink: transToPermalink
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

  /* get user favorites */
    // Get request /api/fav/user
    // All their favorites (array of objs)

  // triggered by add to group favorites button
  /* add to group favorites */
    // Post request to /api/fav
    // Send whole venue object
    // Send group ID

  /* add to user favorites */
    // Post Request to /api/fav/user
    // Send whole venue object
    // Send user ID

  /*
    @param {object} venue should contain all venue data
    @param {str? num?} userID should be the user's ID
  */
  var addToUserFavorites = function (venue, userID) {
    return $http({
      method: 'POST',
      url: '/api/fav/user',
      data: {venue: venue, userID: userID}
    });
  }



  var rateVenue = function(data) {
    return $http({
      method: 'POST',
      url: '/api/favs',
      data: data
    });
  };


  ////////////////// GROUP FAVORITES - ADMIN ONLY //////////////////////


  var addtoItinerary = function(data) {
    return $http({
      method: 'POST',
      url: '/api/itin',
      data: data
    });
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
