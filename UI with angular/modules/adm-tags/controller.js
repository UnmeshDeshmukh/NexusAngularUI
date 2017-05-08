'use strict'

angular.module('AdminTags')
.controller('AdminTagsController',
['$scope','$rootScope','$cookies','$location','AdminTagsService','AuthenticationService','AdminDepartmentService',
function($scope,$rootScope,$cookies,$location,AdminTagsService,AuthenticationService,AdminDepartmentService){
    var currentUserData = $cookies.get('globals');
    var token = $cookies.get('token');
    var org_name = $cookies.get('orgname');
    var currentUserEmail = $cookies.get('email');
    console.log(token);

    var init = function () {
        AdminTagsService.getAllTags(token,function(response,data){

            console.log("Admin-Tag-Controller: "+ data.message);

            if(data.message==='Successful'){
                $scope.tagData = data.tags;
                console.log("value of tags data"+data.tags);
            }else if(data.message==='Unsuccessful'){
                $scope.tagData = null;
            }

            AdminDepartmentService.getAllDepartments(org_name,token,function(response,data){
                $scope.deptData = data;
            });
        });
    };

    init();

    $scope.addTags = function(){
        AdminTagsService.postTags($scope.tagname, $scope.tagdesc, $scope.dept_name, token, function(response, data){
            //$route.reload();
            if( data.message === 'Successful'){
                $.notify({
                    icon: "pe-7s-gift",
                    message: "Tag was successfully added!"
                },{
                    type: 'info',
                    timer: 4000,
                    placement: {
                        from: 'top',
                        align: 'center'
                    }
                });
            } else {
                $.notify({
                    icon: "pe-7s-gift",
                    message: "Snap! Something went wrong while adding the tag!"
                },{
                    type: 'danger',
                    timer: 4000,
                    placement: {
                        from: 'top',
                        align: 'center'
                    }
                });
            }
        });
    };

    $scope.updateTags = function(){
        AdminTagsService.postTags($scope.updatetagname, $scope.updatetagdesc, $scope.updatesdept_name, token, function(response, data){
            //$route.reload();
            if( data.message === 'Successful'){
                $.notify({
                    icon: "pe-7s-gift",
                    message: "Tag was successfully updated"
                },{
                    type: 'info',
                    timer: 4000,
                    placement: {
                        from: 'top',
                        align: 'center'
                    }
                });
            } else {
                $.notify({
                    icon: "pe-7s-gift",
                    message: "Snap! Something went wrong while updating the tag!"
                },{
                    type: 'danger',
                    timer: 4000,
                    placement: {
                        from: 'top',
                        align: 'center'
                    }
                });
            }
        });
    };

    $scope.signout = function() {
        AuthenticationService.ClearCredentials();
    }
}]);
