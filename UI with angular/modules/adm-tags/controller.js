'use strict'

angular.module('AdminTags')
.controller('AdminTagsController',
['$scope','$rootScope','$cookies','$location','AdminTagsService','AuthenticationService','AdminDepartmentService',
function($scope,$rootScope,$cookies,$location,AdminTagsService,AuthenticationService,AdminDepartmentService){
  //AuthenticationService.ClearCredentials();
  var currentUserData = $cookies.get('globals');
  var token = $cookies.get('token');
  var org_name = $cookies.get('orgname');
  var currentUserEmail = $cookies.get('email');
  console.log(token);


// $scope.updateDepartment = function(){
//   AdminTagService.updateDepartmentDetails($scope.dept_name,$scope.dept_desc,$scope.org_name,$scope.dept_head,token, function(response,data){
//       //TODO TRACK THE ERRORS IN ADMIN DEPARTMENT
//
//     }
// }

//alert(token);
var init = function () {
   AdminTagsService.getAllTags(token,function(response,data){
         alert(data.message);
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


// $scope.getTagDetails = function($event) {
//
//   AdminTagsService.getDetails($scope.updatedept_name,token,function(response,data){
//     $scope.showDeptHead = true;
//     $scope.showDeptDesc = true;
//     $scope.currentDeptData = data;
//     $scope.updatedept_desc = $scope.currentDeptData.dept_desc;
//     AdminTagsService.postDepartment($scope.updatedept_name,$scope.updatedept_desc,$scope.updatedept_head,token, function(response,data){
//       });
//   })
// }

$scope.addTags = function(){

    AdminTagsService.postTags($scope.tagname,$scope.tagdesc,$scope.dept_name,token, function(response,data){
      //$route.reload();
    });
};



$scope.updateTags = function(){

    AdminTagsService.postTags($scope.updatetagname,$scope.updatetagdesc,$scope.updatesdept_name,token, function(response,data){
      //$route.reload();
    });
};


$scope.signout = function() {
    AuthenticationService.ClearCredentials();
}

}]);
