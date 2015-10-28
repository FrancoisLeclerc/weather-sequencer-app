require("./modules/nexus/nexusUI");
var Tone = require("tone");
var Instrument  = require("./modules/instrument");
var sampleSet = require("./modules/sampleSet");
var async = require("./modules/async-data");
var loadSequencer = require("./modules/sequencer");
var ui = require("./modules/wsui");
var testEncoder = require("./modules/encoder.js"); 
testEncoder();

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
var audioFilesLoaded = false;


//start the app
var currentWeather;

//create the instrument (async loading audio samples)
var seqInstru = new Instrument(sampleSet["default"]);

//
if (!weatherFetched) seqInstru.directToMaster();

//load search handlers with the instrument
//THIS MIGHT HAVE TO BE RELOAD IF INSTRUMENT SET CHANGE
ui.loadSearchHandlers(seqInstru);

//Load sequencer only when nx.onload has been called and instrument is created
$.when(nxReady,seqInstru.loaded).then(function(){
    loadSequencer(seqInstru);
    ui.loadPlayButtonHandler(seqInstru);
})

//
Tone.Buffer.onload = function(){
    console.log("buffer loaded");
    audioFilesLoaded = true;
}


// Fetch user location + weather then connect fx if successful
async.getUserLatLong().then(function(userLatLong){
    
    async.getPosition(userLatLong);
    
    async.getWeather(userLatLong).then(function(weather){

        weatherFetched = true;
        currentWeather = weather;
        seqInstru.connectFX(weather);
        ui.dialMotionLauncher(weather);
    });
})
