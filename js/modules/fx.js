//load fx
var FXwind = require("./fx/wind");

function applyFX(soundSource){
    
    var soundSourceFX = soundSource
    .connect(FXwind())
    .toMaster();
    
    return soundSourceFX;
}

module.exports = applyFX;