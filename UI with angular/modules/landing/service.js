'use strict'

angular.module('LandingPage')

.factory('LandingService',
['$http','$cookieStore','$rootScope','$timeout',
function($http,$cookieStore,$rootScope,$timeout){
  var service = {};
  //$scope.showError = false;
  service.getOrganizationName = function (orgname,callback){
      var currentOrgname = orgname.replace(/\s/g,'');
      $http.get('connection.properties').then(function (response) {
          var geturl = response.data.rootURL + ':'+ response.data.organization +'/organization/getOrgaization';
          alert(geturl);
          $http({
                url: geturl,
                method: "GET",
                params: {organizationname: currentOrgname}
          }).success(function(data,response){
                //alert(data.message);
                callback(response,data)
          });
      });

  };


  return service;
}]);
