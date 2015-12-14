// 'use strict';

describe('Knowhere angular controllers', function () {

  beforeEach(module('travel'));

  describe('AttractionsController', function () {
    var ctrl, scope;

    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/dest')
          .respond('hello');
      $httpBackend.expectGET('/api/dest/places')
          .respond('hello');

      scope = $rootScope.$new();
      ctrl = $controller('AttractionsController', { $scope: scope });
    }));

    it('should work', function () {
      $httpBackend.flush();
      expect(scope.attractions).toEqual('hello');
      // setTimeout(function () {
      //   $httpBackend.flush();
      //   expect(scope.attractions).toEqual('hello');
      //   done();
      // }, 1000);
      // scope
      //   .getAttractions()
      //   .then(function () {
      //     expect(scope.attractions).toEqual('hello');
      //     done();
      //   })
    });

    // it('should work', inject(function ($controller) {
    //   var scope = { };
    //   var ctrl = $controller('AttractionsController', { $scope: scope });

    //   // expect(scope.attractions).toEqual(null);

    //   setTimeout(function () {
    //     expect(scope.attractions).toEqual('foo');  
    //   }, 0);
    //   // scope.getAttractions();
      
    // }));
  });
});
