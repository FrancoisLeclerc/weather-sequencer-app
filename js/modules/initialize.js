var getPosition = require("./position-data");

function initialize() {
    var input = document.getElementById('searchTextField');
    var options = { types: ["(cities)"] };
    var autocomplete = new google.maps.places.Autocomplete(input,options);
    
    //// WHEN SCROLL IS AT END OF PAGE(-100)
    var scroll = true; //USED TO ONLY USE SCROLLING ONCE
    $(window).on("scroll load", function() {
        if($(window).scrollTop() + $(window).height() >= $(document).height() - 100 && scroll) {
            scroll = false;
            //// INPUT ANIMATION
            $("#searchTextField").animate({width: "100%"}, {queue: false,duration: 1000 });
            //// 2ND TITLE ANIMATION
            $( ".title h1" ).animate({opacity: 1},{queue: false, duration: 2000});
            //// TRACK NAMES ANIMATION
            for(var i = 0 ; i <= 8 ; i++){
                var duration = Math.floor(Math.random() * 1001) + 2000;
                $( ".track-names p:nth-child("+i+")" ).animate({opacity: 1},{queue: false, duration: duration});
            }
            //// GEOLOCATION
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    var pos = { lat: position.coords.latitude, lng: position.coords.longitude };
                    getPosition(pos);
                }, function(){
                    $("#searchTextField").val("").attr("placeholder","Select a city from the list");
                });
            } else { 
                alert("Your browser doesn't support geolocation!"); 
            }
        }
    });
}

module.exports = initialize;