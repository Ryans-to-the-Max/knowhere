angular.module('travel.services', [])


////////////////// AUTHME //////////////////////


.factory("authMe", function ($http){

  var createUser = function(user){
    return $http({
      method: 'POST',
      url: '/signup',
      data: JSON.stringify(user)
    })
    .then(function (resp){
      return resp.data;
    });
  };

  var googleLogin = function(){
    return $http({
      method: 'GET',
      url: '/auth/google'
    }).then(function (resp){
      return resp.data;
    });
  };

  var facebookLogin = function(){
    return $http({
      method: 'GET',
      url: '/auth/facebook'
    }).then(function (resp){
      return resp.data;
    });
  };

  var loginUser = function(user){
    return $http({
      method: 'POST',
      url: '/login',
      data: JSON.stringify(user)
    })
    .then(function (resp){
      return resp.data;
    });
  };

  var isLoggedIn = function(){
    return $http({
      method: 'GET',
      url: '/api/check'
    })
    .then(function (resp){
      return resp.data;
    });
  };

  // nothing implemented on backend
  // var logout = function(){
  //   return $http({
  //     method: 'GET',
  //     url: '/logout'
  //   });
  // };

  return {
    // logout: logout,
    facebookLogin: facebookLogin,
    googleLogin: googleLogin,
    createUser: createUser,
    loginUser: loginUser,
    isLoggedIn: isLoggedIn
  };

})


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
      params: { userId: userId }
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
      params: query
    })
    .then(function successCb (resp){
      return resp.data;
    }, function errCb (resp) {
      console.error(resp);
      return resp;
    });
  };


  ////////////////// FAVORITES //////////////////////


  var getRatings = function(query){
    return $http({
      method: 'GET',
      url: '/api/rating',
      params: query
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

  var addToUserFavorites = function (venue, userId) {
    return $http({
      method: 'POST',
      url: '/api/fav',
      data: { venue: venue, userId: userId }
    });
  };


  var addRating = function(data) {
    return $http({
      method: 'POST',
      url: '/api/rating',
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
    getUserFavorites: getUserFavorites,
    addToUserFavorites: addToUserFavorites,
    addRating: addRating,
    getRatings: getRatings,
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
});


// ////////////////// SESSION STORAGE //////////////////////


// .factory('SessionStorage', function ($http, $location, $window) {
//   var sessionExists = function () {
//     return !!$window.sessionStorage.getItem('knowhere');
//   };

//   return {
//     sessionExists: sessionExists
//   };
// });
