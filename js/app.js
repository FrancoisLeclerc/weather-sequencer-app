require("./modules/nexus/nexusUI");
var Tone = require("tone");
var Instrument  = require("./modules/instrument");
var sampleSet = require("./modules/sampleSet");
var async = require("./modules/async-data");
var loadSequencer = require("./modules/sequencer");
var ui = require("./modules/interface");

//Load nexus component ui handlers
var nxReady = nx.onload = ui.nexusSetting;

require('./modules/interface');

//load google library Autocomplete
var input = document.getElementById('searchTextField');
var options = { types: ["(cities)"] };
var autocomplete = new google.maps.places.Autocomplete(input,options);



//state variables
var weatherFetched = false;
var instrumentLoaded = false;




//start the app
var weather = {};

var seqInstru = new Instrument(sampleSet["default"]);
// weather = window.googleOnLoad = require("./modules/initialize");

Tone.Buffer.onload = function(){
    console.log("buffer loaded");
    instrumentLoaded = true;
}

if (!weatherFetched) seqInstru.directToMaster();




// Fetch user location + weather then connect fx if successful
async.getUserLatLong().then(function(userLatLong){
    
    // console.log(userLatLong);
    async.getPosition(userLatLong).then(function(location){
        
    });
    
    async.getWeather(userLatLong).then(function(weather){
        weatherFetched = true;
        seqInstru.connectFX(weather);
    });
})




//Load sequencer only when nx.onload has been called and instrument is created
$.when(nxReady,seqInstru.loaded).then(function(){
    loadSequencer(seqInstru);
})

