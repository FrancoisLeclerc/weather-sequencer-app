var Tone = require("tone");


//// PLAY BUTTON
var playButton = $('#toggle1');

playButton.active = false;
playButton.start = function(){Tone.Transport.start();}
playButton.stop = function(){Tone.Transport.stop();}

playButton.on('mousedown touchstart',function(e){
    console.log(e);
    if (!playButton.active){
        playButton.active = true;
        playButton.start();
    }
    else {
        playButton.active = false;
        playButton.stop();
    }

})

$(window).on("keydown",function(){
 if (!playButton.active){
        playButton.active = true;
        playButton.start();
    }
    else {
        playButton.active = false;
        playButton.stop();
    }
})