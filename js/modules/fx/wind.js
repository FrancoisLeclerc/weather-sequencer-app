var Tone = require("tone");

function wind(wind){
    var phaser = new Tone.Phaser({
	"frequency" : 15, 
	"depth" : 5, 
	"baseFrequency" : 1000
    }).toMaster();
    
    return phaser;
}

module.exports = wind;