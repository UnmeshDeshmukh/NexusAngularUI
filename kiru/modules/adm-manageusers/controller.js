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
            console.log(response);
            if( data.message === 'Successful'){
                $.notify({
                    icon: "pe-7s-gift",
                    message: "Invitation Email was sent to the user"
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
                    message: "Snap! Something went wrong while inviting the user!"
                },{
                    type: 'danger',
                    timer: 4000,
                    placement: {
                        from: 'top',
                        align: 'center'
                    }
                });
            }
        });
    };

    $scope.removeUser = function(){
        ManageUsersService.remove($scope.email,token, function(response,data){
            if( data.message === 'Successful'){
                $.notify({
                    icon: "pe-7s-gift",
                    message: "User was successfully removed!"
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
                    message: "Snap! Something went wrong while removing the user!"
                },{
                    type: 'danger',
                    timer: 4000,
                    placement: {
                        from: 'top',
                        align: 'center'
                    }
                });
            }
        });
    };

    $scope.signout = function() {
        AuthenticationService.ClearCredentials();
    };
}]);
