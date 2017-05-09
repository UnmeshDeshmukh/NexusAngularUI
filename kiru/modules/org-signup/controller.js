'use strict'
angular.module('OrganizationSignupPage')

.controller('OrganizationSignupController',
['$scope','$rootScope','$location','SignupService',
function($scope,$rootScope,$location,SignupService){
    $scope.showError = false;
    $scope.orgsignup = function(){

        SignupService.signup($scope.organization_name, $scope.organization_tagline, $scope.support_email, $scope.support_password, function(response,data){

            if(data.message==="Successful") {
                //if organization signup was successful, redirect to landing page.
                $location.path('/landingteam');
                if (!$rootScope.$$phase)
                    $rootScope.$apply();
            }else if(data.message==='Unsuccessful') {
                //if organization signup was unsuccessful, stay on the same page, and display error
                $scope.showError = true;
                $location.path('/signup-organization');
            }
        });
    };
}]);
