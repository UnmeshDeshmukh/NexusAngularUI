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
            console.log(JSON.stringify(data));
            $scope.complaintStats = data;
            $scope.reportedOnDate = new Date(data.reportedAt);
            $scope.lastUpdatedDate = new Date(data.lastUpdatedAt);

            console.log("This is the REPORTERNAME"+$scope.complaintStats.reporterName);

            VisitComplaintService.getComments($scope.complaintId,token, function(response, data){
                $scope.comments = data;
                
            });

            AdminDepartmentService.getAllUsers(currentUserEmail,token,function(response,data){
                $scope.allusers = data;
            });
        });
    };

    //call to init function
    init();

    $scope.changeStatus = function(status){
        $scope.complaintStats.status = status;
    }

    $scope.postComment = function(){
        console.log("POst Comment Called!");
        VisitComplaintService.addComments($scope.newcomment,
            $scope.complaintId,
            token,
            function(response, data){
                //On success,
                //  1.  Call Notification Service to send Email to Reporter, Assigned To person and Watchers stating
                //  that current user has just commented
                //
                VisitComplaintService.notify(currentUserEmail, org_name, $scope.complaintStats, function(response,data){
                });
            }
        );
    };

    $scope.getAllUsers = function(){
    };

    $scope.updateComplaint = function(){
        VisitComplaintService.registerComplaint(
            $scope.complaintStats,
            org_name,
            token,
            $scope.allusers,
            $scope.selectedWatcher,
            $scope.complaintId,
            $scope.newlyAssignedTo,
            $scope.priority,
            function(response,data){
                //On success, call notification service
                VisitComplaintService.notify(currentUserEmail, org_name, $scope.complaintStats, function(response,data){
                });
            });
    };

    //assigning signout function to scope
    $scope.signout = function() {
        //calling implementation of signout, which is written in AuthenticationService
        AuthenticationService.ClearCredentials();
    }
}]);
