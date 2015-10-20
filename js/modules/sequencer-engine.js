var Tone = require("tone");

//load fx
var FXwind = require("./fx/wind");

function sequencerOutput(){
    
    var player = new Tone.Player("./audio/sample.mp3")
    .connect(FXwind())
    .toMaster();
    Tone.Buffer.onload = function(){
    	player.start();
    }    
    
}

module.exports = sequencerOutput;