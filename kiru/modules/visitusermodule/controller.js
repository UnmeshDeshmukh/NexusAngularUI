'use strict'

angular.module('UserProfile')

.controller('ProfileController',['$scope','$rootScope','$routeParams','$cookies','$location','UserProfileService','AuthenticationService',
function($scope,$rootScope,$routeParams,$cookies,$location,UserProfileService,AuthenticationService){
    //alert($rootScope.globals.currentUser.token);
    var currentUserData = $cookies.get('globals');
    var token = $cookies.get('token');
    var org_name = $cookies.get('orgname');
    var currentUserEmail = $cookies.get('email');
    $scope.currentEmailId = $routeParams.userId;

    var init = function () {

            UserProfileService.getData($scope.currentEmailId,token,function(response,data){
                $scope.myData = data;
                console.log("The Retrieved Firstname is: "+data.firstname);
                $scope.company = org_name;
                $scope.firstname = data.firstname;
                $scope.lastname = data.lastname;
                $scope.street1 = data.street1;
                $scope.street2 = data.street2;
                $scope.city = data.city;
                $scope.state = data.state;
                $scope.zip = data.zip;
                $scope.aboutme = data.aboutme;
            })


    };

    init();



    $scope.signout = function() {
        AuthenticationService.ClearCredentials();
    }
}]);
