'use strict'

angular.module('LandingPage')

.factory('LandingService',
['$http','$cookieStore','$rootScope','$timeout',
function($http,$cookieStore,$rootScope,$timeout){
    var service = {};
    //$scope.showError = false;
    service.getOrganizationName = function (orgname,callback){

        //removing spaces from organization name
        var currentOrgname = orgname.replace(/\s/g,'');
        //perform a GET operation
        $http.get('connection.properties').then(function (response) {
            var geturl = response.data.rootURL + ':'+ response.data.organization +'/organization/getOrganization';
            console.log("Landing-Page-Service: Performing a GET request: "+ geturl);
            $http({
                url: geturl,
                method: "GET",
                params: {organizationname: currentOrgname}
            }).success(function(data,response){
                console.log("Landing-Page-Service: Performed GET request successfully!");
                callback(response,data)
            });
        });
    };
  return service;
}]);
