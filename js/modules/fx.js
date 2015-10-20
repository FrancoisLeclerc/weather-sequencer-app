//load fx
var wind = require("./fx/wind");
var rain = require("./fx/rain");
var humidity = require("./fx/humidity");

function applyFX(soundSource, weather){
    
    var soundSourceFX = soundSource
    .connect(wind())
    .connect(rain(weather))
    .connect(humidity(weather))
    .toMaster();
    
    return soundSourceFX;
}

module.exports = applyFX;