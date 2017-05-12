'use strict'

angular.module('AdminDashboard')
.factory('AdminDashboardService',
['$http','$cookieStore','$rootScope','$timeout',
function($http,$cookieStore,$rootScope,$timeout){
    var service = {};
    service.getAllComplaints = function (token, callback){
        $http.get('connection.properties').then(function (response) {
            var geturl = response.data.complaintservice + ':'+ response.data.complaint +'/complaint';
            $http({
                url: geturl,
                method: "GET",
                params:{token:token}
            }).success(function(data,response){
                //console.log("This is the data"+data[0].complaintId);
                callback(response,data)
            });
        });
    };

    service.getGraphData = function (token, callback){
        $http.get('connection.properties').then(function (response) {
            var geturl = response.data.authservice + ':'+ response.data.authentication +'/authentication/graph/dept';
            $http({
                url: geturl,
                method: "GET",
                params:{token:token}
            }).success(function(data,response){
                //console.log(JSON.stringify(data));
                callback(response,data)
            });
        });
    };

    return service;
}]);
