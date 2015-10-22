var getPosition = require("./position-data");

function initialize() {
    var $info = $(".info");
    // $info.append('<input id="searchTextField" type="text" placeholder="Search for another city"><button class="btn-search">Go</button>');
    $("#searchTextField").animate({width: "80%"}, {queue: false,duration: 1000 });
    
    var input = document.getElementById('searchTextField');
    var options = { types: ["(cities)"] };
    var autocomplete = new google.maps.places.Autocomplete(input,options);
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            getPosition(pos);
            
        }, function(){
            $info.append("<p>Error: The geolocation service failed.</p>");
        });
    } else {
        $info.append("<p>Error: Your browser doesn't support geolocation.</p>");
    }
    
    $(".input").on("click",".btn-search", function(){
        var value = $("#searchTextField").val();
        dial1.val.value = 0;
        dial2.val.value = 0;
        dial3.val.value = 0;
        dial4.val.value = 0;
        dial5.val.value = 0;
        dial6.val.value = 0;
        dial7.val.value = 0;
        getPosition(value);
    });
    
    $('#searchTextField').on('keypress', function(e) {
        var keyCode = e.keyCode;
        if (keyCode === 13) {
            var value = $("#searchTextField").val();
            getPosition(value);
        }
    });
}

module.exports = initialize;