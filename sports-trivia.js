$(document).ready(function(event){
    var i=1;
    while (i<100){
        $("#buttons").append("<div id='numbers' class='col-1'><button>"+i+"</button></div>")
        i++
    }
    setInterval(function(){

    }, 1000)
})