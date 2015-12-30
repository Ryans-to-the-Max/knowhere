angular.module('travel.headerDirective', [])

.directive('header', function() {
  return {
    templateUrl: 'app/templates/nav-bar.html',
  };
});
