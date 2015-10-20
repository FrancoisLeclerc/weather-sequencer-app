var Tone = require("tone");


function sequencerOutput(){
    
    var player = new Tone.Player("./audio/sample.mp3")

    return player;
}

module.exports = sequencerOutput;