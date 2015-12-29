angular.module('travel.ratings', ['ui.bootstrap', 'ngAnimate'])

.controller('RatingsController', function ($scope, $window, $rootScope, $state, $uibModal, CurrentInfo, Venues, Groups, Util) {
  $scope.filteredUserRatings = [];
  $scope.filteredGroupRatings  = [];
  $scope.city = $rootScope.destination;
  $scope.heading = null;
  $scope.allVenuesRatings = [];
  $scope.groups = [];


  ////////////////// GET ALL THE GROUPS OF A USER //////////////////////


  $scope.getUserGroups = function() {
    Groups.getUserGroups($rootScope.currentUser._id)
      .then(function(groupsInfo){
        $scope.groups = groupsInfo;
      });
  };


  ////////////////// SELECTING A GROUP WILL REROUTE TO RATINGS //////////////////////


  $scope.selectGroup = Groups.selectGroup(function () {
    $state.go('ratings');
  });


  ////////////////// FILTER FOR RESTAURANTS/ATTRACTIONS/HOTELS //////////////////////


  $scope.filterRatings = function (filterType) {
    if (!$scope.allVenuesRatings.length) return;

    var venues = [];
    var groupRatings = [];
    var userRatings = [];
    var userId = $rootScope.currentUser._id;

    // set heading to appropriate value
    if (filterType === 1) {
      $scope.heading = 'Hotels';
    } else if (filterType === 2) {
      $scope.heading = 'Restaurants';
    } else if (filterType === 3) {
      $scope.heading = 'Attractions';
    }

    // populate venues with appropriate results
    // not working with groups removed this code...
    // if (favorite.userInfo === $rootScope.currentUser) {
    //   console.log(favorite.venue);
    // } else {
    //   GroupRatings.push(favorite);
    // }

    $scope.allVenuesRatings.forEach(function(ven) {
      if (ven.venue.venue_type_id === filterType) {
        venues.push(ven);
      }
    });
    venues.forEach(function(ven) {
      $scope.addAvg(ven);
      ven.allRatings.forEach(function(rating) {
        if (rating.user === userId) {
          ven.currentRating = rating.userRating;
          userRatings.push(ven);
        }
      });
    });
    $scope.filteredGroupRatings = groupRatings;
    $scope.filteredUserRatings  = userRatings;
    $rootScope.mockData = userRatings;
    console.log(userRatings);
  };


  ////////////////// ADD AVERAGES FOR A VENUE //////////////////////


  $scope.addAvg = function (venue) {
    var total = 0;
    var numberofRatings = 0;
    venue.allRatings.forEach(function(rating){
      if (rating.userRating !== 0) {
        total += rating.userRating;
        numberofRatings ++;
      }
    });
    venue.avgRating = (total / numberofRatings) || 0;
  };


  ////////////////// GET ALL RATINGS OF THE GROUP //////////////////////


  $scope.getRatings = function() {
    var userId = $rootScope.currentUser._id;
    var groupId = $rootScope.currentGroup._id;
    var query = {
      userId : userId,
      groupId : groupId
    };
    Venues.getRatings(query)
      .then(function(venuesInfo){
        console.log(venuesInfo);
        $scope.allVenuesRatings = venuesInfo;
        $scope.filterRatings(1);
      });
  };

  // $scope.fetchUserFavorites = function () {
  //   var userId = $rootScope.currentUser._id;
  //   Venues.getUserFavorites(userId)
  //   .then(function(favorites) {
  //     $scope.allVenuesRatings = favorites;
  //     console.log('favorites', $scope.allVenuesRatings);
  //     $scope.filterRatings(1);
  //   });
  // };


  ////////////////// USER ADD RATING //////////////////////


  $scope.ratings = {};
  $scope.max = 10;
  $scope.isReadonly = false;
  $scope.showRatings = {};
  $scope.hoveringOver = function(value,id) {
    $scope.showRatings[id] = value;
  };

  $scope.addRating = function(venueData, rating) {
    var userId = $rootScope.currentUser._id;
    venueData.allRatings.forEach(function(rate) {
      if (rate.user === userId) {
        rate.userRating = rating;
      }
    });
    venueData.currentRating = rating;
    console.log(venueData);
    $scope.addAvg(venueData);
    var data = {
      venue : venueData.venue,
      userId : userId,
      groupId : $rootScope.currentGroup._id,
      rating : rating
    };
    Venues.addRating(data);
  };


  ////////////////// GET DETAILED INFO OF A VENUE //////////////////////


  // Sets image carousel interval
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.ratingsInfo = $rootScope.ratingsInfo;
  $scope.phoneHide = $rootScope.phoneHide;

  $scope.getDetailedVenueInfo = function(venue) {
    if (venue.venue.telephone === null) {
      $rootScope.phoneHide = true;
    } else {
      $rootScope.phoneHide = false;
    }
    $rootScope.ratingsInfo = venue;
    $scope.ratingsInfo = venue;
    $scope.openModal();
  };
  $scope.exit = function(){
    $uibModalInstance.close();
  };
  $scope.openModal = function() {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/ratings/moreInfo.html',
      controller: 'RatingsController',
    });
  };


  ////////////////// ADMIN ONLY //////////////////////


  $scope.addtoItin = function(venueData) {
    var data = {
      venue : venueData,
      userId : $rootScope.currentUser._id,
      groupId : $rootScope.currentGroup._id,
      startDate : null,
      endDate : null
    };
    Venues.addtoItinerary(data);
  };


  ////////////////// INIT STATE //////////////////////


  $scope.getRatings();

});