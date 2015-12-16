angular.module('travel', [
  'travel.services',
  'travel.landing',
  'travel,groups',
  'travel.results',
  'travel.itinerary',
  'travel.favorites',
  'ui.router',
  'ui.bootstrap',
  'signin'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    })
    .state('results', {
      url: '/results',
      templateUrl: 'app/results/results.html',
      controller: 'ResultsController',
      authenticate: true
    })
    .state('favorites', {
      url: '/favorites',
      templateUrl: 'app/favorites/favorites.html',
      controller: 'FavoritesController',
      authenticate: true
    })
    .state('itinerary', {
      url: '/itinerary',
      templateUrl: 'app/itinerary/itinerary.html',
      controller: 'ItineraryController',
      authenticate: true
    })
    .state('groups', {
      url: '/groups',
      templateUrl: 'app/groups/groups.html',
      controller: 'GroupsController',
      authenticate: true
    });
  $urlRouterProvider.otherwise('/');
  $httpProvider.interceptors.push('AttachCity');
})
.factory('AttachCity', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.sessionStorage.getItem('knowhere');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, SessionStorage) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !SessionStorage.sessionExists()) {
      $location.path('/');
    }
  });
});
