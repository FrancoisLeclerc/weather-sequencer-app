var Tone = require("tone");

function sequencerOutput(){
    var player = new Tone.Player("./audio/sample.mp3").toMaster();
    Tone.Buffer.onload = function(){
    	player.start();
    }    
}

module.exports = sequencerOutput;