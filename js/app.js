require("./modules/nexus/nexusUI");
var Tone = require("tone");
var Instrument  = require("./modules/instrument");
var sampleSet = require("./modules/sampleSet");
var async = require("./modules/async-data");
var loadSequencer = require("./modules/sequencer");
var ui = require("./modules/wsui");

//Load nexus component ui handlers
var nxReady = nx.onload = ui.nexusSetting;

//load google library Autocomplete
var input = document.getElementById('searchTextField');
var options = { types: ["(cities)"] };
var autocomplete = new google.maps.places.Autocomplete(input,options);

//Load start motion display
ui.mainDisplayMotion();

//global state variables
var weatherFetched = false;
var instrumentLoaded = false;


//start the app
var currentWeather;

var seqInstru = new Instrument(sampleSet["default"]);
// weather = window.googleOnLoad = require("./modules/initialize");

Tone.Buffer.onload = function(){
    console.log("buffer loaded");
    instrumentLoaded = true;
}

if (!weatherFetched) seqInstru.directToMaster();




// Fetch user location + weather then connect fx if successful
async.getUserLatLong().then(function(userLatLong){
    
    async.getPosition(userLatLong);
    
    async.getWeather(userLatLong).then(function(weather){
        
        currentWeather = weather;
        // console.log(currentWeather);
        weatherFetched = true;
        seqInstru.connectFX(weather);
        
        var $playButton = $("#toggle1");
        
        if ($playButton.isOnScreen()) {
            
            ui.motionDial(weather);
        }
        else {//if not currently on screen, add event to trigger when motion automatically
            
            var $window = $(window);
            $window.on("scroll load", function dialDisplayHandler() {
                if ($playButton.isOnScreen())
                {
                    ui.motionDial(weather);
                    $window.unbind("scroll load",dialDisplayHandler);
                }
            })        
        }
    });
})




//Load sequencer only when nx.onload has been called and instrument is created
$.when(nxReady,seqInstru.loaded).then(function(){
    loadSequencer(seqInstru);
})


