'use strict'

angular.module('AdminDepartment')

.factory('AdminDepartmentService',
['$http','$cookieStore','$rootScope','$timeout',
function($http,$cookieStore,$rootScope,$timeout){
  var service = {};
  service.getAllDepartments = function (org_name,token,callback){


    var geturl = 'http://192.168.0.28:8080/department/getAll';
    $http({
     url: geturl,
     method: "GET",
     params: {token:token,organizationname: org_name}
   }).success(function(data,response){
        //alert(data.user.firstn0ame);
        console.log("The data that is being sent from here"+data.departments);
        callback(response,data)
   });
  };
  service.getAllUsers = function (email,token,callback){
    alert(token);

    var geturl = 'http://192.168.0.28:8081/authentication/getAll'
    $http({
     url: geturl,
     method: "GET",
     params: {token:token,email: email}
   }).success(function(data,response){
        //alert(data.user.firstn0ame);

        callback(response,data)
   });
  };
  service.postDepartment = function(dept_name,dept_desc,dept_head,token,callback){

    var data ={
      dept_name : dept_name,
      dept_desc : dept_desc,
      dept_head:dept_head,
      token:token
    }
   console.log(data);
    $http.post('http://192.168.0.28:8080/department/register',JSON.stringify(data))
        .success(function(data,response){
            callback(response,data)
        });
  };

  service.getDetails = function (dept_names,token,callback){


    var geturl = 'http://192.168.0.28:8080/department/get'
    $http({
     url: geturl,
     method: "GET",
     params: {dept_name:dept_names,token:token}
   }).success(function(data,response){


        callback(response,data)
   });
  };





  // service.updateDepartment = function(dept_name,dept_desc,org_name,dept_head,token,callback){
  //   var data ={
  //     dept_name : dept_name,
  //     dept_desc : dept_desc,
  //     dept_head:dept_head,
  //     token:token
  //   }
  //   $http.post('http://192.168.0.28:8080/department/register',JSON.stringify(data))
  //       .success(function(data,response){
  //           callback(response,data)
  //       });
  // };
  return service;
}]);
