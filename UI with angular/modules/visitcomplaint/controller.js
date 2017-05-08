'use strict'

angular.module('VisitComplaint')
.controller('VisitComplaintController',
['$scope','$rootScope','$cookies','$location','$routeParams','VisitComplaintService','AuthenticationService','AdminDepartmentService',
function($scope,$rootScope,$cookies,$location,$routeParams,VisitComplaintService,AuthenticationService,AdminDepartmentService){
    var token = $cookies.get('token');
    var org_name = $cookies.get('orgname');
    var currentUserEmail = $cookies.get('email');
    $scope.complaintId = $routeParams.complaintId;
    var changedStatus ;

    var init = function () {
        //calling method from AuthenticationService to feth all complaints
        VisitComplaintService.getComplaint($scope.complaintId,token, function(response, data){
            //storing result in scope variable
            $scope.complaintStats = data;
            $scope.reportedDateinMonths = new Date(data.reportedDate);
            $scope.lastUpdatedAtDateinMonths = new Date(data.lastUpdatedAt);

            console.log("This is the REPORTERNAME"+$scope.complaintStats.reporterName);

            VisitComplaintService.getComments($scope.complaintId,token, function(response, data){
                console.log("In get COmments");
                $scope.comments = data;
                console.log("This is the data"+data);
            });

            AdminDepartmentService.getAllUsers(currentUserEmail,token,function(response,data){
                $scope.allusers = data;
            });
        });
    };

    //call to init function
    init();

    $scope.changeStatus = function(status){
        changedStatus = status;
    }

    $scope.postComment = function(){

        VisitComplaintService.addComments($scope.newcomment,
            $scope.complaintId,
            token,
            function(response, data){
                //On success,
                //  1.  Call Notification Service to send Email to Reporter, Assigned To person and Watchers stating
                //  that current user has just commented
            }
        );
    }

    $scope.getAllUsers = function(){
    }

    $scope.updateComplaint = function(){
        VisitComplaintService.registerComplaint(
            $scope.complaintStats,
            org_name,
            token,
            $scope.allusers,
            $scope.user,
            $scope.complaintId,
            changedStatus,
            $scope.assigneeName,
            $scope.priority,
            function(response,data){

                //On success, call notification service
                VisitComplaintService.notify(currentUserEmail,
                    org_name,
                    $scope.complaintStats,
                    function(response,data){

                });
            });
    };






    //assigning signout function to scope
    $scope.signout = function() {
        //calling implementation of signout, which is written in AuthenticationService
        AuthenticationService.ClearCredentials();
    }
}]);
