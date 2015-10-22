function getDial(data){
    
    console.log(data);
  	var x = 0;
  	
    var intDial1 = setInterval(function(){
        
        if(dial1.val.value >= data.humidity){
          clearInterval(intDial1);
        } else {
          dial1.val.value = x;
          dial1.init();
          x += 0.0015;
        }
      }, 1);
      
      var y = 0;
  	
    var intDial2 = setInterval(function(){
        
        if(dial2.val.value >= data.cloudCover){
          clearInterval(intDial2);
        } else {
          dial2.val.value = y;
          dial2.init();
          y += 0.0015;
        }
      }, 1);
      
      var q = 0;
  	
    var intDial3 = setInterval(function(){
        
        if(dial3.val.value >= data.precipProbability){
          clearInterval(intDial3);
        } else {
          dial3.val.value = q;
          dial3.init();
          q += 0.0015;
        }
      }, 1);
}

module.exports = getDial;