'use strict'

angular.module('AdminDepartment')
.controller('AdminDepartmentController',
['$scope','$rootScope','$cookies','$location','AdminDepartmentService','AuthenticationService',
function($scope,$rootScope,$cookies,$location,AdminDepartmentService,AuthenticationService){
  //AuthenticationService.ClearCredentials();
  var currentUserData = $cookies.get('globals');
  var token = $cookies.get('token');
  var org_name = $cookies.get('orgname');
  var currentUserEmail = $cookies.get('email');
  console.log(token);
  var currentDeptHead = null;
  $scope.showDeptHead = false;
  $scope.showDeptDesc = false;

// $scope.updateDepartment = function(){
//   AdminDepartmentService.updateDepartmentDetails($scope.dept_name,$scope.dept_desc,$scope.org_name,$scope.dept_head,token, function(response,data){
//       //TODO TRACK THE ERRORS IN ADMIN DEPARTMENT
//
//     }
// }

//alert(token);
var init = function () {
   AdminDepartmentService.getAllDepartments(org_name,token,function(response,data){
         //TODO Track the errors
         $scope.myData = data;

         AdminDepartmentService.getAllUsers(currentUserEmail,token,function(response,data){
            $scope.allusers = data;



         });
   })
};
init();


$scope.getDeptDetails = function($event) {

  AdminDepartmentService.getDetails($scope.updatedept_name,token,function(response,data){
    $scope.showDeptHead = true;
    $scope.showDeptDesc = true;
    $scope.currentDeptData = data;

    // 
    // AdminDepartmentService.postDepartment($scope.updatedept_name,$scope.updatedept_desc,$scope.updatedept_head,token, function(response,data){
    //   });

  })
}

$scope.addDepartment = function(){

    AdminDepartmentService.postDepartment($scope.dept_name,$scope.dept_desc,$scope.dept_head,token, function(response,data){

      });
};


$scope.updateDepartment = function(){

    AdminDepartmentService.postDepartment($scope.updatedept_name,$scope.updatedept_desc,$scope.updatedept_head,token, function(response,data){

      });
};

$scope.signout = function() {
    AuthenticationService.ClearCredentials();
}

}]);
