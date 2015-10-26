var Tone = require("tone");


function instrument(sampleSet) {
    
    this.toneSynth = new Tone.PolySynth(8, Tone.Sampler, sampleSet, {
    	"envelope" : {
    		"release" : 0.2
    	}
    })
    
    this.connectFX = function(weather) {
        //this.instrument.chain(fx,fx,fx,Tone.Master)
        console.log("connectFX to define");
    }
}

module.exports = instrument;