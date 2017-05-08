'use strict'
angular.module('UserSignup')
.controller('UserSignupController',
['$scope','$rootScope','$location','UserSignUpService',
function($scope,$rootScope,$location,UserSignUpService){
    $scope.showError = false;
    var org_name = $rootScope.orgname;
    $scope.usersignup = function(){
        UserSignUpService.signup($scope.firstname, $scope.lastname, $scope.email, $scope.password, $scope.phone, org_name,
            function(response,data){
                if(data.message==="Successful"){
                    $location.path('/landing');
                }else{
                    alert("Sorry! Sommething went wrong!");
                }
            });
        };
}]);
