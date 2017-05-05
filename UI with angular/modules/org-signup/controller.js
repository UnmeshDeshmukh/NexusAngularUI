'use strict'
angular.module('OrganizationSignupPage')

.controller('OrganizationSignupController',
['$scope','$rootScope','$location','SignupService',
function($scope,$rootScope,$location,SignupService){
  $scope.showError = false;

  $scope.orgsignup = function(){


    SignupService.signup($scope.organization_name, $scope.organization_tagline, $scope.support_email, $scope.support_password, function(response,data){

      if(data.message==="Successful"){
            //$rootScope.orgname = $scope.organization_name;
            $location.path('/landingteam');
            //alert($location.path());
            if (!$rootScope.$$phase) $rootScope.$apply();
      }else if(data.message==='Unsuccessful'){
        //$location.path('/login');
        $scope.showError = true;
        $location.path('/signup-organization');
      }
      // }else{
      //   $scope.showError = true;
      //
      // }
    });
  };
}]);
