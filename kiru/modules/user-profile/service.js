'use strict'
angular.module('UserDashboard')

.factory('UserProfileService', ['$http','$cookies','$rootScope','$timeout',
    function($http,$cookies,$rootScope,$timeout){
        var service = {};

        service.getData = function (currentUser, token, callback){
            $http.get('connection.properties').then(function (response) {
                var geturl = response.data.authservice + ':'+ response.data.authentication +'/authentication/getUser';
                $http({
                    url: geturl,
                    method: "GET",
                    params: {email: currentUser,token:token}
                }).success(function(data,response){
                    //alert(data.user.firstname);
                    callback(response,data)
                });
            });
        };

        service.updateProfile = function(orgname, email, firstname, lastname, street1, street2, city, state, country, zip, aboutme, token, callback){

            $http.get('connection.properties').then(function (response) {
                var posturl = response.data.authservice + ':'+ response.data.authentication +'/authentication/update';
                var data={
                    organizationname: orgname,
                    email:email,
                    firstname:firstname,
                    lastname:lastname,
                    token:token,
                    street1:street1,
                    street2:street2,
                    city:city,
                    state:state,
                    country:country,
                    zip:zip,
                    aboutme:aboutme
                }

                $http.post(posturl,JSON.stringify(data))
                    .success(function(data,response){
                        callback(response,data)
                    }
                );
            });
        };
        return service;
    }
]);
