var Tone = require("tone");

function instrument() {
    
    var instru = new Tone.PolySynth(4, Tone.Sampler, {
    	"A" : "./Audio/casio/A1.mp3",
    	"C#" : "./Audio/casio/Cs2.mp3",
    	"E" : "./Audio/casio/E2.mp3",
    	"F#" : "./Audio/casio/Fs2.mp3",
    }, {
    	"envelope" : {
    		"release" : 0.2
    	}
    })

    return instru;
}

module.exports = instrument;