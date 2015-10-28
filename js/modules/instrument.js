var Tone = require("tone");
var rainFX = require("./fx/rain");
var humidityFX = require("./fx/humidity");
var visibilityFX = require("./fx/visibility");
var cloudFX = require("./fx/cloud");
var stormFX = require("./fx/storm");
var temperatureFX = require("./fx/temperature");
var windFx = require("./fx/wind");



function Instrument(sampleSet) {

    this.BPM = 120;
    this.wind = new windFx();
    this.toneSynth = new Tone.PolySynth(1, Tone.Sampler, sampleSet, {
                    	"envelope" : {
                    		"release" : 0.2
                    	}
                    })
    
    this.fxOn = false;
    this.connectFX = function(weather) {
        //windFx
        this.wind.setFx(weather);

        //disconnect any existing effect
        this.toneSynth.disconnect();
        
        //change the bpm of Transport
        this.BPM = temperatureFX(weather);
        
        //all other fx are regular ones to chain between the instrument and the Master
        this.toneSynth.chain(
            rainFX(weather),
            // humidityFX(weather),
            visibilityFX(weather),
            cloudFX(weather),
            stormFX(weather),
            Tone.Master
        );
        
        this.fxOn = true;
    }
    
    this.disconnectFX = function(){
        this.toneSynth.disconnect();
        this.wind.noise.stop();
    }
    this.directToMaster = function() {
        this.toneSynth.toMaster();
    }
}

module.exports = Instrument;