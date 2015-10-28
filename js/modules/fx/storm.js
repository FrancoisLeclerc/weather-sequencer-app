// "nearestStormDistance":55, (In miles.)

//  new Tone.Distortion ([distortion])
// distortion {Number|Object}
// The amount of distortion (nominal range of 0-1)

var Tone = require("tone");

function stormFx(weather){
    
    var nearestStormDistance = weather.nearestStormDistance;
    console.log("nearestStormDistance: " + nearestStormDistance);

    var amount = 0;

    if (nearestStormDistance < 600 ) {
        amount = 100 / (nearestStormDistance + 1);
    }

    console.log("--distortion");
    console.log("amount: "+amount);
    
    var dist = new Tone.Distortion(amount);
    dist.wet.value = 0.35;
    // if (precipIntensity === 0) pingPong.wet.value=0;
    return dist;
}

module.exports = stormFx;