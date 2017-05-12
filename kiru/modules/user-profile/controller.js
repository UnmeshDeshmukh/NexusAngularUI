'use strict'

angular.module('UserDashboard')

.controller('DashboardController',['$scope','$rootScope','$routeParams','$cookies','$location','UserProfileService','AuthenticationService',
function($scope,$rootScope,$routeParams,$cookies,$location,UserProfileService,AuthenticationService){
    //alert($rootScope.globals.currentUser.token);
    var currentUserData = $cookies.get('globals');
    var token = $cookies.get('token');
    var org_name = $cookies.get('orgname');
    var currentUserEmail = $cookies.get('email');
    $scope.currentEmailId = $routeParams.userId;
    
    var init = function () {
        if($scope.currentEmailId==null){
            UserProfileService.getData(currentUserEmail,token,function(response,data){
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
        }else{
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
        }

    };

    init();

    $scope.updateUser = function(){

        UserProfileService.updateProfile(org_name, currentUserEmail,
            $scope.myData.user.firstname,
            $scope.myData.user.lastname,
            $scope.myData.user.street1,
            $scope.myData.user.street2,
            $scope.myData.user.city,
            $scope.myData.user.state,
            $scope.myData.user.country,
            $scope.myData.user.zip,
            $scope.myData.user.aboutme,
            token,
            function(response,data){
                //$route.reload();
                console.log(response);
                if( data.message === 'Successful'){
                    $.notify({
                        icon: "pe-7s-gift",
                        message: "Hurray!!! Your profile was updated successfully!"
                    },{
                        type: 'info',
                        timer: 4000,
                        placement: {
                            from: 'top',
                            align: 'center'
                        }
                    });
                } else {
                    $.notify({
                        icon: "pe-7s-gift",
                        message: "Snap! Something went wrong while updating your profile!"
                    },{
                        type: 'danger',
                        timer: 4000,
                        placement: {
                            from: 'top',
                            align: 'center'
                        }
                    });
                }
                $location.path('/user');
            });
    };


    $scope.signout = function() {
        AuthenticationService.ClearCredentials();
    }
}]);
