var Tone = require("tone");

function sequencerOutput(){
    var player = new Tone.Player("./path/to/sample.mp3").toMaster();
    Tone.Buffer.onload = function(){
    	player.start();
    }    
}

module.exports = sequencerOutput;