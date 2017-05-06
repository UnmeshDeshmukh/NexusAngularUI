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
                console.log("AdminTagsService: Successfully fetched tags: "+data.tags);
                callback(response,data)
            });
        });
    };

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
                    console.log("AdminTagsService: Successfully posted tags");
                    callback(response,data)
                });
        });
    };

    return service;
}]);
