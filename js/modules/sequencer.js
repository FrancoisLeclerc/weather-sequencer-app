var Tone = require("tone");


function sequencer(instrument){

//keep track of steps and notes
var stepNumber = 0;
var noteNames = ["A", "C#", "E", "F#"];


//the repeated callback
Tone.Transport.setInterval(function(time){
	// get the notes at the step
	var column = matrix1.matrix[stepNumber];
	for (var i = 0; i < 4; i++){
		if (column[i] === 1){
		}
	}
	stepNumber++;
	stepNumber = stepNumber % 16;
}, "16n");


//transport settings
Tone.Transport.loopEnd = "1m";
Tone.Transport.loop = true;
Tone.Transport.start();

}

module.exports = sequencer;