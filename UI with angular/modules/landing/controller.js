'use strict';
angular.module('LandingPage')

.controller('LandingController',
['$scope','$rootScope','$location','$cookies','LandingService',
function($scope,$rootScope,$location,$cookies,LandingService){

    $scope.showError = false;
    $scope.verifyOrganization = function () {
        LandingService.getOrganizationName($scope.orgname,  function(response,data) {

            if(data.message==="Unsuccessful"){
                $scope.showError = true;
                if (!$rootScope.$$phase) $rootScope.$apply();
                $location.path('/');
            }else if(data.message==="Successful"){
                $rootScope.orgname = $scope.orgname.replace(/\s/g,'');
                $cookies.put('orgname', $rootScope.orgname);
                if (!$rootScope.$$phase) $rootScope.$apply();
                $location.path('/login');
            }
        });
    };
}]);
