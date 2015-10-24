var getPosition = require("./position-data");

function initialize() {
    var input = document.getElementById('searchTextField');
    var options = { types: ["(cities)"] };
    var autocomplete = new google.maps.places.Autocomplete(input,options);
    
    //// WHEN SCROLL IS AT END OF PAGE
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() === $(document).height()) {
            //// INPUT ANIMATION
            var widthInput = $(".input").width() - $(".btn-search").width() - 50;
            $("#searchTextField").animate({width: widthInput+"px"}, {queue: false,duration: 1000 });
            
            //// GEOLOCATION
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    var pos = { lat: position.coords.latitude, lng: position.coords.longitude };
                    getPosition(pos);
                }, function(){
                    $(".data").text("").append("<h2>Search for a city in the list.</h2>");
                });
            } else { $(".data").text("").append("<h2>Your browser doesn't support geolocation.</h2>"); }
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