// AUTOFILTER--------------------------------
// "humidity":0.7, (A numerical value between 0 and 1 (inclusive) representing the relative humidity.)

var Tone = require("tone");

function humidityFx(weather){
    
    var humidity = weather.humidity;
    console.log("humidity: "+humidity);
    var roomSize = 0;

    // if (humidity) {
    //     if (humidity <= 0.2){
    //         frequency = "1n";
    //     }
    //     else if (humidity <= 0.4){
    //         frequency = "2n";
    //     }
    //     else if (humidity <= 0.65){
    //         frequency = "4n";
    //     }
    //     else if (humidity <= 0.8){
    //         frequency = "8n";
    //     }
    //     else {
    //         frequency = "16n";
    //     }
    // }
    
    roomSize = humidity * 0.5;
    
    console.log("--reverb");
    console.log("roomSize: "+roomSize);
    var reverb = new Tone.Freeverb(roomSize);
    // reverb.dampening.value = 5000;
    if (roomSize < 0.2) reverb.wet.value=0;
    return reverb;
    // var autoFilter = new Tone.AutoFilter(frequency);
    // return autoFilter;
}

module.exports = humidityFx;