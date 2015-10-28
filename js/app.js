window.$ = window.jQuery = require("jquery");
require("./modules/nexus/nexusUI");
var Tone = require("tone");
var Instrument  = require("./modules/instrument");
var sampleSet = require("./modules/sampleSet");
var async = require("./modules/async-data");
var loadSequencer = require("./modules/sequencer");
var ui = require("./modules/wsui");
var g = require("./modules/current-env");
    
//Define the nx.onload callback
nx.onload = ui.nexusSetting;

//Load start motion display
ui.mainDisplayAnimation();

//create the instrument (async loading audio samples)
g.setInstru(new Instrument(sampleSet["default"]));

//change the track names in the interface
ui.displayTrackNames(g.getInstru());

//load search handlers
ui.loadSearchHandlers();

//Load sequencer only when nx.onload has been called and instrument is created

ui.$nxReady.then(function(){
    loadSequencer(g.getInstru());
    ui.loadPlayButtonHandler();
});

// Fetch user location + weather then connect fx if successful
async.getUserLatLong().then(function(userLatLong){
    
    async.getPosition(userLatLong);
    
    async.getWeather(userLatLong).then(function(weather){
        
        g.getInstru().connectFX(weather);
        
        ui.$nxReady.then(function(){
            ui.dialAnimationLauncher(weather);
        });
    });
})


//load google library Autocomplete
var input = document.getElementById('searchTextField');
var options = { types: ["(cities)"] };
var autocomplete = new google.maps.places.Autocomplete(input,options);