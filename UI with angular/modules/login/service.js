'use strict';
angular.module('Authentication')
.factory('AuthenticationService',['$http','$cookies','$rootScope','$location',function($http,$cookies,$rootScope,$location){
    var service = {};
    service.Login = function(email,password,org_name,callback){
        var data ={
            email: email,
            password: password,
            organizationname:org_name
        }
        $http.get('connection.properties').then(function (response) {
            var posturl = response.data.rootURL + ':'+ response.data.authentication +'/authentication/authenticate';
            $http.post(posturl,JSON.stringify(data))
            .success(function(data,response){
                callback(response,data);
            })
        });
    }

   service.SetCredentials = function(token, email, usertype, userPk){
        $rootScope.globals = {
            currentUser:{
                email: email,
                userPk: userPk
            }
        };


        $cookies.put('email',email);
        $cookies.put('token',token);
        $cookies.put('userPk',userPk);
        if(usertype==="admin"){
            $location.path('/admin');
        }
        else if(usertype==="user"){
            $location.path('/userDashboard');
        }
    }
    service.ClearCredentials = function(){
        $rootScope.globals = {};
        $cookies.remove('globals');
        $cookies.resmove('orgname');
        $location.path('/landing');
    }
    return service;
}]);
