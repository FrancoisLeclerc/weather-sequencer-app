//functions that execute async operations

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
        });
    }
    else {
        $dfd.reject(new Error('API not available'));
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
            }
            // else {
            //     shake("#searchTextField");
            //     // shake(".btn-search");
            //     $("#searchTextField").val("").attr("placeholder","Invalid selection");
            // }
        },
        error: function(error) {
            $dfd.reject(error);
        }
    });

    return $dfd.promise();
}



function getWeather(pos) {

    var $dfd = $.Deferred();

    $.ajax({
        url: "https://api.forecast.io/forecast/9cefef474c591d3e1ae766e338942cd9/" + pos.lat + "," + pos.lng,
        dataType: "jsonp",
        success: function(forecastInfo) {

            var currentWeather = forecastInfo.currently;

            console.log(currentWeather);

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
}