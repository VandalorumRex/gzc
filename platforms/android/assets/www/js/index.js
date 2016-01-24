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


var myMap, longitude, latitude, myPlacemark;
var choices;
/*var street = document.querySelector('.street');;
street.addEventListener('keyup',function(event){
        streetsList(this.id);
});*/
$.post('http://gazel.mansur.ml?func=towns',{},
          function(towns){
            $("#town").html(towns).selectmenu('refresh', true);
            
});
function init(){     
    myMap = new ymaps.Map("map", {
        center: [latitude, longitude],
        zoom: 15
    });
    myPlacemark = new ymaps.Placemark([latitude, longitude], { hintContent: 'Ваше местоположение', balloonContent: 'Ваше местоположение' });
    myMap.geoObjects.add(myPlacemark);
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
        
        navigator.geolocation.getCurrentPosition(
            function(position){
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                ymaps.ready(init);
                //google_map_init();
                //alert(longitude);
                //streetsList(); 
            },
            function(error){
        });
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
        $('#uid').val(uid);
    });
});

$('#order').live('click',function(){
    var params = 'from='+$('#from').val()+'&to='+$('#to').val()+
        '&date='+$('#date').val()+'&time='+$('#time').val()+
        '&price='+$('#price').val()+'&loaders='+$('#loaders').val();
    send_post('http://gazel.mansur.ml?func=new_order',params,function(oid){
        $('#order_id').val(uid);
    });
});