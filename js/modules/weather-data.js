var getDial = require("./dial-data");

function getWeather(pos){
    $.ajax({
        url: "https://api.forecast.io/forecast/9cefef474c591d3e1ae766e338942cd9/"+pos.lat+","+pos.lng,
        dataType: "jsonp",
        success: function (forecastInfo) {
            var data = forecastInfo.currently;
            // TEMPERATURE
            if(typeof data.temperature !== "number"){ $(".data1").text("n/a"); $(".data1m").text("n/a"); }
            else { $(".data1").text(Math.round(data.temperature)+"°F"); $(".data1m").text(Math.round((data.temperature-32)*(5/9))+"°C"); }
            //PRECIPITATION
            if(typeof data.precipIntensity !== "number"){ $(".data2").text("n/a"); $(".data2m").text("n/a"); }
            else { $(".data2").text(Math.round(data.precipIntensity*100)/100+" in/h"); $(".data2m").text(Math.round((data.precipIntensity*25.4))+" mm/h"); }
            //HUMIDITY
            if(typeof data.humidity !== "number"){ $(".data3").text("n/a"); }
            else { $(".data3").text(Math.round(data.humidity*100)+"%"); }
            //WIND SPEED
            if(typeof data.windSpeed !== "number"){ $(".data4").text("n/a"); $(".data4m").text("n/a"); }
            else { $(".data4").text(Math.round(data.windSpeed)+" mph"); $(".data4m").text(Math.round(data.windSpeed*1.609344)+" km/h"); }
            //VISIBILITY
            if(typeof data.visibility !== "number"){ $(".data5").text("n/a"); $(".data5m").text("n/a"); }
            else { $(".data5").text(Math.round(data.visibility)+" mi"); $(".data5m").text(Math.round(data.visibility*1.609344)+" km"); }
            //CLOUD COVER
            if(typeof data.cloudCover !== "number"){ $(".data6").text("n/a"); }
            else { $(".data6").text(Math.round(data.cloudCover*100)+"%"); }
            //NEAREST STROM
            if(typeof data.nearestStormDistance !== "number"){ $(".data7").text("n/a"); $(".data7m").text("n/a"); }
            else { $(".data7").text(Math.round(data.nearestStormDistance)+" mi"); $(".data7m").text(Math.round(data.nearestStormDistance*1.609344)+" km"); }
            getDial(data);
        }
    });
}

module.exports = getWeather;