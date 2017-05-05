'use strict'

angular.module('AdminTags')

.factory('AdminTagsService',
['$http','$cookies','$rootScope','$timeout',
function($http,$cookies,$rootScope,$timeout){
  var service = {};
  service.getAllTags = function (token,callback){
    $http.get('connection.properties').then(function (response) {
        var geturl = response.data.rootURL + ':'+ response.data.tags +'/tags/get';

        $http({
            url: geturl,
            method: "GET",
            params: {token: token}
        }).success(function(data,response){
            console.log(data.tags);
            callback(response,data)
        });
    });
  };




  // service.getAllUsers = function (email,token,callback){
  //   alert(token);
  //
  // };

  service.postTags = function(tagname,tagdesc,dept_name,token,callback){

    $http.get('connection.properties').then(function (response) {
        var posturl = response.data.rootURL + ':'+ response.data.tags +'/tags/post';
        var data={
          tagname: tagname,
          tagdesc:tagdesc,
          dept_name:dept_name,
          token:token
        }

        $http.post(posturl,JSON.stringify(data))
            .success(function(data,response){
                callback(response,data)
        });
    });
  };

  // service.getDetails = function (dept_names,token,callback){
  //
  //
  //   var geturl = 'http://192.168.0.28:8080/department/get'
  //   $http({
  //    url: geturl,
  //    method: "GET",
  //    params: {dept_name:dept_names,token:token}
  //  }).success(function(data,response){
  //
  //
  //       callback(response,data)
  //  });
  // };





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
