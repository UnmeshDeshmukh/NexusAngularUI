'use strict'

angular.module('AdminDepartment')
.controller('AdminDepartmentController',
['$scope','$rootScope','$cookies','$location','AdminDepartmentService','AuthenticationService','UserProfileService',
function($scope,$rootScope,$cookies,$location,AdminDepartmentService,AuthenticationService,UserProfileService){
  //AuthenticationService.ClearCredentials();
    var currentUserData = $cookies.get('globals');
    var token = $cookies.get('token');
    var org_name = $cookies.get('orgname');
    var currentUserEmail = $cookies.get('email');
    console.log(token);
    var currentDeptHead = null;
    $scope.showDeptHead = false;
    $scope.showDeptDesc = false;

    var init = function () {
        AdminDepartmentService.getAllDepartments(org_name,token,function(response,data){
            //TODO Track the errors
            $scope.myData = data;
            AdminDepartmentService.getAllUsers(currentUserEmail,token,function(response,data){
                $scope.allusers = data;
            });
        })
        AdminDepartmentService.getGraphData(token, function(response, data){
            $scope.graphData = data;


            var nodes = new vis.DataSet(data.nodes);
            console.log(JSON.stringify(nodes));
            // create an array with edges
            var edges = new vis.DataSet(data.edges);

            var container = document.getElementById('deptNetwork');
            var graphsdata = {
                nodes: nodes,
                edges: edges
            };
            console.log("Now printing graph");
            var options = {interaction:{hover:true}};
            var network = new vis.Network(container, graphsdata, options);

            network.on("click", function (params) {

                params.event = "[original event]";
                if(params.nodes.toString().charAt(0)==='U'){
                    console.log("This is the value--"+params.nodes);
                    console.log(data.nodes.length);
                    for(var i=0;i<data.nodes.length;i++){
                        //console.log("This is the email id:"+data.nodes[i].title);
                        if(params.nodes.toString()===data.nodes[i].id.toString()){
                            console.log("INT THE IF--------------"+data.nodes[i].title);
                            //params.nodes = param.nodes.toString().substr(1);
                            $location.path("/admuser/"+data.nodes[i].title);
                            break;
                        }

                    }
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

    $scope.getDeptDetails = function($event) {
        AdminDepartmentService.getDetails($scope.updatedept_name,token,function(response,data){
            $scope.showDeptHead = true;
            $scope.showDeptDesc = true;
            $scope.currentDeptData = data;
        })
    }

    $scope.addDepartment = function(){
        AdminDepartmentService.postDepartment($scope.dept_name,$scope.dept_desc,$scope.dept_head,token, function(response,data){
            console.log("Admin-Department-Controller: "+ response);

            //notification
            if( data.message === 'Successful'){
                $.notify({
                    icon: "pe-7s-gift",
                    message: "Department was added successfully!"
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
                    message: "Snap! Something went wrong while adding the department!"
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

    $scope.updateDepartment = function(){
        AdminDepartmentService.postDepartment($scope.updatedept_name,$scope.updatedept_desc,$scope.updatedept_head,token, function(response,data){
            console.log(response);
            if( data.message === 'Successful'){
                $.notify({
                    icon: "pe-7s-gift",
                    message: "Department was updated successfully!"
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
                    message: "Snap! Something went wrong while updating the department!"
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
