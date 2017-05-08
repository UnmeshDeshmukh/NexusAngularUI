'use strict'

angular.module('AdminConfig')
.controller('AdminConfigController',
['$scope','$rootScope','$cookies','$location','AdminConfigService','AuthenticationService',
function($scope,$rootScope,$cookies,$location,AdminConfigService,AuthenticationService){
  var token = $cookies.get('token');
  var org_name = $cookies.get('orgname');
  var currentUserEmail = $cookies.get('email');
  $scope.checkTags = $cookies.get('checkTags');
  $scope.checkMaps = $cookies.get('checkMaps');
  $scope.checkNotifications = $cookies.get('checkNotifications');
  $scope.checkWatchers = $cookies.get('checkWatchers');
  $scope.dbHostname = $cookies.get('dbHostname');
  $scope.dbPort = $cookies.get('dbPort');
  $scope.dbUsername = $cookies.get('dbUsername');
  $scope.dbPassword = $cookies.get('dbPassword');

    var init = function () {
    };

    //call to init function
    init();

    $scope.updateConfiguration = function() {
        AdminConfigService.updateConfiguration($scope.checkMaps,
            $scope.checkTags,
            $scope.checkWatchers,
            $scope.checkNotifications,
            $scope.dbHostname,
            $scope.dbPort,
            $scope.dbUsername,
            $scope.dbPassword,
            org_name,
            token,
            function(response, data) {
                if( data.message === 'Successful'){
                    $.notify({
                        icon: "pe-7s-gift",
                        message: "Configuration was successfully updated!"
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
                        message: "Snap! Connection could not be made to the configuration. Please check database paramenters again!"
                    },{
                        type: 'danger',
                        timer: 4000,
                        placement: {
                            from: 'top',
                            align: 'center'
                        }
                    });
                }
            }
        );
    }

    //assigning signout function to scope
    $scope.signout = function() {
        //calling implementation of signout, which is written in AuthenticationService
        AuthenticationService.ClearCredentials();
    }
}]);
