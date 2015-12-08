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
    .when('/results', {
      templateUrl: 'app/results/results.html',
      controller: 'ResultsController'
    })
    .when('/attractions', {
      templateUrl: 'app/attractions/attractions.html',
      controller: 'AttractionsController'
    })
    .when('/hotels', {
      templateUrl: 'app/hotels/hotels.html',
      controller: 'HotelsController'
    })
    .when('/restaurants', {
      templateUrl: 'app/restaurants/restaurants.html',
      controller: 'RestaurantsController'
    })
    .otherwise({
      redirectTo: '/'
    });

});
