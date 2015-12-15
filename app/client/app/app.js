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
    .state('/attractions', {
      url: '/attractions',
      templateUrl: 'app/attractions/attractions.html',
      controller: 'AttractionsController',
      authenticate: true
    })
    .state('/hotels', {
      url: '/hotels',
      templateUrl: 'app/attractions/hotels.html',
      controller: 'HotelsController',
      authenticate: true
    })
    .state('/restaurants', {
      url: '/restaurants',
      templateUrl: 'app/restaurants/restaurants.html',
      controller: 'RestaurantsController',
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
//
// .config(function($routeProvider, $httpProvider) {
//   $routeProvider
//     .when('/', {
//       templateUrl: 'app/landing/landing.html',
//       controller: 'LandingController'
//     })
//     .when('/attractions', {
//       templateUrl: 'app/attractions/attractions.html',
//       controller: 'AttractionsController',
//       authenticate: true
//     })
//     .when('/hotels', {
//       templateUrl: 'app/hotels/hotels.html',
//       controller: 'HotelsController',
//       authenticate: true
//     })
//     .when('/restaurants', {
//       templateUrl: 'app/restaurants/restaurants.html',
//       controller: 'RestaurantsController',
//       authenticate: true
//     })
//     .otherwise({
//       redirectTo: '/'
//     });
// })
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
