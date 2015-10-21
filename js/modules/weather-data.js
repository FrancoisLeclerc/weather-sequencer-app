function getWeather(pos){
    $.ajax({
        url: "https://api.forecast.io/forecast/9cefef474c591d3e1ae766e338942cd9/"+pos.lat+","+pos.lng,
        dataType: "jsonp",
        success: function (forecastInfo) {
            var temperature = forecastInfo.currently.temperature;
            var tempF = Math.round(temperature)+"°F";
            var tempC = Math.round((temperature-32)*(5/9))+"°C";
            // $(".data").append("<h3>"+tempF+" / "+tempC+"</h3>").append("<h4>"+forecastInfo.currently.summary+"</h4>");
        }
    });
}

module.exports = getWeather;