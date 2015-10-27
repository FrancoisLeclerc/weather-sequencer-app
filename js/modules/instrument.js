var Tone = require("tone");
var rainFX = require("./fx/rain");
var humidityFX = require("./fx/humidity");
var visibilityFX = require("./fx/visibility");
var cloudFX = require("./fx/cloud");
var stormFX = require("./fx/storm");
var temperatureFX = require("./fx/temperature");



function Instrument(sampleSet) {
    
    this.toneSynth = new Tone.PolySynth(1, Tone.Sampler, sampleSet, {
    	"envelope" : {
    		"release" : 0.2
    	}
    })
    
    this.connectFX = function(weather) {
        
        //disconnect any existing effect
        this.toneSynth.disconnect();
        
        //change the bpm of Transport
        temperatureFX(weather);
        
        this.toneSynth.chain(
            rainFX(weather),
            // humidityFX(weather),
            visibilityFX(weather),
            cloudFX(weather),
            stormFX(weather),
            Tone.Master
        );
    }
    
    this.directToMaster = function() {
        this.toneSynth.toMaster();
    }
    
    this.loaded = $.Deferred().resolve();
}

module.exports = Instrument;