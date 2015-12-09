angular.module('signin', ['ui.bootstrap'])

.controller('AuthCtrl', function ($scope, $uibModal) {

  $scope.open = function(recipeID) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/auth/signin.html',
        controller: 'signinCtrl',
        // resolve: {
        //   item: function() {
        //     return recipe;
        //   }
        });
      };
})

.controller('signinCtrl', function ($scope, $uibModalInstance, $uibModal, authMe, $location) {
  $scope.alerts = [];
  // $scope.email =""
  // $scope.password

  $scope.submit = function (){
    authMe.loginUser({username: $scope.email, password: $scope.password})
    .then(function (data){
        console.log(data)
        if (data.status === true){
          $uibModalInstance.close();
          $location.path('/landing');
        } else {
          $scope.alerts.push({msg: data.message})
        }
    })
  };

  $scope.create = function(){
    $uibModalInstance.close()
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/auth/signup.html',
      controller: 'signupCtrl',
      // resolve: {
      //   item: function() {
      //     return recipe;
      //   }
      });
    };
})

.controller('signupCtrl', function ($scope, $uibModalInstance, authMe, $location) {
  $scope.alerts = [];
  // <uib-alert ng-repeat="alert in alerts" type="{{alert.type}}" close="closeAlert($index)">{{alert.msg}}</uib-alert>

  // <script type="text/ng-template" id="alert.html">
  //   <div class="alert" style="background-color:#fa39c3;color:white" role="alert">
  //     <div ng-transclude></div>
  //   </div>
  // </script>

   $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.signup = function (){
    authMe.createUser({username: $scope.email, password: $scope.password})
      .then(function (data){
        console.log(data)
        if (data.status === true){
          $uibModalInstance.close();
          console.log("success");
          $location.path('/landing');
        } else{
          $scope.alerts.push({msg: data.message})
        }
      });
  };

})



.factory("authMe", function ($http){

  var createUser = function(user){
    return $http({
      method: 'post',
      url: '/signup',
      data: JSON.stringify(user)
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var loginUser = function(user){
    return $http({
      method: 'post',
      url: '/login',
      data: JSON.stringify(user)
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var isLoggedIn = function(user){

  };

  return {
    createUser: createUser,
    loginUser: loginUser,
    isLoggedIn: isLoggedIn
  }

});


