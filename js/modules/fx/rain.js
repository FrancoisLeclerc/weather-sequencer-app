var Tone = require("tone");

function rainFx(weather){
    
    var precipIntensity = weather.precipIntensity;
    var precipProbability = weather.precipProbability;
    console.log("precipIntensity: " + precipIntensity);
    console.log("precipProbability: " + precipProbability);

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
    
    console.log("--pingPong");
    console.log("delayTime: "+delayTime);
    console.log("feedback: "+feedback);
    
    var pingPong = new Tone.PingPongDelay(delayTime, feedback);
    return pingPong;
}

module.exports = rainFx;