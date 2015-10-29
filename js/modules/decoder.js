// Decode the urlHash
function decoder() {
    
    if(window.location.hash !== "") { var loopHash = window.location.hash.substring(1); }
    else { var loopHash = "10010000000000000001010000000000110100100000000000010000000000011001100000000001000100000000000011000000001000000001100000000100"; }
    
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 8; j++) {
            if (loopHash[i*8 + j] === '1') {
                matrix1.setCell(i, j, true);
            }
        }
    }
}

module.exports = decoder;