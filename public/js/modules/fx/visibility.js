// CHORUS-----------------------------------
// "visibility":10, (In miles, max 10)


// Tone.js
// Chorus → Tone.StereoXFeedbackEffect
// Tone.Chorus is a stereo chorus effect with feedback composed of a left and right delay with a Tone.LFO applied to the delayTime of each channel. Inspiration from Tuna.js. Read more on the chorus effect on SoundOnSound.
// new Tone.Chorus ([frequency][, delayTime][, depth]) 
//  .frequency ~ {Frequency} : The frequency of the LFO which modulates the delayTime.
// .depth {NormalRange} :  The depth of the effect. A depth of 1 makes the delayTime modulate between 0 and 2*delayTime (centered around the delayTime).
// .delayTime {Number} : The delayTime in milliseconds of the chorus. A larger delayTime will give a more pronounced effect. Nominal range a delayTime is between 2 and 20ms.


var Tone = require("tone");

function visibilityFx(weather){
    
    var visibility = weather.visibility;
    console.log("visibility: "+visibility);
    var frequency = 0;
    var delayTime = 0;
    var depth = 0;
    
    if (visibility < 10)
    {
        frequency = (2 - (visibility/10)); // arbitrary set frequency between 1 and 2 
        delayTime = (10 - visibility) * 2; // delayTime between 2 and 20
        depth = (10 - visibility) / 10; // delayTime between 0 and 1
    }
    
    console.log("--chorus");
    console.log("frequency: " + frequency);
    console.log("delayTime :" + delayTime);
    console.log("depth :" +depth);
    
    var chorus = new Tone.Chorus (frequency, delayTime, depth) ;
    return chorus;
}

module.exports = visibilityFx;