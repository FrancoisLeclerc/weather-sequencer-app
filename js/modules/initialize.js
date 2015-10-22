var getPosition = require("./position-data");

var widthInput = $(".input").width() - $(".btn-search").width() - 21;

$("#searchTextField").animate({width: widthInput+"px"}, {queue: false,duration: 1000 });

$(window).on("resize",function(){
   $('#searchTextField').css("width",$(".input").width() - $(".btn-search").width() - 21+"px");
});

nx.onload = function() {
    var dialResponsivity = [dial1,dial2,dial3,dial4,dial5,dial6,dial7];
    for(var i = 0 ; i < 7 ; i++){ dialResponsivity[i].responsivity = 0; }
    nx.colorize("#6666ff");
    nx.colorize("fill", "#ddd");
};

function initialize() {
    var input = document.getElementById('searchTextField');
    var options = { types: ["(cities)"] };
    var autocomplete = new google.maps.places.Autocomplete(input,options);
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            var pos = { lat: position.coords.latitude, lng: position.coords.longitude };
            getPosition(pos);
        }, function(){
            $(".data").text("").append("<h2>Search for a city in the list.</h2>");
        });
    } else { $(".data").text("").append("<h2>Your browser doesn't support geolocation.</h2>"); }
    
    $(".input").on("click",".btn-search", function(){
        var valueInput = $("#searchTextField").val();
        var valueDial = [dial1,dial2,dial3,dial4,dial5,dial6,dial7];
        for(var i = 0 ; i < valueDial.length ; i++){ valueDial[i].val.value = 0; }
        getPosition(valueInput);
    });
    
    $('#searchTextField').on('keypress', function(e) {
        var keyCode = e.keyCode;
        if (keyCode === 13) {
            var valueInput = $("#searchTextField").val();
            var valueDial = [dial1,dial2,dial3,dial4,dial5,dial6,dial7];
            for(var i = 0 ; i < valueDial.length ; i++){ valueDial[i].val.value = 0; }
            getPosition(valueInput);
        }
    });
}

module.exports = initialize;