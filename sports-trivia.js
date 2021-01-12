$(document).ready(function(event){
    var windowWidth=window.innerWidth;
    var windowHeight=window.innerHeight
    var i=1;
    while (i<100){
        $("#buttons").append("<div id='numbers' class='col-1'><button id='"+i+"'>"+i+"</button></div>")
        i++
    }
    setInterval(function(){

    }, 1000)
    $("button").click(function(event){
        var number = $(this).attr("id")
        function getOffset( el ) {
            var _x = 0;
            var _y = 0;
            while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
                _x += el.offsetLeft - el.scrollLeft;
                _y += el.offsetTop - el.scrollTop;
                el = el.offsetParent;
            }
            return { top: _y, left: _x };
        }
        var x = getOffset( document.getElementById(number) ).left;
        var y= getOffset( document.getElementById(number) ).top;
        var height=$(this).height()+6
        var width=$(this).width()+16
        console.log(x, y, height, width)
        var initialXMovement=windowWidth-x-width-5;
        var translateMovement="translate("+initialXMovement+"px, 0)"
        $(this).toggleClass("moving")
        $(this).css("transform", translateMovement)
        $(this).toggleClass("moving-button")
        var className="#"+number
        setTimeout(function(){
            let counter=0

            setInterval(function(){
                if (counter%2==1) {
                    let translateMovement = "translate(" + (windowWidth -x- width-5) + "px, 0)"
                    $(className).css("transform", translateMovement)
                    console.log(translateMovement)
                } else{
                    let translateMovement = "translate(" + (-x+5) + "px, 0)"
                    $(className).css("transform", translateMovement)
                    console.log(translateMovement)
                }
                counter++
            }, 3100)
        }, 2100)

    })
    $(document).on("mouseover",".moving-button", function(){
        $("body").css("background-color", "red")
    })
})


