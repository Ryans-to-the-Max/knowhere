angular.module('travel', [
  'travel.services',
  'travel.landing',
  'travel.results',
  'travel.hotels',
  'travel.attractions',
  'travel.restaurants',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    })
    .when('/', {
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    })
    .otherwise({
      redirectTo: '/'
    });

});
