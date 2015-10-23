var Tone = require("tone");


//// PLAY BUTTON
var playButton = $('#toggle1');

playButton.active = false;
playButton.start = function(){Tone.Transport.start();};
playButton.stop = function(){Tone.Transport.stop();};

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
});

$(window).on("keydown",function(e){
    if(e.keyCode === 32){
        if (!playButton.active){
            toggle1.val.value = 1;
            toggle1.colors.fill = "#0affea";
            toggle1.draw();
            playButton.active = true;
            playButton.start();
        }
        else {
            toggle1.val.value = 0;
            toggle1.colors.fill = "#424242";
            toggle1.draw();
            playButton.active = false;
            playButton.stop();
        }
    }
})