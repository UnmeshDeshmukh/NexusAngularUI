'use strict'
angular.module('CreateComplaint')

.controller('CreateComplaintController',
['$scope','$rootScope','$cookies','$location','CreateComplaintService',
function($scope,$rootScope,$cookies,$location,CreateComplaintService){

    var currentUserData = $cookies.get('globals');
    var token = $cookies.get('token');
    var org_name = $cookies.get('orgname');
    var currentUserEmail = $cookies.get('email');
    var milliseconds = (new Date).getTime();
    var attachments = "abc.com";

    $scope.createComplaint = function(){
        CreateComplaintService.registerComplaint($scope.description,
            milliseconds,
            $scope.status,
            $scope.label,
            $scope.priority,
            $scope.latitude,
            $scope.longitude,
            $scope.reporterName,
            $scope.reporter,
            $scope.userTags,
            attachments,
            $scope.subject,
            org_name,
            token,
            function(response,data){
                //description,lastUpdatedAt,status,label,priority,latitude,longitude,reporterName,reporter,userTags,attachments,subject,token

            });
    };

    $scope.getLocations = function(){
        getLocation();
    }
}]);
