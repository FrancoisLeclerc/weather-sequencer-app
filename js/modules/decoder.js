// Decode the urlHash
function decoder() {
    
    if(window.location.hash !== "") { var loopHash = window.location.hash.substring(1); }
    else { var loopHash = "10001000001000100010001010001000010001000010000010001000001000000001000100010001001000001000001001001000010000100010010000100000"; }
    
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 8; j++) {
            if (loopHash[i*8 + j] === '1') {
                matrix1.setCell(i, j, true);
            }
        }
    }
}

module.exports = decoder;