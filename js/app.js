$(document).foundation();
var Tone = require("tone");
var applyFX = require("./modules/fx");

var sequencerOutput = require("./modules/sequencer-engine");


var soundSource = sequencerOutput();

var master = applyFX(soundSource);

master.volume.value = -15;

Tone.Buffer.onload = function(){
    master.start();
};


