type = ['','info','success','warning','danger'];


demo = {
    initPickColor: function(){
        $('.pick-class-label').click(function(){
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if(display_div.length) {
            var display_buttons = display_div.find('.btn');
            display_buttons.removeClass(old_class);
            display_buttons.addClass(new_class);
            display_div.attr('data-class', new_class);
            }
        });
    },

    initChartist: function(){

        var dataSales = {
          labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
          series: [
             [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
            [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
            [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
          ]
        };

        var optionsSales = {
          lineSmooth: false,
          low: 0,
          high: 800,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: false,
          showPoint: false,
        };

        var responsiveSales = [
          ['screen and (max-width: 640px)', {
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);


        var data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
            [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
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

        Chartist.Bar('#chartActivity', data, options, responsiveOptions);

        var dataPreferences = {
            series: [
                [25, 30, 20, 25]
            ]
        };

        var optionsPreferences = {
            donut: true,
            donutWidth: 40,
            startAngle: 0,
            total: 100,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };

        Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

        Chartist.Pie('#chartPreferences', {
          labels: ['Resolved','Open','Assigned'],
          series: [62, 32, 6]
        });
    },

    initGoogleMaps: function(){
        // var myLatlng = new google.maps.LatLng(37.333942, -121.880900);
        // var mapOptions = {
        //   zoom: 13,
        //   center: myLatlng,
        //   scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        //   styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]
        //
        // }
        // var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //
        // var marker = new google.maps.Marker({
        //     position: myLatlng,
        //     title:"Hello World!"
        // });
        //
        // // To add the marker to the map, call setMap();
        // marker.setMap(map);
        var map;

        	var mapProp = {
            	center: new google.maps.LatLng(37.333347, -121.880850), //LLANDRINDOD WELLS
            	zoom: 15,
            	mapTypeId: google.maps.MapTypeId.ROADMAP
        	};

        	map = new google.maps.Map(document.getElementById("map"), mapProp);

            $.ajax({
                //The URL to process the request
                'url' : '192.168.0.28:8081/authentication/getUser',
                //The type of request, also known as the "method" in HTML forms
                //Can be 'GET' or 'POST'
                'type' : 'GET',
                //Any post-data/get-data parameters
                //This is optional
                'data' : {
                    'email' : 'm@m.com',
                    'token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1cmVyIiwiYXVkIjoiV29ybGQiLCJpYXQiOjE0OTM2MTk1MjY2NzksInJlcXVlc3QiOnsiZW1haWwiOiJtQG0uY29tIiwicGFzc3dvcmQiOiIxMjMiLCJvcmdhbml6YXRpb25wayI6MywidXNlcnR5cGUiOiJub3JtYWwgdXNlciIsInN0YXR1cyI6ImxvZ2dlZEluIn19.m68l7IDSuceORQ66yuj-I_BkV8tYTdjXWEszM5g9HDA'
                },
                //The response from the server
                'success' : function(data) {
                    //You can use any jQuery/JavaScript here!!!
                    alert('request sent!');
                }
            });


            //  $.getJSON(json, function(json1) {
        	var json1 = [
              {
                "complaintId": 1,
                "description": "Way nor furnished sir procuring therefore but. Warmth far manner myself active are cannot called. Set her half end girl rich met.",
                "lastUpdatedAt": 1090108800000,
                "reportedAt": -743472000000,
                "status": "Open",
                "epic": "woodard",
                "label": "8CfvdSQOXQ",
                "latitude": 37.333347,
                "longitude": -121.884850,
                "organizationPk": 273538,
                "reporter": 417951,
                "assignedTo": 932744
              },
              {
                "complaintId": 2,
                "description": "Way nor furnished sir procuring therefore but. Warmth far manner myself active are cannot called. Set her half end girl rich met.",
                "lastUpdatedAt": 1090108800000,
                "reportedAt": -743472000000,
                "status": "Open",
                "epic": "woodard",
                "label": "8CfvdSQOXQ",
                "latitude": 37.337347,
                "longitude": -121.884850,
                "organizationPk": 273538,
                "reporter": 417951,
                "assignedTo": 932744
              },
              {
                "complaintId": 3,
                "description": "Way nor furnished sir procuring therefore but. Warmth far manner myself active are cannot called. Set her half end girl rich met.",
                "lastUpdatedAt": 1090108800000,
                "reportedAt": -743472000000,
                "status": "Open",
                "epic": "woodard",
                "label": "8CfvdSQOXQ",
                "latitude": 37.333347,
                "longitude": -121.880850,
                "organizationPk": 273538,
                "reporter": 417951,
                "assignedTo": 932744
            }];

    		$.each(json1, function (key, data) {
            	var latLng = new google.maps.LatLng(data.latitude, data.longitude);

            	var marker = new google.maps.Marker({
                	position: latLng,
                	map: map,
                    title: data.complaintId
            	});

            	marker.setMap(map);
        	});
    },

	showNotification: function(from, align){
    	color = Math.floor((Math.random() * 4) + 1);

    	$.notify({
        	icon: "pe-7s-gift",
        	message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."

        },{
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
	}


}
