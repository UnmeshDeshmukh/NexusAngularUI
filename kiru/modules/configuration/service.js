'use strict'

angular.module('AdminConfig')

.factory('AdminConfigService',
['$http','$cookies','$rootScope','$timeout',
    function($http,$cookies,$rootScope,$timeout){
        var service = {};
        service.updateConfiguration = function(checkMaps,
            checkTags,
            checkWatchers,
            checkNotifications,
            dbHostname,
            dbPort,
            dbUsername,
            dbPassword,
            orgname,
            token,
            callback){
                var data ={
                    map : checkMaps,
                    tag : checkTags,
                    watcher : checkWatchers,
                    notification : checkNotifications,
                    host : dbHostname,
                    port : dbPort,
                    user : dbUsername,
                    password : dbPassword,
                    database : orgname,
                    token:token
                }
                $http.get('connection.properties').then(function (response) {
                    var posturl = response.data.orgservice + ':' + response.data.organization + '/organization/configurations';
                    console.log("Admin-Configservice: Posting data to update Configuration: "+ data);
                    console.log("Admin-Configservice: Sending data to: "+ posturl);
                    $http.post(posturl,JSON.stringify(data))
                    .success(function(data,response){
                        console.log("Admin-Configservice: Configuration updated successfully ");
                        callback(response,data)
                    });
                });
            };

        return service;
    }
]);
