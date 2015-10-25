var getPosition = require("./position-data");

function initialize() {
    var input = document.getElementById('searchTextField');
    var options = { types: ["(cities)"] };
    var autocomplete = new google.maps.places.Autocomplete(input,options);
    
    //// WHEN SCROLL IS AT END OF PAGE
    var scroll = true;
    $(window).on("scroll load", function() {
        if($(window).scrollTop() + $(window).height() >= $(document).height() - 100 && scroll) {
            scroll = false;
            //// INPUT ANIMATION
            // var widthInput = $(".input").width();
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
                    // $(".data").text("").append("<h2>Search for a city in the list.</h2>");
                });
            } else { 
                // $(".data").text("").append("<h2>Your browser doesn't support geolocation.</h2>"); 
                
            }
        }
    });
    
//     $(".input").on("click",".btn-search", function(){
//         var valueInput = $("#searchTextField").val();
//         var valueDial = [dial1,dial2,dial3,dial4,dial5,dial6,dial7];
//         for(var i = 0 ; i < valueDial.length ; i++){ valueDial[i].val.value = 0; }
//         getPosition(valueInput);
//     });
    
//     $('#searchTextField').on('keypress', function(e) {
//         var keyCode = e.keyCode;
//         if (keyCode === 13) {
//             var valueInput = $("#searchTextField").val();
//             var valueDial = [dial1,dial2,dial3,dial4,dial5,dial6,dial7];
//             for(var i = 0 ; i < valueDial.length ; i++){ valueDial[i].val.value = 0; }
//             getPosition(valueInput);
//         }
//     });
}

module.exports = initialize;