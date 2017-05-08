'use strict'

angular.module('VisitComplaint')
.factory('VisitComplaintService',
['$http','$cookies','$rootScope','$timeout',
function($http,$cookies,$rootScope,$timeout){
    var service = {};
    service.getComplaint = function (complaintId,token, callback){
        $http.get('connection.properties').then(function (response) {
            var geturl = response.data.complaintRootURL + ':'+ response.data.complaint +'/complaint/'+complaintId;
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
            var geturl = response.data.rootURL + ':'+ response.data.comment +'/comment/get';
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
            var posturl = response.data.rootURL + ':'+ response.data.comment +'/comment/post';

            var data={
                comment: comment,
                complaintPk:complaintPk,
                token:token
            }

            $http.post(posturl,JSON.stringify(data))
                .success(function(data,response){
                    callback(response,data)
                }
            );
        });
    };

    service.registerComplaint = function(
                                        complaintStats,
                                        orgname,
                                        token,
                                        allUsers,
                                        selectedUser,
                                        complaintId,
                                        changedStatus,
                                        assigneeName,
                                        priority,
                                        callback){

        $http.get('connection.properties').then(function (response) {
            var posturl = response.data.complaintRootURL + ':'+ response.data.complaint +'/complaint/'+complaintId;
            //var reportername = firstname + " " + lastname;
            var firstname;
            var userPk;
            var assigneeId;
            console.log(allUsers.users[0].userPk);
            for(var i=0;i<allUsers.users.length;i++){
                console.log(allUsers.users[i].firstname);
                if(selectedUser.firstname===allUsers.users[i].firstname){
                    firstname = allUsers.users[i].firstname;
                    userPk = allUsers.users[i].userPk;
                    console.log(firstname+"-------------------"+userPk);
                }else{
                    continue;
                }
            }

            for(var i=0;i<allUsers.users.length;i++){
                console.log(allUsers.users[i].firstname);
                if(assigneeName.firstname===allUsers.users[i].firstname){

                     assigneeId = allUsers.users[i].userPk;

                }else{
                    continue;
                }
            }
            var watchers = [{
                userName:firstname,
                complaintPk:complaintId,
                userPk:userPk
            }];
            //console.log("Changed: Status"changedStatus);


            var data={
                complaintId:complaintId,
                description: complaintStats.description,
                lastUpdatedAt:complaintStats.lastUpdatedAt,
                reportedAt:complaintStats.lastUpdatedAt,
                status:changedStatus,
                label:complaintStats.label,
                priority:priority,
                latitude:37.22,
                longitude:-121.565,
                assignedTo:assigneeId,
                reporterName:complaintStats.reporterName,
                reporter:complaintStats.reporter,
                userTags:complaintStats.userTags,
                attachments:complaintStats.attachments,
                subject:complaintStats.subject,
                assigneeName:assigneeName.firstname + " " +assigneeName.lastname,
                watchers:watchers
            };



            $http({
                url: posturl,
                method: "POST",
                data:JSON.stringify(data),
                params:{token:token}
            }).success(function(data,response){
                    callback(response,data)
            });
        });
    };


    service.notify = function(email,
                             orgname,
                            watchers,
                            callback){

            $http.get('connection.properties').then(function (response) {
                var posturl = response.data.rooturl + ':'+ response.data.notification +'/notify';

                console.log(reportername);
                var to = email;
                for(var i =0;i<watchers.watchers;i++){
                    to = to + "," +watchers.watchers[i].userName;
                }
                var data={
                    to:to,
                    from:org_name,
                    text:"Please Login to see the changes made to the complaint regiestered",
                };

                var param ={token:token};

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



;
