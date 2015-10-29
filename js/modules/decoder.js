// Decode the urlHash
function decoder() {
    var currentHash = window.location.hash.substring(1);
    
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 8; j++) {
            if (currentHash[i*8 + j] === '1') {
                matrix1.setCell(i, j, true);
            }
        }
    }
}

module.exports = decoder;