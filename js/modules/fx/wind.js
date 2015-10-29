// PHASER OR NOISE------------------------
// "windSpeed":10.74, (Miles per hour)

// new Tone.Noise (type)
// type {string}
// the noise type (white|pink|brown)

var Tone = require("tone");


function windFx(){
        
    this.autoFilter = new Tone.AutoFilter({
    	"frequency" : "1n", 
    	"min" : 700, 
    	"max" : 900
    });
    
    this.isOn = false;
    //initialize the noise and start
    this.noise = new Tone.Noise("pink");
    this.noise.volume.value = -60;
    
    this.autoFilter.start();
    this.noise.chain(this.autoFilter,Tone.Master);
}

windFx.prototype = {
    setFx:function(weather){
        
        var wind = weather.windSpeed;
        console.log("wind: "+wind);
        
        var noiseVol = -60;
        
        if (wind > 0) {
            noiseVol = -20 + wind;
            this.isOn = true;
            if (Tone.Transport.state === "started") this.noise.start();
        }
        else {
            if (Tone.Transport.state === "started") this.noise.stop();
            this.isOn = false;
        }
        
        this.noise.volume.value = noiseVol;
        console.log("noiseVol: " + this.noise.volume.value);
    }
};

module.exports = windFx;