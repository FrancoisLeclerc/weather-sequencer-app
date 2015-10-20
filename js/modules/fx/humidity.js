// AUTOFILTER--------------------------------
// "humidity":0.7, (A numerical value between 0 and 1 (inclusive) representing the relative humidity.)

var Tone = require("tone");

function humidity(weather){
    
    var humidity = weather.humidity;
    console.log("humidity");
    console.log(humidity);
    var frequency = 0;

    if (humidity) {
        if (humidity <= 0.2){
            frequency = "1n";
        }
        else if (humidity <= 0.4){
            frequency = "2n";
        }
        else if (humidity <= 0.65){
            frequency = "4n";
        }
        else if (humidity <= 0.8){
            frequency = "8n";
        }
        else {
            frequency = "16n";
        }
    }

    var autoFilter = new Tone.AutoFilter(frequency).toMaster().start();
    return autoFilter;
}

module.exports = humidity;