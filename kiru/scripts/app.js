'use strict';

angular.module('LandingPage',[]);
angular.module('OrganizationSignupPage',[]);
angular.module('UserSignup',[]);
angular.module('Authentication',[]);
angular.module('UserDashboard',[]);
angular.module('AdminDashboard',[]);
angular.module('AdminDepartment',[]);
angular.module('AdminConfig',[]);
angular.module('UserDashboardModule',[]);
angular.module('AdminManageUsers',[]);
angular.module('AdminTags',[]);

angular.module('CreateComplaint',[]);
angular.module('VisitComplaint',[]);

angular.module('NexusApp',[
  'LandingPage',
  'Authentication',
  'OrganizationSignupPage',
  'UserSignup',
  'VisitComplaint',
  'UserDashboard',
  'AdminDashboard',
  'CreateComplaint',
  'AdminDepartment',
  'AdminManageUsers',
  'AdminConfig',
  'UserDashboardModule',
  'AdminTags',
  'ngRoute',
  'ngMap',
  'ngCookies'
])

.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/',{
      controller:'LandingController',
      templateUrl: 'modules/landing/landing.html'
    })
    .when('/landing',{
      controller:'LandingController',
      templateUrl: 'modules/landing/landing.html',
      hideMenus:true
    })
    //########################################### Sign Up ######################################//
    .when('/signup-organization',{
      controller:'OrganizationSignupController',
      templateUrl:'modules/org-signup/signup-organization.html'
    })
    .when('/signup',{
      controller: 'UserSignupController',
      templateUrl:'modules/user-signup/signup.html'
    })

    //########################################### Login ########################################//
    .when('/login',{
      controller:'LoginController',
      templateUrl: 'modules/login/login.html'
    })

    //###################################### Complaint Visit ######################################//
    .when('/complaintdetails/:complaintId',{
      controller: 'VisitComplaintController',
      templateUrl:'modules/visitcomplaint/visit-complaint.html'
    })
    .when('/usercomplaintdetails/:complaintId',{
      controller: 'VisitComplaintController',
      templateUrl:'modules/visitcomplaint/visitcomplaint-user.html'
    })

    //####################################### Dashboard #########################################//
    .when('/userDashboard',{
      controller:'UserDashboardController',
      templateUrl:'modules/user/dashboard.html'
    })
    .when('/admin',{
      controller:'AdminDashboardController',
      templateUrl:'modules/adm-dashboard/admin-dashboard.html'
    })

    //########################################### Admin operations ######################################//
    .when('/manage-tags',{
      controller:'AdminTagsController',
      templateUrl:'modules/adm-tags/manage-tags.html'
    })
    .when('/department',{
      controller:'AdminDepartmentController',
      templateUrl:'modules/adm-department/manage-departments.html'
    })
    .when('/manage-users',{
      controller:'ManageUserController',
      templateUrl:'modules/adm-manageusers/manage-users.html'
    })
    .when('/settings',{
      controller:'AdminConfigController',
      templateUrl:'modules/configuration/configuration.html'
    })
    .when('/admin-maps',{
      controller:'AdminDashboardController',
      templateUrl:'modules/adm-dashboard/admin-maps.html'
    })
    .when('/complaints',{
      controller:'AdminDashboardController',
      templateUrl:'modules/adm-dashboard/complaint.html'
    })

    //########################################### User operations ######################################//
    .when('/user',{
        controller:'DashboardController',
        templateUrl:'modules/user-profile/user.html'
    })
    .when('/createcomplaint',{
      controller:'CreateComplaintController',
      templateUrl:'modules/user-complaint/create-complaint.html'
    })
    .when('/user-maps',{
      controller:'UserDashboardController',
      templateUrl:'modules/user/user-maps.html'
    })

    //########################################### Default ######################################//
    .otherwise({ redirectTo:'/landing'})
}])

.run(['$rootScope','$location','$cookieStore','$http',
function($rootScope,$location,$cookieStore,$http){
    $rootScope.globals = $cookieStore.get('globals') || {};
    $rootScope.$on('$locationChangeStart',function(event,next,current){
        //TODO: Enter all pafes HERE
        //var restrictedPage = $.inArray($location.path(), [''])

    });
}]);
