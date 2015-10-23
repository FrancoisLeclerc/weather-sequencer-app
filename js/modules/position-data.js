var getWeather = require("./weather-data");

function getPosition(data){
    if(typeof data === "string") { var middleUrl = "address="+data; var x = 0; }
    else { middleUrl = "latlng="+data.lat+","+data.lng; x = 4; }
    
    var url = "https://maps.googleapis.com/maps/api/geocode/json?"+middleUrl+"&key=AIzaSyDmk5AKVdNHYCjGEv-UeAK0LOaiiCGP_DE";

    $.ajax({
        url: url,
        datatype: "jsonp",
        success: function(city){
            if(city.status === "OK" && ( typeof data === "object" || data.toLowerCase() === city.results[x].formatted_address.toLowerCase() || data.toLowerCase() === city.results[x].address_components[0].long_name.toLowerCase())) {
                var position = city.results[0].geometry.location;
                $("#searchTextField").val(city.results[x].formatted_address);
                getWeather(position);
            } else {
                shake("#searchTextField");
                shake(".btn-search");
                $("#searchTextField").val("").attr("placeholder","Please select a city from the list");
            }
        }
    });
}

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

module.exports = getPosition;