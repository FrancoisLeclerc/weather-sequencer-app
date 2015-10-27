// -------------------BPM
// "temperature":55.25, (In F)
// "apparentTemperature":55.25, (In F)

// Temperature is affecting the bpm directly on the Transport


var Tone = require("tone");

function temperature(weather){
    var tempF = weather.temperature;
    
    var tempC = (tempF - 32)/1.8;
    console.log("tempC: "+tempC);
    
    var newBPM = 120;

    if (tempC < -30) {
        newBPM = 150;
    }
    else if (tempC < -20){
        newBPM = 142
    }
    else if (tempC < -15){
        newBPM = 134
    }
    else if (tempC < -10){
        newBPM = 126
    }
    else if (tempC < -5){
        newBPM = 119
    }
    else if (tempC < 5){
        newBPM = 112
    }
    else if (tempC < 10){
        newBPM = 105
    }
    else if (tempC < 15){
        newBPM = 98
    }
    else if (tempC < 20){
        newBPM = 91
    }
    else if (tempC < 25){
        newBPM = 84
    }
    else if (tempC < 30){
        newBPM = 77
    }
    else {
        newBPM = 70;
    }
    
    console.log("--BPM: "+newBPM);
    
    Tone.Transport.bpm.value = newBPM;
    return newBPM;
}

module.exports = temperature;