var instrument = {empty: true};
var weather = {empty: true};

module.exports = {
    getInstru: function(){return instrument;},
    setInstru: function(i){instrument = i;},
    getWeather: function(){return weather;},
    setWeather: function(w){weather = w;}
};