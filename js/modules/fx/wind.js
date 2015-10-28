// PHASER OR NOISE------------------------
// "windSpeed":10.74, (Miles per hour)

// new Tone.Noise (type)
// type {string}
// the noise type (white|pink|brown)

var Tone = require("tone");


function windFx(){
        
    var autoFilter = new Tone.AutoFilter({
    	"frequency" : "8m", 
    	"min" : 800, 
    	"max" : 10000
    }).toMaster();
    
    this.isOn = false;
    //initialize the noise and start
    this.noise = new Tone.Noise("pink");
    this.noise.volume.value = -60;

    this.noise.connect(autoFilter);
}

windFx.prototype = {
    setFx:function(weather){
        
        var wind = weather.windSpeed;
        console.log("wind: "+wind);
        
        var noiseVol = -60;
        
        if (wind > 10) {
            noiseVol = -25 + wind;
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
}

module.exports = windFx;