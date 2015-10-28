var Tone = require("tone");
// var getPosition = require("./position-data");
var async = require("./async-data");


//jQuery helpers
$.fn.isOnScreen = function(){
    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};


//// NEXUS UI SET UP
function nexusSetting() {

    var dialResponsivity = [dial1, dial2, dial3, dial4, dial5, dial6, dial7];
    for (var i = 0; i < 7; i++) {
        dialResponsivity[i].responsivity = 0;
    }

    nx.colorize("#0affea");
    nx.colorize("fill", "#424242");

    matrix1.col = 16;
    matrix1.row = 8;
    matrix1.init();
    
//     var fromMail = [[1,0,0,0,null,null,null,null],[0,1,0,0,null,null,null,null],[0,0,1,0,null,null,null,null],[0,0,0,1,null,null,null,null],[0,0,0,0,1,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,0,1,0],[0,0,0,1,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,1,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0]];
// 	matrix1.matrix = fromMail;
//  matrix1.setCell(0,0,fromMail[0][0]);
    // setTimeout(function() { Tone.Transport.start(); }, 500);


    return $.Deferred().resolve();
}




function loadSearchHandlers(instrument) {
    var $searchField = $("#searchTextField");

    //// ACTION SEARCH INPUT
    $searchField.on("keypress", function(e) {
        if (e.keyCode === 13) {
            setTimeout(function() {

                async.getPosition($searchField.val())
                    .then(async.getWeather)
                    .then(function(weather){
                        instrument.connectFX(weather);
                        motionDial(weather);
                    });
            }, 50);
        }
    });

    $("body").on("mousedown", ".pac-container", function(e) {

        setTimeout(function() {

            async.getPosition($searchField.val())
                .then(async.getWeather)
                .then(function(weather){
                    instrument.connectFX(weather);
                    motionDial(weather);
                });
        }, 50);
    });
}



