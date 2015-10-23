function getDial(data){
  var speed = [];
  for(var i = 0 ; i < 7 ; i++){
    speed[i] = (Math.round(Math.random()*22) + 8)/10000;
  }

  var x1 = 0;
  var val1 = (data.temperature+30)/134;
  if(data.temperature < -30){ val1 = 0; }
  else if(data.temperature > 104){ val1 = 1; }
  
  var intDial1 = setInterval(function(){
      if(dial1.val.value >= val1){ clearInterval(intDial1); }
      else { dial1.val.value = x1; dial1.init(); x1 += speed[0]; }
  }, 1);
  
  var x2 = 0;
  var val2 = (data.precipIntensity*10)/4;
  if(data.precipIntensity > 0.4){ val2 = 1; }
  var intDial2 = setInterval(function(){
      if(dial2.val.value >= val2){ clearInterval(intDial2); }
      else { dial2.val.value = x2; dial2.init(); x2 += speed[1]; }
  }, 1);


	var x3 = 0;
  var intDial3 = setInterval(function(){
      if(dial3.val.value >= data.humidity){ clearInterval(intDial3); }
      else { dial3.val.value = x3; dial3.init(); x3 += speed[2]; }
  }, 1);
  
  var x4 = 0;
  var val4 = data.windSpeed/40;
  if(data.windSpeed > 40){ val4 = 1; }
  var intDial4 = setInterval(function(){
      if(dial4.val.value >= val4){ clearInterval(intDial4); }
      else { dial4.val.value = x4; dial4.init(); x4 += speed[3]; }
  }, 1);
  
  var x5 = 0;
  var val5 = data.visibility/10;
  var intDial5 = setInterval(function(){
      if(dial5.val.value >= val5){ clearInterval(intDial5); }
      else { dial5.val.value = x5; dial5.init(); x5 += speed[4]; }
  }, 1);
  
  var x6 = 0;
  var intDial6 = setInterval(function(){
      if(dial6.val.value >= data.cloudCover){ clearInterval(intDial6); }
      else { dial6.val.value = x6; dial6.init(); x6 += speed[5]; }
  }, 1);
  
  var x7 = 0;
  var val7 = (data.pressure-980)/66;
  if(data.pressure < 980){ val7 = 0; }
  else if(data.pressure > 1046){ val7 = 1; }
  var intDial7 = setInterval(function(){
      if(dial7.val.value >= val7){ clearInterval(intDial7); }
      else { dial7.val.value = x7; dial7.init(); x7 +=speed[6]; }
  }, 1);
}

module.exports = getDial;