var getDial = require("./dial-data");

function getWeather(pos){
    $.ajax({
        url: "https://api.forecast.io/forecast/9cefef474c591d3e1ae766e338942cd9/"+pos.lat+","+pos.lng,
        dataType: "jsonp",
        success: function (forecastInfo) {
            var data = forecastInfo.currently;
            $(".data1").text(Math.round(data.temperature)+"°F");
            $(".data1m").text(Math.round((data.temperature-32)*(5/9))+"°C");
            $(".data2").text(data.precipIntensity+" in/h");
            $(".data2m").text((data.precipIntensity*25.4)+" mm/h");
            $(".data3").text(Math.round(data.humidity*100)+"%");
            $(".data4").text(Math.round(data.windSpeed)+" mph");
            $(".data4m").text(Math.round(data.windSpeed*1.609344)+" km/h");
            $(".data5").text(Math.round(data.visibility)+" mi");
            $(".data5m").text(Math.round(data.visibility*1.609344)+" km");
            $(".data6").text(Math.round(data.cloudCover*100)+"%");
            $(".data7").text(Math.round(data.pressure)+" mb");
            getDial(data);
        }
    });
}

module.exports = getWeather;