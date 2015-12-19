angular.module('travel.services', [])


////////////////// Groups //////////////////////


.factory('Groups', function ($http) {
  // HTTP REQ FUNCTIONS
  var addParticipants = function(data) {
    return $http({
      method: 'POST',
      url: '/api/group/add',
      data: data
    });
  };
  var createGroup = function(data){
    return $http({
      method: 'POST',
      url: '/api/group',
      data: data
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  var getUserGroups = function(userId){
    return $http({
      method: 'GET',
      url: '/api/group',
      data: { userId: userId }
    })
    .then(function(resp){
      return resp.data;
    });
  };

  // NOT HTTP REQ FUNCTIONS
  var selectGroup = function (groupInfo, _$rootScope_) {
    _$rootScope_.currentGroup = groupInfo;
    _$rootScope_.destinationPermalink = groupInfo.destination;
  };

  return {
    // HTTP REQ FUNCTIONS
    getUserGroups: getUserGroups,
    createGroup: createGroup,
    addParticipants: addParticipants,

    // NOT HTTP REQ FUNCTIONS
    selectGroup: selectGroup,
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
    .then(function successCb (resp){
      return resp.data;
    }, function errCb (resp) {
      console.error(resp);
      return resp;
    });
  };


  ////////////////// FAVORITES //////////////////////


  /*
    @param {object} data should contain properties:
      @groupId {str} groupId should be the group's Id
      @userId {str} userId
  */
  var getFavorites = function(data){
    return $http({
      method: 'GET',
      url: '/api/fav',
      data: data
    })
    .then(function(resp){
      return resp.data;
    });
  };


  var getUserFavorites = function (userId) {
    return $http({
      method: 'GET',
      url: '/api/fav/user',
      params: {userId: userId}
    })
    .then(function(resp) {
      console.log(resp.data);
      return resp.data;
    });
  };

  /*
    @param {object} data should contain:
      @groupId {str} groupId should be the group's Id
      @venue {object} venue should contain all venue data
  */
  var addToGroupFavorites = function(data) {
    return $http({
      method: 'POST',
      url: '/api/fav',
      data: data
    });
  };


  /*
    // TODO addToGroupFavorites & addToUserFavorites params should be uniform
    @param {object} venue should contain all venue data
    @param {str} userId should be the user's Id
  */
  var addToUserFavorites = function (venue, userId) {
    return $http({
      method: 'POST',
      url: '/api/fav/user',
      data: { venue: venue, userId: userId }
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
    getFavorites: getFavorites,
    getVenues: getVenues,
    getUserFavorites: getUserFavorites,
    addToUserFavorites: addToUserFavorites,
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
