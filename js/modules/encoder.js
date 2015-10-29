function getLink() {
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
    
    //create link for popup
    var link = window.location.origin+"/#"+urlHash; 
    return link;   
}



module.exports = getLink;

	