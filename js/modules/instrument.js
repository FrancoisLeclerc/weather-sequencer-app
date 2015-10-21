var Tone = require("tone");

function instrument() {
    
    var instru = new Tone.PolySynth(8, Tone.Sampler, {
        "kick" : "./Audio/drum/kick.mp3",
        "snare" : "./Audio/drum/snare.mp3",
        "hihat" : "./Audio/drum/hihat.mp3",
        "tom" : "./Audio/drum/tom.mp3",
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