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
    var fullItinerary = [];
    $scope.allItinerary.sort(function(a,b) {
      return a.itinerary.fromDate - b.itinerary.fromDate;
    });
    var recurseDate = function(curDate, endDate, ven) {
      curDate = new Date(curDate);
      endDate = new Date(endDate);
      var key = curDate.toDateString();
      var end = endDate.toDateString();
      if (!tempItin.hasOwnProperty(key)) {
        tempItin[key] = {
          date: curDate,
          venues: [ven]
        };
      } else {
        tempItin[key].venues.push(ven);
      }
      if (key === end) {
        return;
      } else {
        recurseDate(curDate.setDate(curDate.getDate() + 1), endDate, ven);
      }
    };
    $scope.allItinerary.forEach(function(venue) {
      var currentDate = venue.itinerary.fromDate;
      var end = venue.itinerary.toDate;
      recurseDate(currentDate, end, venue);
    });
    for (var k in tempItin) {
      if (tempItin.hasOwnProperty(k)) {
        fullItinerary.push([k, tempItin[k].venues]);
      }
    }
    fullItinerary = fullItinerary.sort(function(a, b) {
      var date1 = new Date(a[0]);
      var date2 = new Date(b[0]);
      return date1 - date2;
    });
    $scope.fullItinerary = fullItinerary;
    console.log(fullItinerary);
  };


  ////////////////// ADD TO ITINERARY - ADMIN ONLY//////////////////////


  $scope.addDatesToItinerary = Venues.addToItinerary;

  
  //////////////////DATEPICKER//////////////////////


  $scope.today = new Date();


  //////////////////INIT STATE//////////////////////


  $scope.setItinerary();


});
