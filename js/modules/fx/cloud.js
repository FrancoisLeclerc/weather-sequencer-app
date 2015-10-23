// LOWPASS FILTER-------------------------------------
// "cloudCover":0.6, (A numerical value between 0 and 1 (inclusive) representing the percentage of sky occluded by clouds.)

// 0 corresponds to clear sky
// 0.4 to scattered clouds
// 0.75 to broken cloud cover
// 1 to completely overcast skies.

//  new Tone.Filter ([frequency][, type][, rolloff])
// frequency {Frequency|Object}
// The cutoff frequency of the filter.
// type {string}
// The type of filter.
// rolloff {number}
// The drop in decibels per octave after the cutoff frequency. 3 choices: -12, -24, and -48


var Tone = require("tone");

function cloudFx(weather){
    
    var cloudCover = weather.cloudCover;
    console.log("cloudCover: " + cloudCover);

    var frequency = 44000;

    if (cloudCover >= 0.3){
        if (cloudCover < 0.4){
            frequency = 5000;
        }
        else if (cloudCover < 0.5){
            frequency = 4100;
        }
        else if (cloudCover < 0.6){
            frequency = 3200;
        }
        else if (cloudCover < 0.7){
            frequency = 2300;
        }
        else if (cloudCover < 0.8){
            frequency = 1400;
        }
        else {
            frequency = 500;
        }
    } 

    console.log("--low pass filter");
    console.log("frequency: "+frequency);
    
    var filter = new Tone.Filter(frequency, "lowpass");
    return filter;
}

module.exports = cloudFx;