var Tone = require("tone");
var instrument  = require("./modules/instrument");
var sampleSet = require("./modules/sampleSet");
var async = require("./modules/async-data");

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

var seqInstru = new instrument(sampleSet["default"]);
// weather = window.googleOnLoad = require("./modules/initialize");

Tone.Buffer.onload = function(){
    console.log("buffer loaded");
    instrumentLoaded = true;
}


async.getUserLatLong().then(function(userLatLong){
    
    async.getPosition().then(function(location){
        
    });
    
    async.getWeather().then(function(weather){
        
    });
})


//REFACTORE

//fetch location + weather

//loal sequencer 

//connect fx when weather fetched