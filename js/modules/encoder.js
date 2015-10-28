
function encoder() {
    setTimeout(function(){
        // console.log(matrix1.matrix);
        //Convert null in array for 0
        var melody = matrix1.matrix;
     
        for (var i = 0; i < melody.length; i++ ) {
            for (var j = 0; j < melody[i].length; j++) {
                // console.log('value : ', melody[i][j]);
                if(!melody[i][j]) {melody[i][j] = 0;}
            }
        }
        
        // console.log('zzzzzzzzz ', JSON.stringify(melody));
        
        //Create string for urlHash
        var urlHash = '';
        for (var i = 0; i < 16; i++) {
            urlHash += melody[i].join('');
        }
        
        console.log('urlHash #### ' + urlHash);
            
        
        
    }, 10000);
    
}

encoder();


        




module.exports = encoder;

	// var matsettings = matrix1;
	// console.log("matsettings--------" , matsettings);
	// console.log(JSON.stringify(matrix1.matrix));
	// Encode
    // var urlHash = '';
    // for (var i = 0; i < 16; i++) {
    //     urlHash += matrix[i].join('')
    // }
	