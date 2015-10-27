var Tone = require("tone");
var getPosition = require("./position-data");

//// NEXUS UI SET UP
nx.onload = function() {
    var dialResponsivity = [dial1,dial2,dial3,dial4,dial5,dial6,dial7];
    for(var i = 0 ; i < 7 ; i++){ dialResponsivity[i].responsivity = 0; }
    nx.colorize("#0affea");
    nx.colorize("fill", "#424242");
    matrix1.col = 16;
    matrix1.row = 8;
    // matrix1.resize($('#matrix1').width(), $('#matrix1').height());
    // toggle1.resize($('#toggle1').width(), $('#toggle1').height());
    // toggle1.init();
    matrix1.init();
};

//// TOGGLE IMPERIAL-METRIC
$(".input").on("click", ".system", function(){
    $(".switch").toggleClass("nodisplay");
    ($(".system").text() === "Switch to metric system")?$(".system").text("Switch to imperial system"):$(".system").text("Switch to metric system");
});

//// ON RESIZE
$(window).on("resize",function(){
    $('#searchTextField').css("width","100%");
    // matrix1.resize($('.matrix-size').width(), $('.matrix-size').height());
    matrix1.resize($('body').width()-124, $('.matrix-size').height());
    toggle1.resize($('.toggle-size').width(), $('.toggle-size').height());
//     // $('#toggle1').css("width",$("body").width()-15+"px").css("height",$("footer").height()+"px");
//     // $('#matrix1').css("width",$("body").width()-$(".track-names").width()-40+"px").css("height",$(".sequencer").height()+"px");
//     // $("*").css("width",$(this).width()-($(this).width()/$("body").width())+"px");
});

//// ACTION SEARCH INPUT
$(".input").on("keypress", "#searchTextField", function(e){
    var keyCode = e.keyCode;
    if (keyCode === 13) {
        setTimeout(function(){
            var valueInput = $("#searchTextField").val();
            var valueDial = [dial1,dial2,dial3,dial4,dial5,dial6,dial7];
            for(var i = 0 ; i < valueDial.length ; i++){ valueDial[i].val.value = 0; }
            getPosition(valueInput);
        }, 50);
    }
});

$("body").on("mousedown",".pac-container", function(){
    setTimeout(function(){
        var valueInput = $("#searchTextField").val();
        var valueDial = [dial1,dial2,dial3,dial4,dial5,dial6,dial7];
        for(var i = 0 ; i < valueDial.length ; i++){ valueDial[i].val.value = 0; }
        getPosition(valueInput);
    }, 50);
});

//// SCROLL EFFECT
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
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

// $(".input").on("click",".btn-search", function(){
//     var valueInput = $("#searchTextField").val();
//     var valueDial = [dial1,dial2,dial3,dial4,dial5,dial6,dial7];
//     for(var i = 0 ; i < valueDial.length ; i++){ valueDial[i].val.value = 0; }
//     getPosition(valueInput);
// });