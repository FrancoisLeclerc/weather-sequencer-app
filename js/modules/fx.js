//load fx
var Tone = require("tone");

// var windFX = require("./fx/wind");
var rainFX = require("./fx/rain");
var humidityFX = require("./fx/humidity");
var visibilityFX = require("./fx/visibility");
var cloudFX = require("./fx/cloud");
var stormFX = require("./fx/storm");
var temperatureFX = require("./fx/temperature");


function connectFX(instrument, weather){
    
    //change the bpm of the Transport
    temperatureFX(weather);
    
    return instrument.chain(
    rainFX(weather),
    // humidityFX(weather),
    visibilityFX(weather),
    cloudFX(weather),
    stormFX(weather),
    Tone.Master
    );
}

module.exports = connectFX;