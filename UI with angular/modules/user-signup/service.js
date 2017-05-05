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
    $http.post('http://192.168.0.28:8081/authentication/register',JSON.stringify(data))
        .success(function(data,response){
            callback(response,data)
        });
  };
  return service;
}]);
