angular.module('travel.itinerary', ['ui.bootstrap', 'ngAnimate'])

.controller('ItineraryController', function ($scope, $window, $rootScope, $state,
      $uibModal, CurrentInfo, MoreInfo, Venues, Groups, Util) {
  // begin moreInfo modal config:
  angular.extend($scope, MoreInfo);
  $scope.initMoreInfoState();

  $scope.openModal = function() {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/itinerary/moreInfo.html',
      controller: 'ItineraryController',
    });
  };
  // end moreInfo modal config.

  $scope.headerText = 'Itinerary in ' + $rootScope.destination.name;

  $scope.restaurants = [];
  $scope.attractions = [];
  $scope.hotels = [];
  $scope.heading = null;
  $scope.allItinerary = [];
  $scope.groups = [];
  $scope.fullItinerary = [];
  $rootScope.loading = true;


  ////////////////// SELECTING A GROUP WILL REROUTE TO ITINERARY //////////////////////


  $scope.selectGroup = function (groupInfo) {
    Groups.selectGroup(groupInfo, function () {
      $state.go('itinerary');
    });
  };


  ////////////////// FILTER FOR RESTAURANTS/ATTRACTIONS/HOTELS //////////////////////


  $scope.filterItinerary = function () {
    $scope.setItinerary = true;
    $scope.full = false;
    $scope.hotels = Util.filterRatingsByVenueType($scope.allItinerary,1);
    $scope.restaurants = Util.filterRatingsByVenueType($scope.allItinerary,2);
    $scope.attractions = Util.filterRatingsByVenueType($scope.allItinerary,3);
  };


  ////////////////// SHOW FULL ITINERARY //////////////////////


  $scope.removeFromItinerary = function(ratingObj) {
    Venues.removeFromItinerary(ratingObj)
      .then(function () {
        $scope.setItinerary();
      })
      .catch(function (error) {
        console.error(error);
      });
  };


  ////////////////// SHOW FULL ITINERARY //////////////////////


  $scope.setItinerary = function() {
    Venues.getItinerary()
      .then(function (ratingsObjs) {
        $rootScope.loading = false;
        ratingsObjs.forEach(function(rating) {
          rating.itinerary.fromDate = new Date(rating.itinerary.fromDate);
          rating.itinerary.toDate = new Date(rating.itinerary.toDate);
        });
        ratingsObjs.sort(function (a, b) {
          return a.itinerary.fromDate - b.itinerary.fromDate;
        });
        $scope.allItinerary = ratingsObjs;
        if ($rootScope.isHost) {
          $scope.filterItinerary();     
        } else {
          $scope.showFullItinerary();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };


  ////////////////// SHOW FULL ITINERARY //////////////////////


  $scope.showFullItinerary = function() {
    $scope.setItinerary = false;
    $scope.full = true;
    var tempItin = {};

    var getDatesStr = function (startDateStr, endDateStr) {
      var startDate = new Date(startDateStr);
      var endDate = new Date(endDateStr);
      if (endDate < startDate) return;
      var dates = [];

      while (startDate <= endDate) {
        dates.push(startDate.toDateString());
        startDate.setDate(startDate.getDate() + 1);
      }
      return dates;
    };

    $scope.allItinerary.forEach(function(venue) {
      var datesStr = getDatesStr(venue.itinerary.fromDate, venue.itinerary.toDate);

      datesStr.forEach(function (date) {
        if (!tempItin[date]) tempItin[date] = [];

        tempItin[date].push(venue);
      });
    });
    $scope.fullItinerary = Object.keys(tempItin).map(function (date) {
      return [date, tempItin[date], new Date(date)];
    }).sort(function (a, b) {
      return a[2] - b[2];
    });
  };


  ////////////////// ADD TO ITINERARY - ADMIN ONLY//////////////////////


  $scope.addDatesToItinerary = Venues.addToItinerary;

  
  //////////////////DATEPICKER//////////////////////


  $scope.today = new Date();


  //////////////////INIT STATE//////////////////////


  $scope.setItinerary();


});
