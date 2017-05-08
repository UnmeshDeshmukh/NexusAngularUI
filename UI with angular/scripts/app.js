'use strict';

angular.module('LandingPage',[]);
angular.module('OrganizationSignupPage',[]);
angular.module('UserSignup',[]);
angular.module('Authentication',[]);
angular.module('UserDashboard',[]);
angular.module('AdminDashboard',[]);
angular.module('AdminDepartment',[]);
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
  'UserDashboardModule',
  'AdminTags',
  'ngRoute',
  'ngCookies'
])

.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/landing',{
      controller:'LandingController',
      templateUrl: 'modules/landing/landing.html',
      hideMenus:true
    })
    .when('/signup-organization',{
      controller:'OrganizationSignupController',
      templateUrl:'modules/org-signup/signup-organization.html'

    })
    .when('/signup',{
      controller: 'UserSignupController',
      templateUrl:'modules/user-signup/signup.html'

    })
    .when('/complaintdetails/:complaintId',{
      controller: 'VisitComplaintController',
      templateUrl:'modules/visitcomplaint/visit-complaint.html'
    })
    .when('/usercomplaintdetails/:complaintId',{
      controller: 'VisitComplaintController',
      templateUrl:'modules/visitcomplaint/visitcomplaint-user.html'
    })
    .when('/login',{
      controller:'LoginController',
      templateUrl: 'modules/login/login.html'
    })
    .when('/user',{
        controller:'DashboardController',
        templateUrl:'modules/user-profile/user.html'
    })
    .when('/admin',{
      controller:'AdminDashboardController',
      templateUrl:'modules/adm-dashboard/admin-dashboard.html'
    })


    .when('/manage-tags',{
      controller:'AdminTagsController',
      templateUrl:'modules/adm-tags/manage-tags.html'
    })
    .when('/department',{
      controller:'AdminDepartmentController',
      templateUrl:'modules/adm-department/manage-departments.html'
    })
    .when('/userDashboard',{
      controller:'UserDashboardController',
      templateUrl:'modules/user/dashboard.html'
    })
    .when('/complaint',{
      controller:'AdminDashboardController',
      templateUrl:'modules/adm-dashboard/complaint.html'

    })
    .when('/createcomplaint',{
      controller:'CreateComplaintController',
      templateUrl:'modules/user-complaint/create-complaint.html'
    })
    .when('/manage-users',{
      controller:'ManageUserController',
      templateUrl:'modules/adm-manageusers/manage-users.html'

    })

    .when('/',{
      controller:'LandingController',
      templateUrl: 'modules/landing/landing.html'

    })
    .when('/user-maps',{
      controller:'UserDashboardController',
      templateUrl:'modules/user/user-maps.html'
    })


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
