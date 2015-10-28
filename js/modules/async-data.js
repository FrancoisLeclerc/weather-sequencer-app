//functions that execute async operations
var g = require("./current-env");


//get position of user from his browser
function getUserLatLong() {
    var $dfd = $.Deferred();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            $dfd.resolve(pos);
        },function(){
            $("#searchTextField").val("").attr("placeholder","Select a location");
        });
    }
    else {
        $dfd.reject(new Error('API not available'));
        $("#searchTextField").val("").attr("placeholder","Select a location");
    }

    return $dfd.promise();
}



//get city of a given location as a string for the search bar or as an object from getUserLatLong{lat:xx, lng:yy}
function getPosition(data) {

    var $dfd = $.Deferred();
    var middleUrl = '';
    var x = 0;
    
    if (typeof data === "string") {
        middleUrl = "address=" + data;
        x = 0;
    }
    else {
        middleUrl = "latlng=" + data.lat + "," + data.lng;
        x = 4;
    }

    var url = "https://maps.googleapis.com/maps/api/geocode/json?" + middleUrl + "&key=AIzaSyDmk5AKVdNHYCjGEv-UeAK0LOaiiCGP_DE";

    $.ajax({
        url: url,
        datatype: "jsonp",
        success: function(city) {
            if (city.status === "OK") { // && ( typeof data === "object" || data.toLowerCase() === city.results[x].formatted_address.toLowerCase() || data.toLowerCase() === city.results[x].address_components[0].long_name.toLowerCase())) {
                var position = city.results[0].geometry.location;
                $("#searchTextField").val(city.results[x].formatted_address);
                $dfd.resolve(position);
            }
            else {
                $dfd.reject(new Error("An error has occurred: location cannot be found"));
                shake("#searchTextField");
                $("#searchTextField").val("").attr("placeholder","Invalid selection");
            }
        },
        error: function(error) {
            $dfd.reject(error);
        }
    });

    return $dfd.promise();
}


//// Shake animation custom
function shake(div){                                                                                                                                                                                            
   var interval = 100;                                                                                                 
   var distance = -10;                                                                                                  
   var times = 4;                                                                                                      

   $(div).css('position','relative');                                                                                  
   for(var iter=0;iter<(times+1);iter++){                                                                              
       $(div).animate({ 
           left:((iter%2==0 ? distance : distance+15))
           },interval);                                   
   }                                                                                                             
   $(div).animate({ left: 0},interval);                                                                                
}

function getWeather(pos) {

    var $dfd = $.Deferred();

    $.ajax({
        url: "https://api.forecast.io/forecast/9cefef474c591d3e1ae766e338942cd9/" + pos.lat + "," + pos.lng,
        dataType: "jsonp",
        success: function(forecastInfo) {

            var currentWeather = forecastInfo.currently;

            g.setWeather(currentWeather);
            //console.log(currentWeather);

            $dfd.resolve(currentWeather);
        },
        error: function(error) {
            $dfd.reject(error);
        }
    });

    return $dfd.promise();
}



module.exports = {
    getUserLatLong: getUserLatLong,
    getPosition: getPosition,
    getWeather: getWeather
};