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
                $cookies.put('checkMaps', (!!parseInt(data.map) ? true : false));
                $cookies.put('checkTags', (!!parseInt(data.tag) ? true : false));
                $cookies.put('checkWatchers', (!!parseInt(data.watcher) ? true : false));
                $cookies.put('checkNotifications', (!!parseInt(data.notification) ? true : false));
                $cookies.put('dbHostname', data.host);
                $cookies.put('dbPort', data.port);
                $cookies.put('dbUsername', data.user);
                $cookies.put('dbPassword', data.password);
                $cookies.put('orgname', $rootScope.orgname);

                console.log("Landing Service: Fetched Data - "+ data.map+":"+data.tag+":"+data.watcher+":"+data.notification+":"+data.host+":"+data.port+":"+data.user+":"+data.password);
                if (!$rootScope.$$phase) $rootScope.$apply();
                $location.path('/login');
            }
        });
    };
}]);
