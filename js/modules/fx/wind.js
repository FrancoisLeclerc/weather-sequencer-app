// PHASER OR NOISE------------------------
// "windSpeed":10.74, (Miles per hour)

//  new Tone.Noise (type)
// type {string}
// the noise type (white|pink|brown)


var Tone = require("tone");

function windFx(weather){
    
    var wind = weather.wind;
    console.log("wind: "+wind);
    
    var noiseVol = -60;
    
    if (wind > 5) noiseVol = -20;
    
    //initialize the noise and start
    var noise = new Tone.Noise("pink").start();
    
    console.log("noiseVol: " + noiseVol);
    noise.volume.value = noiseVol;
    
    var autoFilter = new Tone.AutoFilter({
    	"frequency" : "8m", 
    	"min" : 800, 
    	"max" : 10000
    }).connect(Tone.Master);
    
    //connect the noise
    noise.connect(autoFilter);
    //start the autofilter LFO
    
    //the autoFilter has to be started afterwards to output a signal
    return autoFilter;
}

module.exports = windFx;