angular.module('travel', [
  'travel.services',
  'travel.landing',
  'travel.results',
  'travel.hotels',
  'travel.attractions',
  'travel.restaurants',
  'ngRoute',
  'ui.router',
  'ui.bootstrap',
  'signin'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController',
      authenticate: true
    })
    .state('results', {
      url: '/results',
      templateUrl: 'app/results/results.html',
      controller: 'ResultsController',
      authenticate: true
    })
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
