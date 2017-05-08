'use strict'

angular.module('AdminManageUsers')
.controller('ManageUserController',
['$scope','$rootScope','$cookies','$location','ManageUsersService','AuthenticationService',
function($scope,$rootScope,$cookies,$location,ManageUsersService,AuthenticationService){
    //AuthenticationService.ClearCredentials();
    var currentUserData = $cookies.get('globals');
    var token = $cookies.get('token');
    var org_name = $cookies.get('orgname');
    var currentUserEmail = $cookies.get('email');

    $scope.inviteUser = function(){
        ManageUsersService.addUser(org_name,token,$scope.to, function(response,data){

        });
    };

    $scope.removeUser = function(){
        ManageUsersService.remove($scope.email,token, function(response,data){

        });
    };

    $scope.signout = function() {
        AuthenticationService.ClearCredentials();
    };
}]);
