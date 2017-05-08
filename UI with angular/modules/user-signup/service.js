'use strict'

angular.module('UserSignup')

.factory('UserSignUpService',['$http','$cookieStore','$rootScope',function($http, $cookieStore, $rootScope){
    var service = {};
    service.signup = function(firstname,lastname,email,password,phone, orgname, callback){
    var data ={
        firstname : firstname,
        lastname : lastname,
        email: email,
        password:password,
        phone: phone,
        organizationname: orgname
    }
    $http.get('connection.properties').then(function (response) {
        var posturl = response.data.rootURL + ':'+ response.data.authentication +'/authentication/register';
        $http.post(posturl,JSON.stringify(data))
            .success(function(data,response){
                callback(response,data)
            });
        });
    };
    return service;





}]);
