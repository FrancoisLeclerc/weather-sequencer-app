$(document).foundation();

window.initialize = require("./modules/initialize");

var Tone = require("tone");
var connectFX = require("./modules/fx");
var sequencer = require("./modules/sequencer");
var instrument = require("./modules/instrument");

//weather test example
var weather = {
    "time":1445351823,
    "summary":"Mostly Cloudy",
    "icon":"partly-cloudy-day",
    "nearestStormDistance":55,
    "nearestStormBearing":186,
    "precipIntensity":0.05,
    "precipProbability":0.5,
    "temperature":55.25,
    "apparentTemperature":55.25,
    "dewPoint":45.73,
    "humidity":0.7,
    "windSpeed":10.74,
    "windBearing":242,
    "visibility":10,
    "cloudCover":0.6,
    "pressure":1013.74,
    "ozone":284.23
};


// first we create an instrument
var instru = instrument();

// then we connect the instrument to the effects
var intrumentWithFX = connectFX(instru,weather);

// then we call the sequencer to trigger a signal 
sequencer(instru);

// then we connect the instrument + effect to the master Output
intrumentWithFX.toMaster();