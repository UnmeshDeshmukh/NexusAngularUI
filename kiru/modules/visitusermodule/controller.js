'use strict'

angular.module('UserProfile')

.controller('ProfileController',['$scope','$rootScope','$routeParams','$cookies','$location','UserProfileService', 'VisitUserService','AuthenticationService',
function($scope,$rootScope,$routeParams,$cookies,$location,UserProfileService,VisitUserService,AuthenticationService){
    //alert($rootScope.globals.currentUser.token);
    var currentUserData = $cookies.get('globals');
    var token = $cookies.get('token');
    var org_name = $cookies.get('orgname');
    var currentUserEmail = $cookies.get('email');
    $scope.userPk = $routeParams.userId;

    var init = function () {

        VisitUserService.getUserData($scope.userPk, token, function(response,data){
            $scope.myData = data;
            console.log("The Retrieved Firstname is: " + data.firstname);
            $scope.company = org_name;
            $scope.firstname = data.firstname;
            $scope.lastname = data.lastname;
            $scope.street1 = data.street1;
            $scope.street2 = data.street2;
            $scope.city = data.city;
            $scope.state = data.state;
            $scope.zip = data.zip;
            $scope.aboutme = data.aboutme;
        });

        VisitUserService.getConnectionsGraph($scope.userPk, token, function(response, data){
            var nodes = new vis.DataSet(data.nodes);
            console.log(JSON.stringify(nodes));
            // create an array with edges
            var edges = new vis.DataSet(data.edges);

            var container = document.getElementById('userNetwork');
            var graphsdata = {
                nodes: nodes,
                edges: edges
            };
            console.log("Now printing graph");

            var options = {
                interaction:{hover:true},
                nodes: {
                    shape: 'dot',
                    size: 30,
                    font: {
                        size: 32,
                    },
                    borderWidth: 2
                },
                edges: {
                    width: 2
                }
            };

            var network = new vis.Network(container, graphsdata, options);

            network.on("click", function (params) {
                params.event = "[original event]";
                if(params.nodes.toString().charAt(0)==='C'){
                    var complaintPk = params.nodes.toString().substr(1);
                    $location.path("/complaintdetails/"+complaintPk);
                }
                if(params.nodes.toString().charAt(0)==='U'){
                    var userPk = params.nodes.toString().substr(1);
                    $location.path("/admuser/"+userPk);
                }
            });
            network.on("doubleClick", function (params) {
                params.event = "[original event]";
                //$location.path("/complaint/"+);
                console.log("The value of params"+JSON.stringify(params, null, 4));
            });
        });
    };

    init();

    $scope.signout = function() {
        AuthenticationService.ClearCredentials();
    }
}]);
