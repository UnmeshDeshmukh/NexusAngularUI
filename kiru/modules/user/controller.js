'use strict'

angular.module('UserDashboardModule')
.controller('UserDashboardController',
['$scope', '$rootScope', '$location', 'UserDashboardService', '$cookies', 'NgMap', 'AuthenticationService',
function($scope, $rootScope, $location, UserDashboardService, $cookies, NgMap, AuthenticationService) {
    //var currentUserEmail = $rootScope.globals.currentUser.email;
    var token = $cookies.get('token');
    var org_name = $cookies.get('orgname');
    var currentUserEmail = $cookies.get('email');
    var userPk = $cookies.get('userPk');
    console.log("User-Dashboard-Controller: Token "+ token);
    $scope.checkMaps = $cookies.get('checkMaps');
    
    //$scope.checkTags = $cookies.get('checkTags');
    var statusArray = [];
    var init = function () {
        var datetime = new Date();
        $scope.someTimeVar = datetime.getHours() + ":" + datetime.getMinutes() +":" + datetime.getSeconds();
        UserDashboardService.getComplaints(userPk,token, function(response, data){
            $scope.complaintStats = data;
            console.log("User-Dashboard-Controller: Received complaint, ComplaintId: " + data[0].complaintId);

            //get the count of complaints with given status
            function getStatusCount(status) {
                var count = 0;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].status == status) {
                        count++;
                    }
                }
                return count;
            }
            //fetch results for each complaint status
            var r = getStatusCount('Resolved');
            var o = getStatusCount('Open');
            var i = getStatusCount('InProgress');

            //plot a pie-chart on view
            Chartist.Pie('#chartPreferences', {
              labels: ['Resolved','Open','InProgress'],
              series: [r, o, i]
            });

            //get the count of complaint for given month and status
            function getComplaintCount(month, status) {
                var count = 0;

                for (var i=0; i < data.length; i++) {
                    var date = new Date(data[i].reportedAt);
                    //console.log("Month:"+ month + "Status:" + status + "MOnth:="+date.getMonth());
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

            //collect data
            var data = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                series: [
                    [janO, febO, marO, aprO, mayO, junO, julO, augO, sepO, octO, novO, decO],
                    [janI, febI, marI, aprI, mayI, junI, julI, augI, sepI, octI, novI, decI],
                    [janR, febR, marR, aprR, mayR, junR, julR, augR, sepR, octR, novR, decR]
                ]
            };

            //setting options for bar-chart
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

            //plot chart on UI
            Chartist.Bar('#chartActivity', data, options, responsiveOptions);
        });
    };

    init();

    var mapsinit = function () {
        UserDashboardService.getComplaints(userPk,token, function(response, data){
            $scope.complaintStats = data;

            NgMap.getMap().then(function(map) {
                $scope.map = map;
            });
        });
    };

    $scope.signout = function() {
        AuthenticationService.ClearCredentials();
    }
}]);
