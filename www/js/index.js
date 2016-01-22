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
function init(){     
    myMap = new ymaps.Map("map", {
        center: [latitude, longitude],
        zoom: 15
    });
    myPlacemark = new ymaps.Placemark([latitude, longitude], { hintContent: 'Ваше местоположение', balloonContent: 'Ваше местоположение' });
    myMap.geoObjects.add(myPlacemark);
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

/*$("#from").keyup(function(){
    streetsList('from');
	var list='';
	$.each(res, function(index, value) {
		list+='<li role="option" tabindex="0" data-theme="a" class="ui-btn ui-li ui-btn-up-a"><div class="ui-btn-inner"><div class="ui-btn-text">'+value+'</div><span class="ui-icon ui-icon-arrow-r"></span></div></li>';
	});							
        $("#searchresult").html(list);	
});*/

/*var shuffle = function(o){ //v1.0
for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};*/
