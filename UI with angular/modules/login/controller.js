'use strict';
angular.module('Authentication')

.controller('LoginController',
['$scope','$rootScope','$location','AuthenticationService',
function($scope,$rootScope,$location,AuthenticationService){
  //AuthenticationService.ClearCredentials();
  var org_name = $rootScope.orgname;
  $scope.showError = false;
  //alert(org_name);
  $scope.login = function(){

      AuthenticationService.Login($scope.email,$scope.password,org_name, function(response,data){

        if(data.token!=null){

          AuthenticationService.SetCredentials(data.token,$scope.email,data.usertype, data.userPk);

        }else if(data.message==='Unsuccessful'){
          $scope.showError = true;
          
          $location.path('/login');
        }
      });
  };
}]);
