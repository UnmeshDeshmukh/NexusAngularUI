'use strict'

angular.module('UserDashboardModule')

.factory('UserDashboardService',
['$http','$cookieStore','$rootScope','$timeout',
function($http,$cookieStore,$rootScope,$timeout){
    var service = {};

    service.getComplaints = function (userPk,token, callback){
        $http.get('connection.properties').then(function (response) {
            var geturl = response.data.complaintRootURL + ':'+ response.data.complaint +'/complaint/user/' + userPk;
            $http({
                url: geturl,
                method: "GET",
                params:{token:token}
            }).success(function(data,response){
                callback(response,data)
            });
        });
    };
    return service;
}]);
