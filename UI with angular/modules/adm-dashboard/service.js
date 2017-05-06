'use strict'

angular.module('AdminDashboard')
.factory('AdminDashboardService',
['$http','$cookieStore','$rootScope','$timeout',
function($http,$cookieStore,$rootScope,$timeout){
    var service = {};
    service.getAllComplaints = function (token, callback){
        $http.get('connection.properties').then(function (response) {
            var geturl = response.data.complaintRootURL + ':'+ response.data.complaint +'/complaint';
            $http({
                url: geturl,
                method: "GET",
                params:{token:token}
            }).success(function(data,response){
                console.log("This is the data"+data[0].complaintId);
                callback(response,data)
            });
        });
    };
    return service;
}]);
