'use strict';

// TODO:
// ResultsController initial state - look at CurrentInfo.destination.basicInfo etc.
// Refactor mock data


describe('Knowhere controllers', function () {
  var mockVenues;

  beforeAll(function () {
    mockVenues = {
  "Info": "List of Venues and IDs",
  "Query Parameters": {
    "destination_id": "Destination ID",
    "order_by": "rank, tripexpert_score, distance",
    "latitude": "required when order_by is distance",
    "longitude": "required when order_by is distance",
    "venue_type_id": "1 === hotels, 2 === restaurants, 3 === attractions",
    "amenity_ids": "not important",
    "price_category_ids": "not important"
  },
  "Results": [
    {
      "id": "1",
      "venue_type_id": 1,
      "name": "Greenwich Hotel",
      "tripexpert_score": 99,
      "rank_in_destination": 1,
      "score": 99,
      "description": "Robert DeNiro and partners spared nothing in their luxurious eight-story hotel, which opened in 2008.",
      "index_photo": "http://static.tripexpert.com/images/venues/index_photos/index_retina/637972.jpg"
    },
    {
      "id": "2",
      "venue_type_id": 1,
      "name": "Crosby Street Hotel",
      "tripexpert_score": 98,
      "rank_in_destination": 2,
      "score": 98,
      "description": "Opened in SoHo in 2009, this Kit Kemp–designed 11-story brownstone has floor-to-ceiling windows throughout and is environmentally certified as an LEED Gold property.",
      "index_photo": "http://static.tripexpert.com/images/venues/index_photos/index_retina/636532.jpg"
    },
    {
      "id": "3",
      "venue_type_id": 1,
      "name": "The NoMad Hotel",
      "tripexpert_score": 97,
      "rank_in_destination": 3,
      "score": 97,
      "description": "That stray capital M is a nod to the neighborhood; fairly recently a no-man’s-land, the district North of Madison Park is a Manhattan renewal success story in the making.",
      "index_photo": "http://static.tripexpert.com/images/venues/index_photos/index_retina/634638.jpg"
    },
    {
      "id": "21",
      "venue_type_id": 2,
      "name": "Daniel",
      "tripexpert_score": 99,
      "rank_in_destination": 1,
      "score": 99,
      "description": "Clearly this is a world-class dining establishment, as evidenced by a bunch of Michelin stars and Barack Obama visits.",
      "index_photo": "http://static.tripexpert.com/images/venues/index_photos/index_retina/2377015.jpg"
    },
    {
      "id": "23",
      "venue_type_id": 2,
      "name": "Per Se",
      "tripexpert_score": 97,
      "rank_in_destination": 3,
      "score": 97,
      "description": "A tasting menu for two at superchef Thomas Keller's plushly impersonal 16-table dining room overlooking Columbus Circle will last three hours and set you back a cool 500 clams. ",
      "index_photo": "http://static.tripexpert.com/images/venues/index_photos/index_retina/2368725.jpg"
    },
    {
      "id": "24",
      "venue_type_id": 2,
      "name": "Eleven Madison Park",
      "tripexpert_score": 96,
      "rank_in_destination": 4,
      "score": 96,
      "description": "Where the elite meet to greet.",
      "index_photo": "http://static.tripexpert.com/images/venues/index_photos/index_retina/2382342.jpg"
    },
    {
      "id": "41",
      "venue_type_id": 3,
      "name": "Central Park",
      "tripexpert_score": 99,
      "rank_in_destination": 1,
      "score": 99,
      "description": "Rambling yet contained, nature-filled yet man-made, this 843-acre oasis provides a welcome respite from the concrete jungle for locals and tourists alike.",
      "index_photo": "http://static.tripexpert.com/images/venues/index_photos/index_retina/2325317.jpg"
    },
  ]
};
  });

  beforeEach(module('travel'));

  describe('ResultsController', function () {

    describe('$scope.getGroups()', function () {

      var ctrl, groupsInfo, rootScope, scope, $httpBackend;

      beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
        groupsInfo = [{ group1: 'test group 1 info' }, { group2: 'test group 2 info' }];

        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET(/\/api\/groups/).respond(groupsInfo);
        $httpBackend.whenGET(/\//).respond('');
      }));

      it('does nothing if there is no currentUser', function (done) {
        inject(function ($controller, $rootScope) {
          scope = $rootScope.$new();
          $controller('ResultsController', { $scope: scope });

          $httpBackend.flush();

          expect(scope.groups.length).toEqual(0);
          done();
        });
      });

      it('gets the currentUser\'s groups by currentUser._id', function (done) {
        inject(function ($controller, $rootScope) {
          $rootScope.currentUser = { _id: 'testUserId' };
          scope = $rootScope.$new();
          $controller('ResultsController', { $scope: scope });

          $httpBackend.flush();

          expect(scope.groups).toEqual(groupsInfo);
          done();
        });
      });
    });

    describe('initial state', function () {

      var ctrl, groupsInfo, mockNYC, rootScope, $scope, $httpBackend;

      beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
        groupsInfo = [{ group1: 'test group 1 info' }, { group2: 'test group 2 info' }];
        mockNYC = {
          "id": "1",
          "name": "New York City",
          "country_name": "United States",
          "priority": 1,
          "permalink": "new-york-city",
          "index_photo" : "http://static.tripexpert.com/images/destinations/index_photos/explore/6.jpg",
          "splash_photo": "http://static.tripexpert.com/images/destinations/splash_photos/index/6.jpg",
          "distance": 3.4520683
        };

        $httpBackend = _$httpBackend_;
        // TODO refactor this to look at param
        // $httpBackend.whenGET(/\/api\/dest?name=destPermalink/).respond(mockVenues);
        $httpBackend.whenGET(/\/api\/dest$/).respond(mockNYC);
        $httpBackend.whenGET(/\/api\/dest\/venues/).respond(mockVenues.Results);
        $httpBackend.whenGET(/\/api\/groups/).respond(groupsInfo);
        $httpBackend.whenGET(/\//).respond('');

        $rootScope.currentUser = { _id: 'testUserId' };
        $scope = $rootScope.$new();
        ctrl = $controller('ResultsController', { $scope: $scope });
      }));

      it('sets $scope.group to the currentUser\'s groups by currentUser._id', function (done) {
        $httpBackend.flush();

        expect($scope.groups).toEqual(groupsInfo);
        done();
      });

      it('sets $scope.city', function (done) {
        $httpBackend.flush();

        expect($scope.city).toEqual(mockNYC);
        done();
      });

      it('sets $scope.venues', function (done) {
        $httpBackend.flush();

        expect($scope.venues).toEqual(mockVenues.Results);
        done();
      });
    });
  });
});
