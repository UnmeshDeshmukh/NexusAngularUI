'use strict'

angular.module('UserProfile')
.factory('VisitUserService',
['$http','$cookieStore','$rootScope','$timeout',
function($http,$cookieStore,$rootScope,$timeout){
    var service = {};

    service.getUserData = function (userPk, token, callback){
        $http.get('connection.properties').then(function (response) {
            var geturl = response.data.authservice + ':'+ response.data.authentication +'/authentication/getUser';
            $http({
                url: geturl,
                method: "GET",
                params: {userPk: userPk,token:token}
            }).success(function(data,response){
                //alert(data.user.firstname);
                callback(response,data)
            });
        });
    };

    service.getConnectionsGraph = function (userPk, token, callback){
        $http.get('connection.properties').then(function (response) {
            var geturl = response.data.authservice + ':'+ response.data.authentication +'/authentication/graph/user';
            $http({
                url: geturl,
                method: "GET",
                params:{token:token, userPk: userPk}
            }).success(function(data,response){
                console.log(JSON.stringify(data));
                callback(response,data)
            });
        });
    };

    return service;
}]);
