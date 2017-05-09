'use strict'

angular.module('VisitComplaint')
.factory('VisitComplaintService',
['$http','$cookies','$rootScope','$timeout',
function($http,$cookies,$rootScope,$timeout){
    var service = {};
    service.getComplaint = function (complaintId,token, callback){
        $http.get('connection.properties').then(function (response) {
            var geturl = response.data.complaintservice + ':'+ response.data.complaint +'/complaint/'+complaintId;
            $http({
                url: geturl,
                method: "GET",
                params:{token:token}
            }).success(function(data,response){
                console.log("Complaint Data"+data);
                callback(response,data)
            });
        });
    };

    service.getComments = function (complaintId,token, callback){
        $http.get('connection.properties').then(function (response) {
            var geturl = response.data.commentservice + ':'+ response.data.comment +'/comment/get';
            $http({
                url: geturl,
                method: "GET",
                params:{token:token,complaintPk:complaintId}
            }).success(function(data,response){

                callback(response,data)
            });
        });
    };

    service.addComments = function(comment,
        complaintPk,
        token,
        callback){

        $http.get('connection.properties').then(function (response) {
            var posturl = response.data.commentservice + ':'+ response.data.comment +'/comment/post';
            console.log("In add comment service");
            var data={
                comment: comment,
                complaintPk:complaintPk,
                token:token
            }
            console.log(JSON.stringify(data));
            $http.post(posturl,JSON.stringify(data))
                .success(function(data,response){
                    callback(response,data)
                }
            );
        });
    };

    service.registerComplaint = function(complaintStats, orgname, token, allUsers, selectedWatcher, complaintId, newlyAssignedTo, priority, callback){

        $http.get('connection.properties').then(function (response) {
            var posturl = response.data.complaintservice + ':'+ response.data.complaint +'/complaint/'+complaintId;
            //var reportername = firstname + " " + lastname;
            var firstname;
            var userPk;
            var assigneeId;
            var assignComplaintTo;
            var watchername;

            if(selectedWatcher){
                for(var i=0;i<allUsers.users.length;i++) {
                    if(selectedWatcher.userPk===allUsers.users[i].userPk) {
                        watchername = allUsers.users[i].firstname + " " + allUsers.users[i].lastname;
                        userPk = allUsers.users[i].userPk;
                    }else{
                        continue;
                    }
                }
            }

            if(newlyAssignedTo){
                if(newlyAssignedTo.firstname || newlyAssignedTo.lastname){
                    for(var i=0;i<allUsers.users.length;i++){
                        console.log(allUsers.users[i].userPk +":" +newlyAssignedTo.userPk);
                        if(newlyAssignedTo.userPk===allUsers.users[i].userPk){
                             assigneeId = allUsers.users[i].userPk;
                             assignComplaintTo = newlyAssignedTo.firstname + " " + newlyAssignedTo.lastname;
                        }else{
                            continue;
                        }
                    }
                }else{
                    assigneeId = complaintStats.assignedTo;
                    assignComplaintTo = complaintStats.assigneeName;
                }
            } else{
                assigneeId = complaintStats.assignedTo;
                assignComplaintTo = complaintStats.assigneeName;
            }

            var watchers=[];
            if(watchername){
                watchers = [{
                    userName:watchername,
                    complaintPk:complaintId,
                    userPk:userPk
                }];
            }

            var data={
                complaintId:complaintId,
                description: complaintStats.description,
                lastUpdatedAt: complaintStats.lastUpdatedAt,
                reportedAt: complaintStats.reportedAt,
                status: complaintStats.status,
                label: complaintStats.label,
                priority: complaintStats.priority,
                latitude: complaintStats.latitude,
                longitude: complaintStats.longitude,
                assignedTo: assigneeId,
                reporterName: complaintStats.reporterName,
                reporter: complaintStats.reporter,
                userTags: complaintStats.userTags,
                attachments: complaintStats.attachments,
                subject: complaintStats.subject,
                assigneeName: assignComplaintTo,
                watchers:watchers
            };

            console.log(JSON.stringify(data));

            $http({
                url: posturl,
                method: "PUT",
                data:JSON.stringify(data),
                params:{token:token}
            }).success(function(data,response){
                    callback(response,data)
            });
        });
    };

    service.notify = function(email, org_name, watchers, callback){

            $http.get('connection.properties').then(function (response) {
                var posturl = response.data.notifyservice + ':'+ response.data.notification +'/notify';

                //console.log(reportername);
                var to = email;
                for(var i =0;i<watchers.watchers;i++){
                    to = to + "," +watchers.watchers[i].userName;
                }
                var data={
                    to:to,
                    from:org_name,
                    text:"Please Login to see the changes made to the complaint regiestered" + watchers.complaintId
                };

                $http({
                    url: posturl,
                    method: "POST",
                    data:JSON.stringify(data),
                }).success(function(data,response){
                        callback(response,data)
                });
            });
        };
    return service;
}]);

// .directive('autoComplete',function($timeout){
//     return function(scope,iElement,iAttrs){
//         iElement.autocomplete({
//             source : scope[iAttrs.uItems],
//             select: function(){
//                 $timeout(function(){
//                     iElement.trigger('input');
//                 },0);
//             }
//         });
//     }
// });
//;
