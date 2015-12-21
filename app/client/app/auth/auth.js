angular.module('signin', ['ui.bootstrap'])

.controller('AuthController', function ($scope, $uibModal, $rootScope, authMe, $location) {
  $rootScope.currentUserSignedIn = false;
  $rootScope.currentUser = null;

  $scope.open = function() {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/auth/signin.html',
      controller: 'signinCtrl',
    });
  };

  $scope.signout = function() {
    $rootScope.currentUser = null;
    $rootScope.currentUserSignedIn = false;

    // makes call to un-implemented server
    // authMe.logout()
    //     .then(function (data) {
    //       console.log(data);
    //     });
  };

  $scope.onLoad = function() {
    authMe.isLoggedIn()
        .then(function (data){

          if (data.status === true){
            $rootScope.currentUserSignedIn = true;
            $rootScope.currentUser = data.user;
          }
        });
  };

  $scope.onLoad();
})

.controller('signinCtrl', function ($scope, $uibModalInstance, $uibModal, authMe, $location, $rootScope) {
  $scope.alerts = [];

  $scope.closeAlert = function() {
    $scope.alerts = [];
  };

  $scope.submit = function (){
    authMe.loginUser({username: $scope.email, password: $scope.password})
    .then(function (data){
        if (data.status === true){
          $rootScope.currentUserSignedIn = true;
          $rootScope.currentUser = data.user;
          $uibModalInstance.close();
        } else {
          $scope.alerts = [{msg: data.message}];
        }
    });
  };

  $scope.google = function (){
    authMe.googleLogin()
    .then(function (data){
      if (data.status === true) {
          $rootScope.currentUserSignedIn = true;
          $rootScope.currentUser = data.user;
          $uibModalInstance.close();
        } else {
          $scope.alerts = [{msg: data.message}];
        }
    });
  };

  $scope.facebook = function (){
    authMe.facebookLogin()
    .then(function (data){
      if (data.status === true) {
          $rootScope.currentUserSignedIn = true;
          $rootScope.currentUser = data.user;
          $uibModalInstance.close();
        } else {
          $scope.alerts = [{msg: data.message}];
        }
    });
  };

  $scope.create = function(){
    $uibModalInstance.close();

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/auth/signup.html',
      controller: 'signupCtrl',
      background: 'static'
      });
    };

    $scope.exit = function(){
      $uibModalInstance.close();
  };
})

.controller('signupCtrl', function ($scope, $uibModalInstance, authMe, $location, $rootScope) {
  $scope.alerts = [];

   $scope.closeAlert = function() {
    $scope.alerts = [];
  };

  $scope.signup = function (){
    authMe.createUser({username: $scope.email, password: $scope.password})
      .then(function (data){
        if (data.status === true){
          $uibModalInstance.close();
          $rootScope.currentUserSignedIn = true;
          $rootScope.currentUser = data.user;
        } else {
          $scope.alerts = [{msg: data.message}];
        }
      });
  };

  $scope.exit = function(){
    $uibModalInstance.close();
  };

});
