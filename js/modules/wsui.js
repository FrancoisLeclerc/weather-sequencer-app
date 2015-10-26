var Tone = require("tone");
var getPosition = require("./position-data");

//// TOGGLE IMPERIAL-METRIC
$(".input").on("click", ".system", function(){
    $(".switch").toggleClass("nodisplay");
    ($(".system").text() === "Switch to metric system")?$(".system").text("Switch to imperial system"):$(".system").text("Switch to metric system");
});

//// ON RESIZE
$(window).on("resize",function(){
    $('#searchTextField').css("width","100%");
    $('#toggle1').css("width",$("body").width()-15+"px").css("height",$("footer").height()+"px");
    $('#matrix1').css("width",$("body").width()-$(".track-names").width()-40+"px").css("height",$(".sequencer").height()+"px");
});

//// ACTION SEARCH INPUT
// $(".input").on("click",".btn-search", function(){
//     var valueInput = $("#searchTextField").val();
//     var valueDial = [dial1,dial2,dial3,dial4,dial5,dial6,dial7];
//     for(var i = 0 ; i < valueDial.length ; i++){ valueDial[i].val.value = 0; }
//     getPosition(valueInput);
// });

// $('#searchTextField').on('keypress', function(e) {
//     var keyCode = e.keyCode;
//     if (keyCode === 13) {
//         var valueInput = $("#searchTextField").val();
//         var valueDial = [dial1,dial2,dial3,dial4,dial5,dial6,dial7];
//         for(var i = 0 ; i < valueDial.length ; i++){ valueDial[i].val.value = 0; }
//         getPosition(valueInput);
//     }
// });



//// SCROLL EFFECT
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});

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
        
        if($(window).scrollTop() <= 580){
            $(".arrow").trigger("click");
        }
        else {
            if (!playButton.active){
                toggle1.val.value = 1;
                toggle1.draw();
                playButton.active = true;
                playButton.start();
            }
            else {
                toggle1.val.value = 0;
                toggle1.draw();
                playButton.active = false;
                playButton.stop();
            }
        }
    }
});




    //// WHEN SCROLL IS AT END OF PAGE
    var scroll = true;
    $(window).on("scroll load", function() {
        if($(window).scrollTop() + $(window).height() >= $(document).height() - 100 && scroll) {
            scroll = false;
            //// INPUT ANIMATION
            // var widthInput = $(".input").width();
            $("#searchTextField").animate({width: "100%"}, {queue: false,duration: 1000 });
            
            //// 2ND TITLE ANIMATION
            $( ".title h1" ).animate({opacity: 1},{queue: false, duration: 2000});
            
            //// TRACK NAMES ANIMATION
            for(var i = 0 ; i <= 8 ; i++){
                var duration = Math.floor(Math.random() * 1001) + 2000;
                $( ".track-names p:nth-child("+i+")" ).animate({opacity: 1},{queue: false, duration: duration});
            }
            
        }
    });