//// NEXUS COMPONENTS SET UP

nx.onload = function() {
    

    var dialResponsivity = [dial1,dial2,dial3,dial4,dial5,dial6,dial7];
    for(var i = 0 ; i < 7 ; i++){ dialResponsivity[i].responsivity = 0; }
    
    
    nx.colorize("#0affea");
    nx.colorize("fill", "#424242");
    
    
    matrix1.col = 16;
    matrix1.row = 8;
    matrix1.init();



    
    $("body").on("mousedown",".pac-container", function(){
        setTimeout(function(){
            var valueInput = $("#searchTextField").val();
            var valueDial = [dial1,dial2,dial3,dial4,dial5,dial6,dial7];
            for(var i = 0 ; i < valueDial.length ; i++){ valueDial[i].val.value = 0; }
            getPosition(valueInput);
        }, 500);
    });


};