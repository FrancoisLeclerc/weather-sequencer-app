require('./modules/wsui');
require('./modules/wsui-nx');

var getPosition = require("./modules/position-data");

//Load first the Google API Callback
window.initialize = function(){
    
    //// Load google library on search field
    var input = document.getElementById('searchTextField');
    var options = { types: ["(cities)"] };
    if (google) var autocomplete = new google.maps.places.Autocomplete(input,options);
    else alert("Google has not loaded properly");

    //// GEOLOCATION
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            var pos = { lat: position.coords.latitude, lng: position.coords.longitude };
            
            getPosition(pos);
        });
    }
}






//REFACTORE

//fetch location + weather

//loal sequencer 

//connect fx when weather fetched