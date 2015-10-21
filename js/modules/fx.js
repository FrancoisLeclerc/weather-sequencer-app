//load fx
var wind = require("./fx/wind");
var rain = require("./fx/rain");
var humidity = require("./fx/humidity");

function connectFX(instrument, weather){
    
    var intrumentWithFX = instrument
    .connect(wind())
    .connect(rain(weather))
    .connect(humidity(weather))
    
    return intrumentWithFX;
}

module.exports = connectFX;