//// PLAY BUTTON
function loadPlayButtonHandler(instrument) {
    var playButton = $('#toggle1');

    playButton.active = false;
    playButton.start = function() {
        console.log(instrument.BPM);
        
        // Tone.Transport.start(matrix1.sequence(instrument.BPM));
        // matrix1.jumpToCol(-1);
        // matrix1.bpm = instrument.BPM;
        // matrix1.sequence(instrument.BPM);
        // console.log(matrix1.bpm);
        Tone.Transport.start();
    };
    playButton.stop = function() {
        Tone.Transport.stop();
        // matrix1.stop();
        // matrix1.jumpToCol(20);
    };

    playButton.on('mousedown touchstart', function(e) {
        
        if (!playButton.active) {
            playButton.active = true;
            playButton.start();
        }
        else {
            playButton.active = false;
            playButton.stop();
        }
    });

    $(window).on("keydown", function(e) {
        if (e.keyCode === 32) {
            if ($(window).scrollTop() <= 580) {
                $(".arrow").trigger("click");
            }
            else {
                if (!playButton.active) {
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
}


function displayWeatherData(data) {
    // TEMPERATURE
    if (typeof data.temperature !== "number") {
        $(".data1").text("n/a");
        $(".data1m").text("n/a");
    }
    else {
        $(".data1").text(Math.round(data.temperature) + "°F");
        $(".data1m").text(Math.round((data.temperature - 32) * (5 / 9)) + "°C");
    }
    //PRECIPITATION
    if (typeof data.precipIntensity !== "number") {
        $(".data2").text("n/a");
        $(".data2m").text("n/a");
    }
    else {
        $(".data2").text(Math.round(data.precipIntensity * 1000) / 1000 + " in/h");
        $(".data2m").text(Math.round((data.precipIntensity * 25.4)) + " mm/h");
    }
    //HUMIDITY
    if (typeof data.humidity !== "number") {
        $(".data3").text("n/a");
    }
    else {
        $(".data3").text(Math.round(data.humidity * 100) + "%");
    }
    //WIND SPEED
    if (typeof data.windSpeed !== "number") {
        $(".data4").text("n/a");
        $(".data4m").text("n/a");
    }
    else {
        $(".data4").text(Math.round(data.windSpeed) + " mph");
        $(".data4m").text(Math.round(data.windSpeed * 1.609344) + " km/h");
    }
    //VISIBILITY
    if (typeof data.visibility !== "number") {
        $(".data5").text("n/a");
        $(".data5m").text("n/a");
    }
    else {
        $(".data5").text(Math.round(data.visibility) + " mi");
        $(".data5m").text(Math.round(data.visibility * 1.609344) + " km");
    }
    //CLOUD COVER
    if (typeof data.cloudCover !== "number") {
        $(".data6").text("n/a");
    }
    else {
        $(".data6").text(Math.round(data.cloudCover * 100) + "%");
    }
    //NEAREST STROM
    if (typeof data.nearestStormDistance !== "number") {
        $(".data7").text("n/a");
        $(".data7m").text("n/a");
    }
    else {
        $(".data7").text(Math.round(data.nearestStormDistance) + " mi");
        $(".data7m").text(Math.round(data.nearestStormDistance * 1.609344) + " km");
    }
}


function dialMotionLauncher(weather){
    //handling FX UI Motion
    var $playButton = $("#toggle1");
    if ($playButton.isOnScreen()) {
        
        motionDial(weather);
    }
    else {//if not currently on screen, add event to trigger when motion automatically
        
        var $window = $(window);
        $window.on("scroll load", function dialDisplayHandler() {
            if ($playButton.isOnScreen())
            {
                motionDial(weather);
                $window.unbind("scroll load",dialDisplayHandler);
            }
        })        
    }
}


function motionDial(data) {

    var $console = $(".console");
    if ($console.isOnScreen())
    {
        displayWeatherData(data);
    
        var valueDial = [dial1, dial2, dial3, dial4, dial5, dial6, dial7];
        for (var i = 0; i < valueDial.length; i++) {
            valueDial[i].val.value = 0;
        }
    
    
        var speed = [];
    
    
        for (var i = 0; i < 7; i++) {
            speed[i] = (Math.round(Math.random() * 22) + 8) / 1500;
        }
        
        //TEMPERATURE
        var val1 = (data.temperature + 30) / 134;
        if (data.temperature < -30 || typeof data.temperature !== "number") {
            val1 = 0;
            dial1.val.value = 0;
            dial1.init();
        }
        else if (data.temperature > 104) {
            val1 = 1;
        }
        var intDial1 = setInterval(function() {
            if (dial1.val.value >= val1) {
                clearInterval(intDial1);
            }
            else {
                dial1.val.value += speed[0];
                dial1.init();
            }
        }, 20);
        
        //PRECIPITATION
        var val2 = (data.precipIntensity * 10) / 4;
        if (data.precipIntensity > 0.4) {
            val2 = 1;
        }
        else if (typeof data.precipIntensity !== "number") {
            val2 = 0;
            dial2.val.value = 0;
            dial2.init();
        }
        var intDial2 = setInterval(function() {
            if (dial2.val.value >= val2) {
                clearInterval(intDial2);
            }
            else {
                dial2.val.value += speed[1];;
                dial2.init();
            }
        }, 20);
        
        //HUMIDITY
        var val3 = data.humidity;
        if (typeof data.humidity !== "number") {
            val3 = 0;
            dial3.val.value = 0;
            dial3.init();
        }
        var intDial3 = setInterval(function() {
            if (dial3.val.value >= val3) {
                clearInterval(intDial3);
            }
            else {
                dial3.val.value += speed[2];
                dial3.init();
            }
        }, 20);
        
        //WIND SPEED
        var val4 = data.windSpeed / 40;
        if (data.windSpeed > 40) {
            val4 = 1;
        }
        else if (typeof data.windSpeed !== "number") {
            val4 = 0;
            dial4.val.value = 0;
            dial4.init();
        }
        var intDial4 = setInterval(function() {
            if (dial4.val.value >= val4) {
                clearInterval(intDial4);
            }
            else {
                dial4.val.value += speed[3];
                dial4.init();
            }
        }, 20);
        
        //VISIBILITY
        var val5 = data.visibility / 10;
        if (typeof data.visibility !== "number") {
            val5 = 0;
            dial5.val.value = 0;
            dial5.init();
        }
        var intDial5 = setInterval(function() {
            if (dial5.val.value >= val5) {
                clearInterval(intDial5);
            }
            else {
                dial5.val.value += speed[4];
                dial5.init();
            }
        }, 20);
        
        //CLOUD COVER
        var val6 = data.cloudCover;
        if (typeof data.cloudCover !== "number") {
            val6 = 0;
            dial6.val.value = 0;
            dial6.init();
        }
        var intDial6 = setInterval(function() {
            if (dial6.val.value >= val6) {
                clearInterval(intDial6);
            }
            else {
                dial6.val.value += speed[5];
                dial6.init();
            }
        }, 20);
        
        //NEAREST STORM 0 600
        var val7 = 1 - (data.nearestStormDistance / 600);
        if (data.nearestStormDistance > 600 || typeof data.nearestStormDistance !== "number") {
            val7 = 0;
            dial7.val.value = 0;
            dial7.init();
        }
        var intDial7 = setInterval(function() {
            if (dial7.val.value >= val7) {
                clearInterval(intDial7);
            }
            else {
                dial7.val.value += speed[6];
                dial7.init();
            }
        }, 20);
    }
}


function mainDisplayMotion() {

    var $title = $(".title h1");
    if ($title.isOnScreen())
    {
        //// INPUT ANIMATION
        $("#searchTextField").animate({
            width: "100%"
        }, {
            queue: false,
            duration: 1000
        });
        //// 2ND TITLE ANIMATION
        $title.animate({
            opacity: 1
        }, {
            queue: false,
            duration: 2000
        });
        //// TRACK NAMES ANIMATION
        for (var i = 0; i <= 8; i++) {
            var duration = Math.floor(Math.random() * 1001) + 2000;
            $(".track-names p:nth-child(" + i + ")").animate({
                opacity: 1
            }, {
                queue: false,
                duration: duration
            });
        }
    }
    else //if not currently on screen, add event to trigger when motion automatically
    {
        var $window = $(window);
        $window.on("scroll load", function mainDisplayHandler() {
            if ($title.isOnScreen())
            {
                mainDisplayMotion();
                $window.unbind("scroll load",mainDisplayHandler);
            }
        });
    }
}






//// TOGGLE IMPERIAL-METRIC
$(".input").on("click", ".system", function() {
    $(".switch").toggleClass("nodisplay");
    ($(".system").text() === "Switch to metric system") ? $(".system").text("Switch to imperial system"): $(".system").text("Switch to metric system");
});


//// ON RESIZE
$(window).on("resize", function() {
    $('#searchTextField').css("width", "100%");
    matrix1.resize($('body').width()-124, $('.matrix-size').height());
    toggle1.resize($('.toggle-size').width(), $('.toggle-size').height());
});





//// SCROLL EFFECT
$('a[href*=#]:not([href=#])').click(function() {
    console.log(this);
    console.log(location);
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});





module.exports = {
    nexusSetting: nexusSetting,
    motionDial: motionDial,
    mainDisplayMotion: mainDisplayMotion,
    loadSearchHandlers,loadSearchHandlers,
    dialMotionLauncher:dialMotionLauncher,
    loadPlayButtonHandler: loadPlayButtonHandler
};