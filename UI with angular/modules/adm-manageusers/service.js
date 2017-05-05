'use strict'

angular.module('AdminManageUsers')

.factory('ManageUsersService',
['$http','$cookieStore','$rootScope','$timeout',
function($http,$cookieStore,$rootScope,$timeout){
  var service = {};


  service.addUser = function(org_name,token,to,callback){

    $http.get('connection.properties').then(function (response) {
        var posturl = response.data.rootURL + ':'+ response.data.authentication +'/authentication/invite';
        var data={
          organizationname: org_name,
          token:token,
          to:to,
          link:"www.github.com/faisal9227"
        }

        $http.post(posturl,JSON.stringify(data))
            .success(function(data,response){
                callback(response,data)
        });
    });
  };



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
