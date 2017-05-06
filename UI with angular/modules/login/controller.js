'use strict';
angular.module('Authentication')

.controller('LoginController',
['$scope','$rootScope','$location','AuthenticationService',
function($scope,$rootScope,$location,AuthenticationService){
    var org_name = $rootScope.orgname;
    $scope.showError = false;

    $scope.login = function(){

        AuthenticationService.Login($scope.email, $scope.password, org_name, function(response,data){
            if(data.token!=null){
                console.log("Login-Controller: User logged in successfully. Fetched token from server.");
                AuthenticationService.SetCredentials(data.token,$scope.email,data.usertype, data.userPk);
            }else if(data.message==='Unsuccessful'){
                console.log("Login-Controller: Invalid credentials provided by the user.");
                $scope.showError = true;
                $location.path('/login');
            }
        });
    };
}]);
