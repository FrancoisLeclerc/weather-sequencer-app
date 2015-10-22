var getWeather = require("./weather-data");

function getPosition(data){
    if(typeof data === "string") { var middleUrl = "address="+data; var x = 0; }
    else { middleUrl = "latlng="+data.lat+","+data.lng; x = 4; }
    
    var url = "https://maps.googleapis.com/maps/api/geocode/json?"+middleUrl+"&key=AIzaSyDmk5AKVdNHYCjGEv-UeAK0LOaiiCGP_DE";

    $.ajax({
        url: url,
        datatype: "jsonp",
        success: function(city){
            if(city.status === "OK" && ( typeof data === "object" || data.toLowerCase() === city.results[x].formatted_address.toLowerCase() || data.toLowerCase() === city.results[x].address_components[0].long_name.toLowerCase())) {
                var position = city.results[0].geometry.location;
                // var currentCity = city.results[x].address_components[0].long_name;
                // var randNum = Math.floor(Math.random() * 5) + 1;
                // var randMessage;
                
                // switch(randNum){
                //     case 1: randMessage = "Aww, beautiful "+currentCity+"!"; break;
                //     case 2: randMessage = currentCity+", what a nice city!"; break;
                //     case 3: randMessage = "Do people actually live in "+currentCity+"?"; break;
                //     case 4: randMessage = currentCity+", eh? Enjoy!"; break;
                //     case 5: randMessage = currentCity+", I should travel there"; break;
                // }
                var dayToday = new Date;
                var dateFormat = dayToday.customFormat("#DDDD# #MMMM# the #DD##th#, #YYYY# #h#:#mm##AMPM#");
                
                $(".city").text("").append("<h2>"+city.results[x].formatted_address+"</h2>");
                // .append("<h3>"+dateFormat+"</h3>");
                getWeather(position);
                
            } else {
                shake("#searchTextField");
                shake(".btn-search");
                $("#searchTextField").val("").attr("placeholder","Please select a city from the list");
            }
        }
    });
}

function shake(div){                                                                                                                                                                                            
    var interval = 100;                                                                                                 
    var distance = 10;                                                                                                  
    var times = 4;                                                                                                      

    $(div).css('position','relative');                                                                                  

    for(var iter=0;iter<(times+1);iter++){                                                                              
        $(div).animate({ 
            left:((iter%2==0 ? distance : distance*-1))
            },interval);                                   
    }                                                                                                             

    $(div).animate({ left: 0},interval);                                                                                
}

Date.prototype.customFormat = function(formatString){
	var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
	var dateObject = this;
	YY = ((YYYY=dateObject.getFullYear())+"").slice(-2);
	MM = (M=dateObject.getMonth()+1)<10?('0'+M):M;
	MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
	DD = (D=dateObject.getDate())<10?('0'+D):D;
	DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dateObject.getDay()]).substring(0,3);
	th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
	formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);

	h=(hhh=dateObject.getHours());
	if (h==0) h=24;
	if (h>12) h-=12;
	hh = h<10?('0'+h):h;
	AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
	mm=(m=dateObject.getMinutes())<10?('0'+m):m;
	ss=(s=dateObject.getSeconds())<10?('0'+s):s;
	return formatString.replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};

module.exports = getPosition;