//load fx
var wind = require("./fx/wind");
var rain = require("./fx/rain");

function applyFX(soundSource, weather){
    
    var soundSourceFX = soundSource
    .connect(wind())
    .connect(rain(weather))
    .toMaster();
    
    return soundSourceFX;
}

module.exports = applyFX;