window.$ = window.jQuery = require("jquery");
require("./modules/nexus/nexusUI");
var Tone = require("tone");
var Instrument  = require("./modules/instrument");
var sampleSet = require("./modules/sampleSet");
var async = require("./modules/async-data");
var loadSequencer = require("./modules/sequencer");
var ui = require("./modules/wsui");

//Define the nx.onload callback
nx.onload = ui.nexusSetting;

//Load start motion display
ui.mainDisplayAnimation();

//create the instrument (async loading audio samples)
var seqInstru = new Instrument(sampleSet["default"]);

seqInstru.directToMaster();

//load search handlers with the instrument
//THIS MIGHT HAVE TO BE RELOAD IF INSTRUMENT SET CHANGE
ui.loadSearchHandlers(seqInstru);

//Load sequencer only when nx.onload has been called and instrument is created

ui.$nxReady.then(function(){
    loadSequencer(seqInstru);
    ui.loadPlayButtonHandler(seqInstru);
});

// Fetch user location + weather then connect fx if successful
async.getUserLatLong().then(function(userLatLong){
    
    async.getPosition(userLatLong);
    
    async.getWeather(userLatLong).then(function(weather){
        
        seqInstru.connectFX(weather);
        
        ui.$nxReady.then(function(){
            ui.dialAnimationLauncher(weather);
        });
    });
})


//load google library Autocomplete
var input = document.getElementById('searchTextField');
var options = { types: ["(cities)"] };
var autocomplete = new google.maps.places.Autocomplete(input,options);