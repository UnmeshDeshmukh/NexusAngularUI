'use strict'

angular.module('OrganizationSignupPage')

.factory('SignupService',['$http','$cookieStore','$rootScope',function($http, $cookieStore, $rootScope){
    var service = {};
    service.signup = function(organization_name,organization_tagline,support_email,support_password,callback){
        organization_name = organization_name.replace(/\s/g,'');
        var data ={
            organization_name: organization_name,
            organization_tagline: organization_tagline,
            support_email:support_email,
            support_password:support_password
        }
        $http.post('http://192.168.0.28:8082/organization/createOrganization',JSON.stringify(data))
        .success(function(data,response){
            callback(response,data)
        });
    };
    return service;
}]);
