var instrument = {empty: true};
var weather = {empty: true};
var buffer = false;
var nexusReady = false;


module.exports = {
    getInstru: function(){return instrument;},
    setInstru: function(i){instrument = i;},
    getWeather: function(){return weather;},
    setWeather: function(w){weather = w;},
    getBuffer: function(){return buffer;},
    setBuffer: function(b){buffer = b;},
    getNexus: function(){return nexusReady;},
    setNexus: function(n){nexusReady = n;},
};
