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
            var posturl = response.data.complaintservice + ':'+ response.data.complaint +'/complaint';
            var reportername = firstname + " " + lastname;
            console.log(latitude + " "+ longitude);
            var data={
                description: description,
                lastUpdatedAt:lastUpdatedAt,
                reportedAt:lastUpdatedAt,
                status:"Open",
                label:label,
                priority:priority,
                latitude:latitude,
                longitude:longitude,
                reporterName:reportername,
                reporter:userPk,
                userTags:userTags,
                attachments:attachments,
                subject:subject
            };

            var param ={token:token};

            console.log(JSON.stringify(data));
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
                            org_name,
                            callback){

        $http.get('connection.properties').then(function (response) {
            var posturl = response.data.notifyservice + ':'+ response.data.notification +'/notify';

            var data={
                to:email,
                from:org_name,
                text:"You have Successfully lodged a new Complaint. Sit back and relax while we work on getting it resolved.<br/> You will be receiving regular updates on your complaint. Please feel free to log-in back to Nexus and update the complaint."
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
