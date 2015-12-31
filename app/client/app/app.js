var app = angular.module('travel', [
  'travel.services',
  'travel.landing',
  'travel.groups',
  'travel.itinerary',
  'travel.ratings',
  'travel.results',
  'travel.headerDirective',
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
      // authenticate: true
    })
    .state('ratings', {
      url: '/ratings',
      templateUrl: 'app/ratings/ratings.html',
      controller: 'RatingsController',
      // authenticate: true
    })
    .state('itinerary', {
      url: '/itinerary',
      templateUrl: 'app/itinerary/itinerary.html',
      controller: 'ItineraryController',
      // authenticate: true
    })
    .state('groups', {
      url: '/groups',
      templateUrl: 'app/groups/groups.html',
      controller: 'GroupsController',
      // authenticate: true
    })
    .state('validate', {
      url: '/validate',
      templateUrl: 'app/auth/emailValidate.html',
      controller: 'AuthController',
      // authenticate: true
    })
    .state('about', {
      url: '/about',
      templateUrl: 'app/about/about.html'
    });
  $urlRouterProvider.otherwise('/');
  // $httpProvider.interceptors.push('AttachCity');
});





// .factory('AttachCity', function ($window) {
//   var attach = {
//     request: function (object) {
//       var jwt = $window.sessionStorage.getItem('knowhere');
//       if (jwt) {
//         object.headers['x-access-token'] = jwt;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';
//       return object;
//     }
//   };
//   return attach;
// })
// .run(function ($rootScope, $state, SessionStorage) {
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !SessionStorage.sessionExists()) {
//       $state.go('main');
//     }
//   });
// });
