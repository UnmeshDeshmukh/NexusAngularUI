'use strict'

angular.module('AdminDashboard')
.controller('AdminDashboardController',
['$scope','$rootScope','$cookies','$location','$routeParams','AdminDashboardService','AuthenticationService','UserProfileService',
function($scope,$rootScope,$cookies,$location,$routeParams,AdminDashboardService,AuthenticationService,UserProfileService){
    var token = $cookies.get('token');
    var org_name = $cookies.get('orgname');
    var currentUserEmail = $cookies.get('email');
    var init = function () {

        AdminDashboardService.getGraphData(token, function(response, data){
            $scope.graphData = data;

            var nodes = new vis.DataSet(data.nodes);
            //console.log(JSON.stringify(nodes));
            // create an array with edges
            var edges = new vis.DataSet(data.edges);

            var container = document.getElementById('deptNetwork');
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
                    console.log("Fetched userPk: "+ userPk);

                    $location.path("/admuser/"+userPk);
                    //console.log($location.path());
                }
            });
            network.on("doubleClick", function (params) {
                params.event = "[original event]";
                //$location.path("/complaint/"+);
                console.log("The value of params"+JSON.stringify(params, null, 4));
            });

        });

        //calling method from AuthenticationService to feth all complaints
        AdminDashboardService.getAllComplaints(token, function(response, data){
            //storing result in scope variable
            $scope.complaintStats = data;
            //console.log("This is the data"+data);

            //helper funtion to return count of complaints for a  particular status
            function getStatusCount(status) {
                var count = 0;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].status == status) {
                        count++;
                    }
                }
                return count;
            }

            //series parameters for pie-chart
            var r = getStatusCount('Resolved');
            var o = getStatusCount('Open');
            var i = getStatusCount('InProgress');

            //displaying pie-chart
            Chartist.Pie('#chartPreferences', {
                labels: ['Resolved','Open','InProgress'],
                series: [r, o, i]
            });

            //helper function to return count of complaints for a given status & month
            function getComplaintCount(month, status) {
                var count = 0;
                for (var i=0; i < data.length; i++) {
                    var date = new Date(data[i].reportedAt);
                    if(date.getMonth() === month && data[i].status === status){
                        count++;
                    }
                }
                return count;
            }

            //fetch count for open complaints
            var janO = getComplaintCount(1, "Open");
            var febO = getComplaintCount(2, "Open");
            var marO = getComplaintCount(3, "Open");
            var aprO = getComplaintCount(4, "Open");
            var mayO = getComplaintCount(5, "Open");
            var junO = getComplaintCount(6, "Open");
            var julO = getComplaintCount(7, "Open");
            var augO = getComplaintCount(8, "Open");
            var sepO = getComplaintCount(9, "Open");
            var octO = getComplaintCount(10, "Open");
            var novO = getComplaintCount(11, "Open");
            var decO = getComplaintCount(12, "Open");

            //fetch count for resolved complaints
            var janR = getComplaintCount(1, "Resolved");
            var febR = getComplaintCount(2, "Resolved");
            var marR = getComplaintCount(3, "Resolved");
            var aprR = getComplaintCount(4, "Resolved");
            var mayR = getComplaintCount(5, "Resolved");
            var junR = getComplaintCount(6, "Resolved");
            var julR = getComplaintCount(7, "Resolved");
            var augR = getComplaintCount(8, "Resolved");
            var sepR= getComplaintCount(9, "Resolved");
            var octR = getComplaintCount(10, "Resolved");
            var novR = getComplaintCount(11, "Resolved");
            var decR = getComplaintCount(12, "Resolved");

            //fetch count for inProgress complaints
            var janI = getComplaintCount(1, "InProgress");
            var febI = getComplaintCount(2, "InProgress");
            var marI = getComplaintCount(3, "InProgress");
            var aprI = getComplaintCount(4, "InProgress");
            var mayI = getComplaintCount(5, "InProgress");
            var junI = getComplaintCount(6, "InProgress");
            var julI = getComplaintCount(7, "InProgress");
            var augI = getComplaintCount(8, "InProgress");
            var sepI = getComplaintCount(9, "InProgress");
            var octI = getComplaintCount(10, "InProgress");
            var novI = getComplaintCount(11, "InProgress");
            var decI = getComplaintCount(12, "InProgress");

            //initializing data for bar-graph
            var data = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                series: [
                    [janO, febO, marO, aprO, mayO, junO, julO, augO, sepO, octO, novO, decO],
                    [janI, febI, marI, aprI, mayI, junI, julI, augI, sepI, octI, novI, decI],
                    [janR, febR, marR, aprR, mayR, junR, julR, augR, sepR, octR, novR, decR]
                ]
            };

            var options = {
                seriesBarDistance: 10,
                axisX: {
                    showGrid: false
                },
                height: "245px"
            };

            var responsiveOptions = [
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
            ];

            //funtion to draw bar chart
            Chartist.Bar('#chartActivity', data, options, responsiveOptions);
        });
    };

  //call to init function
  init();

  var mapsinit = function () {
      UserDashboardService.getComplaints(userPk,token, function(response, data){
          $scope.complaintStats = data;

          NgMap.getMap().then(function(map) {
              $scope.map = map;
          });
      });
  };

  //assigning signout function to scope
  $scope.signout = function() {
      //calling implementation of signout, which is written in AuthenticationService
      AuthenticationService.ClearCredentials();
  }
}]);
