// $(document).foundation();

window.initialize = require("./modules/initialize");

nx.onload = function() {
    delete dial1.__proto__.move;
    dial1.responsivity = 0;
    
    nx.colorize("#6666ff"); // sets accent (default)
    // nx.colorize("border", "yellow");
    nx.colorize("fill", "#ddd");
};