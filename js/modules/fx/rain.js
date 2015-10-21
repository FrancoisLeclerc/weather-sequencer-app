var Tone = require("tone");

function rain(weather){
    
    var precipIntensity = weather.precipIntensity;
    var precipProbability = weather.precipProbability;
    console.log("precipIntensity");
    console.log(precipIntensity);
    console.log("precipProbability");
    console.log(precipProbability);
    var delayTime = 0;
    var feedback = 0;
    
    if (precipIntensity) {
        if (precipIntensity <= 0.002){
            delayTime = "1n";
        }
        else if (precipIntensity <= 0.017){
            delayTime = "2n";
        }
        else if (precipIntensity <= 0.002){
            delayTime = "4n";
        }
        else if (precipIntensity <= 0.1){
            delayTime = "8n";
        }
        else {
            delayTime = "16n";
        }
    }

    if (precipProbability) feedback = precipProbability;
    
    var pingPong = new Tone.PingPongDelay(delayTime, feedback).toMaster();
    return pingPong;
}

module.exports = rain;