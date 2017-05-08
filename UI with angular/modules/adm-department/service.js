'use strict'

angular.module('AdminDepartment')

.factory('AdminDepartmentService',
['$http','$cookieStore','$rootScope','$timeout',
function($http,$cookieStore,$rootScope,$timeout){
    var service = {};
    service.getAllDepartments = function (org_name,token,callback){
        console.log("Admin-Department-Service: Fetching all departments");
        $http.get('connection.properties').then(function (response) {
            //var geturl = 'http://192.168.0.28:8080/department/getAll';
            var geturl = response.data.rootURL + ':' + response.data.department + '/department/getAll';
            $http({
                url: geturl,
                method: "GET",
                params: {token:token,organizationname: org_name}
            }).success(function(data,response){
                console.log("Admin-Department-Service: Fetch all departments successfully. Departments: "+data.departments);
                callback(response,data)
            });
        });
    };

    service.getAllUsers = function (email,token,callback){
        console.log("Admin-Department-Service: Fetching all users. Using Token: " + token);
        $http.get('connection.properties').then(function (response) {
            //var geturl = 'http://192.168.0.28:8081/authentication/getAll';
            var geturl = response.data.rootURL + ':' + response.data.authentication + '/authentication/getAll';
            $http({
                url: geturl,
                method: "GET",
                params: {token:token,email: email}
            }).success(function(data,response){
                console.log("Admin-Department-Service: Fetch all users successfully. Users: "+data.user);
                callback(response,data)
            });
        });
    };

    service.postDepartment = function(dept_name,dept_desc,dept_head,token,callback){
        var data ={
            dept_name : dept_name,
            dept_desc : dept_desc,
            dept_head:dept_head,
            token:token
        }
        console.log("Admin-Department-Service: Posting data to register department: "+ data);
        $http.get('connection.properties').then(function (response) {
            var posturl = response.data.rootURL + ':' + response.data.department + '/department/register';
            //'http://192.168.0.28:8080/department/register'
            $http.post(posturl,JSON.stringify(data))
            .success(function(data,response){
                console.log("Admin-Department-Service: Department registered successfully ");
                callback(response,data)
            });
        });
    };

    service.getDetails = function (dept_names,token,callback){
        //var geturl = 'http://192.168.0.28:8080/department/get'
        $http.get('connection.properties').then(function (response) {
            var geturl = response.data.rootURL + ':' + response.data.department + '/department/get';
            $http({
                url: geturl,
                method: "GET",
                params: {dept_name:dept_names,token:token}
            }).success(function(data,response){
                callback(response,data)
            });
        });
    };

  return service;
}]);
