'use strict';

describe('Knowhere angular controllers', function () {

  beforeEach(module('travel'));

  describe('AttractionsController', function () {
    var $httpBackend, ctrl, scope;

    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/dest')
          .respond('city info');
      $httpBackend.expectGET('/api/dest/places')
          .respond('attractions info');

      scope = $rootScope.$new();
      ctrl = $controller('AttractionsController', { $scope: scope });
    }));

    it('should get attractions', function () {
      expect(scope.attractions).toEqual(null);

      $httpBackend.flush();

      expect(scope.attractions).toEqual('attractions info');
    });
  });

  describe('HotelsController', function () {
    var $httpBackend, ctrl, scope;

    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/dest')
          .respond('city info');
      $httpBackend.expectGET('/api/dest/hotels')
          .respond('hotels info');

      scope = $rootScope.$new();
      ctrl = $controller('HotelsController', { $scope: scope });
    }));

    it('should get hotels', function () {
      expect(scope.hotels).toEqual(null);

      $httpBackend.flush();

      expect(scope.hotels).toEqual('hotels info');
    });
  });

  describe('RestaurantsController', function () {
    var $httpBackend, ctrl, scope;

    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/dest')
          .respond('city info');
      $httpBackend.expectGET('/api/dest/rests')
          .respond('restaurants info');

      scope = $rootScope.$new();
      ctrl = $controller('RestaurantsController', { $scope: scope });
    }));

    it('should get restaurants', function () {
      expect(scope.restaurants).toEqual(null);

      $httpBackend.flush();

      expect(scope.restaurants).toEqual('restaurants info');
    });
  });
});
