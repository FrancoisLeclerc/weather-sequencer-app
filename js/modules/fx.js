//load fx
var Tone = require("tone");

// var windFX = require("./fx/wind");
var rainFX = require("./fx/rain");
var humidityFX = require("./fx/humidity");
var visibilityFX = require("./fx/visibility");
var cloudFX = require("./fx/cloud");

function connectFX(instrument, weather){
    return instrument.chain(
    rainFX(weather),
    humidityFX(weather),
    visibilityFX(weather),
    cloudFX(weather),
    Tone.Master
    );
}

module.exports = connectFX;