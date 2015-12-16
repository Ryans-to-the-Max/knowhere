angular.module('travel', [
  'travel.services',
  'travel.landing',
  // UNCOMMENT BELOW WHEN READY
  //'travel,groups',
  // 'travel.itinerary',
  // 'travel.favorites',
  // UNCOMMENT ABOVE WHEN READY
  'travel.results',
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
    // UNCOMMENT BELOW WHEN READY
    .state('results', {
      url: '/results',
      templateUrl: 'app/sampleResults/sampleResults.html',
      controller: 'SampleResultsController',
      authenticate: true
    })
    // UNCOMMENT ABOVE WHEN READY
    // UNCOMMENT BELOW WHEN READY
    // .state('results', {
    //   url: '/results',
    //   templateUrl: 'app/results/results.html',
    //   controller: 'ResultsController',
    //   authenticate: true
    // })
    // .state('favorites', {
    //   url: '/favorites',
    //   templateUrl: 'app/favorites/favorites.html',
    //   controller: 'FavoritesController',
    //   authenticate: true
    // })
    // .state('itinerary', {
    //   url: '/itinerary',
    //   templateUrl: 'app/itinerary/itinerary.html',
    //   controller: 'ItineraryController',
    //   authenticate: true
    // })
    // .state('groups', {
    //   url: '/groups',
    //   templateUrl: 'app/groups/groups.html',
    //   controller: 'GroupsController',
    //   authenticate: true
    // })
    // UNCOMMENT ABOVE WHEN READY
    ;
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
.run(function ($rootScope, $state, SessionStorage) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !SessionStorage.sessionExists()) {
      $state.go('main');
    }
  });
});
