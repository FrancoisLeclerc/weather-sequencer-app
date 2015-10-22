// $(document).foundation();

window.initialize = require("./modules/initialize");

$(".input").on("click", ".switch", function(){
    $(".switch").toggleClass("nodisplay");
    $(".system").toggleClass("inline");
});