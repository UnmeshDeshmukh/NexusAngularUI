'use strict'

angular.module('AdminManageUsers')

.factory('ManageUsersService',
['$http','$cookieStore','$rootScope','$timeout',
function($http,$cookieStore,$rootScope,$timeout){
    var service = {};

    //service to invite users
    service.addUser = function(org_name,token,to,callback){

        $http.get('connection.properties').then(function (response) {
            var posturl = response.data.rootURL + ':'+ response.data.authentication +'/authentication/invite';
            var data={
                organizationname: org_name,
                token:token,
                to:to,
                link:window.location.href
            }

            $http.post(posturl,JSON.stringify(data))
                .success(function(data,response){
                    console.log("Admin-Manage-Users: Invite email has been sent to user at: "+ data.to);
                    callback(response,data)
                });
        });
    };

    //service to remove users
    service.remove = function(email,token,callback){

        $http.get('connection.properties').then(function (response) {
            var posturl = response.data.rootURL + ':'+ response.data.authentication +'/authentication/remove';
            var data={
                email:email,
                token:token
            }

            $http.post(posturl,JSON.stringify(data))
                .success(function(data,response){
                    callback(response,data)
                });
        });
    };
    return service;
}]);
