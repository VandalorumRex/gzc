/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var myMap, myMap3, longitude, latitude, myPlacemark, myPlacemark2;
var choices;
/*var street = document.querySelector('.street');;
street.addEventListener('keyup',function(event){
        streetsList(this.id);
});*/
$.post('http://gazel.mansur.ml?func=towns',{},
          function(towns){
            $("#town").html(towns).selectmenu('refresh', true);
            
});
function init(map_id, json){     
    
    if (map_id=='map_1') {
            myMap = new ymaps.Map(map_id, {
            center: [latitude, longitude],
            zoom: 15
        });
        myPlacemark = new ymaps.Placemark([latitude, longitude], { hintContent: 'Ваше местоположение', balloonContent: 'Ваше местоположение' });
        myMap.geoObjects.add(myPlacemark);
    }
    if (map_id=='map_3') {
        latitude = (json.stengara.latitude*1 + json.stenga.latitude*1)*0.5;
        longitude = (json.stengara.longitude*1 + json.stenga.longitude*1)*0.5;
        var ayrma = Math.abs(json.stengara.latitude - json.stenga.latitude)
        //var zoom = 0.4 / ayrma ; alert(latitude+","+longitude+','+zoom);
        myMap3 = new ymaps.Map(map_id, {
            center: [latitude, longitude],
            zoom: 11
        });
        //alert (json.stengara.latitude);
        myPlacemark = new ymaps.Placemark([json.stengara.latitude, json.stengara.longitude], { hintContent: 'Откуда', balloonContent: 'Откуда' });
        myMap3.geoObjects.add(myPlacemark);
        myPlacemark2 = new ymaps.Placemark([json.stenga.latitude, json.stenga.longitude], { hintContent: 'Куда', balloonContent: 'Куда' });
        myMap3.geoObjects.add(myPlacemark2);
    }
}

function google_map_init() {
      navigator.geolocation.getCurrentPosition(function(location) {						
		var point = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
		var myOptions = {
			zoom: 13,
			center: point,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map"),myOptions);
		var marker = new google.maps.Marker({position: point,map: map});						
		google.maps.event.addListener(marker, 'click', function() {
			alert("Current coodinates are: latitude "+location.coords.latitude+", longitude "+location.coords.longitude);
		});
	});	  
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents(); 
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
        
    }
};

function streetsList(id){
    //var id = this.id;
    var uram = document.getElementById(id).value; //alert(uram);
    if (uram.length>2) {
        var params = "street="+uram; //alert(params);
        send_post("http://gazel.mansur.ml/index.php",params,function(data){
            //choices = JSON.parce(data);
            document.getElementById('streets').innerHTML = data;
            alert(data);
            //var d = document.createElement('div');
            
        });
    } 
}

function send_post(url,params,func){
    var http = new XMLHttpRequest();
    //var url = "get_data.php";
    //var params = "lorem=ipsum&name=binny";
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Content-length", params.length);
    http.setRequestHeader("Connection", "close");

    http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState === 4 && http.status === 200) {
                    //alert(http.responseText);
                    func(http.responseText);
            }

    };
    http.send(params);
}
$('#phone').live('keyup',function(event){
   this.value = this.value.replace(/[^\d\.]/g, '');
   this.value = this.value.substr(0,10);
});
$('#begin').live('click',function(){
    var params = 'user_login='+$('#phone').val()+'&name='+$('#name').val()+'&town='+$('#town').val();
    send_post('http://gazel.mansur.ml?func=enter',params,function(uid){
        $('#client_id').val(uid); //alert(uid);
    });
});

$('#order').live('click',function(){
    /*var params = 'from_='+$('#from_').val()+'&to_='+$('#to_').val()+
        '&date='+$('#date').val()+'&time='+$('#time').val()+'&car_type='+$('#car_type').val()+
        '&price='+$('#price').val()+'&loaders='+$('#loaders').val(); //alert(params);*/
    var params = {
      'from_' : $('#from_').val(),
      'to_' : $('#to_').val(),
      'date' : $('#date').val(),
      'time' : $('#time').val(),
      'car_type' : $('#car_type').val(),
      'order_id' : $('#order_id').val(),
      'client_id' : $('#client_id').val()
    }
    $.post('http://gazel.mansur.ml?func=new_order',params,function(response){
        var json = JSON.parse(response);
        $('#order_id').val(json.order_id); 
        ymaps.ready(init('map_3',json));
    });
});
$("#mainPage").bind("pageshow", function(e) {
    navigator.geolocation.getCurrentPosition(
        function(position){
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            ymaps.ready(init('map_1',[]));
            //google_map_init();
            //alert(longitude);
            //streetsList(); 
        },
        function(error){
    });
});
$("#page-2").bind("pageshow", function(e) {
    $("#from_").autocomplete(searchStreet("#from_"));
    $("#to_").autocomplete(searchStreet("#to_"));
});

function searchStreet(inp){
    return {
				target: $(inp+'list'),
				source: 'http://gazel.mansur.ml?func=streets',
				//link: 'target.html?term=',
                callback: function(e) {
					var $a = $(e.currentTarget);
					$(inp).val( $a.text() );
					$(inp).autocomplete('clear');
				},
				
				minLength: 3,
				matchFromStart: false
    }
}

$("#page-3").bind("pageshow", function(e) {
    
});