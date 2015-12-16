'use strict';

describe('Knowhere controllers', function () {

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
  });
});
