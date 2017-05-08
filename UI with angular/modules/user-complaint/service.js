'use strict'

angular.module('CreateComplaint')

.factory('CreateComplaintService',['$http','$cookies','$rootScope',function($http, $cookies, $rootScope){
    var service = {};
    var userPk = $cookies.get('userPk');
    service.registerComplaint = function(description,
                                        lastUpdatedAt,
                                        status,
                                        label,
                                        priority,
                                        latitude,
                                        longitude,
                                        reporterName,
                                        reporter,
                                        userTags,
                                        attachments,
                                        subject,
                                        orgname,
                                        token,
                                        firstname,
                                        lastname,
                                        callback){

        $http.get('connection.properties').then(function (response) {
            var posturl = response.data.complaintRootURL + ':'+ response.data.complaint +'/complaint';
            var reportername = firstname + " " + lastname;
            console.log(reportername);
            var data={
                description: description,
                lastUpdatedAt:lastUpdatedAt,
                reportedAt:lastUpdatedAt,
                status:"Open",
                label:label,
                priority:priority,
                latitude:37.22,
                longitude:-121.565,
                reporterName:reportername,
                reporter:userPk,
                userTags:userTags,
                attachments:attachments,
                subject:subject
            };

            var param ={token:token};

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
                            callback){

        $http.get('connection.properties').then(function (response) {
            var posturl = response.data.rooturl + ':'+ response.data.notification +'/notify';

            var data={
                to:email,
                from:org_name,
                text:"Complaint Successfully Lodged",
            };



            $http({
                url: posturl,
                method: "POST",
                data:JSON.stringify(data)
            }).success(function(data,response){
                    callback(response,data)
            });
        });
    };










    return service;
}]);
