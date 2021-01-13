// $(document).ready(function(event){
let windowWidth=window.innerWidth;
let windowHeight=window.innerHeight
let i=1;
let randomArray=[]
while (i<100){
    randomArray.push[i]
    $("#buttons").append("<div id='numbers' class='col-1'><button class='triviaButtons' id='"+i+"'>"+i+"</button></div>")
    i++
}


$(".row").toggleClass("hidden")
    $("#trivia").toggleClass("hidden")
    $("#start-button").click(function(event){
        event.preventDefault()
        $("#start-page").hide()
        $("#buttons").show()
        $("#trivia").show()
        $("#score").hide()
        $("#buttons").css("display", "flex")

        let jerseyArrayIndex = Math.round(Math.random() * 99)
        let jerseyNumber=jerseyArrayIndex+1
        let jerseyNumberArrayLength = filteredPlayersArray[jerseyArrayIndex].length;
        let randomPlayerIndex = Math.round(Math.random() * (jerseyNumberArrayLength - 1))
        let randomPlayer = filteredPlayersArray[jerseyArrayIndex][randomPlayerIndex]
        setTimeout(function () {
            $("#triviaQuestion").text(`What was the jersey number of ${randomPlayer[0]} ${randomPlayer[1]} from ${randomPlayer[2]}-${randomPlayer[3]}?`)
            $("#trivia").css("display", "flex")
            $("#score").show()
        }, 3000)


        $(".triviaButtons").click(function (event) {
            let number = Number($(this).attr("id"));
            if (number===jerseyNumber) {
                let currentRemaining=Number($("#remaining").html())+1
                $("#remaining").html(currentRemaining)
            }
                function getOffset(el) {
                    let _x = 0;
                    let _y = 0;
                    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
                        _x += el.offsetLeft - el.scrollLeft;
                        _y += el.offsetTop - el.scrollTop;
                        el = el.offsetParent;
                    }
                    return {top: _y, left: _x};
                }
            let correctButton="#"+jerseyNumber

                let x = getOffset(document.getElementById(number.toString())).left;
                let y = getOffset(document.getElementById(number.toString())).top;
                let height = $(this).height() + 6
                let width = $(this).width() + 16
                let initialXMovement = windowWidth - x - width - 20;
                let translateMovement = "translate(" + initialXMovement + "px, 0)"
                $(this).toggleClass("moving")
                $(this).css("transform", translateMovement)
                $(this).toggleClass("moving-button")
                var className = "#" + number
                setTimeout(function () {
                    let counter = 0

                    setInterval(function () {
                        if (counter % 2 == 1) {
                            let translateMovement = "translate(" + (windowWidth - x - width - 20) + "px, 0)"
                            $(className).css("transform", translateMovement)
                        } else {
                            let translateMovement = "translate(" + (-x + 5) + "px, 0)"
                            $(className).css("transform", translateMovement)
                        }
                        counter++
                    }, 3100)
                }, 2100)
                jerseyArrayIndex = Math.round(Math.random() * 99)
                jerseyNumber=jerseyArrayIndex+1
                jerseyNumberArrayLength = filteredPlayersArray[jerseyArrayIndex].length;
                randomPlayerIndex = Math.round(Math.random() * (jerseyNumberArrayLength - 1))
                randomPlayer = filteredPlayersArray[jerseyArrayIndex][randomPlayerIndex]
                $("#triviaQuestion").text(`What was the jersey number of ${randomPlayer[0]} ${randomPlayer[1]} from ${randomPlayer[2]}-${randomPlayer[3]}?`)
        })
        // $("#skip").click(function(event){
        //     event.preventDefault()
        //     jerseyNumber=Math.round(Math.random()*98)
        //     buttonID=`#${jerseyNumber}`
        //     jerseyNumberArrayLength=filteredPlayersArray[jerseyNumber].length;
        //     randomPlayerIndex=Math.round(Math.random()*jerseyNumberArrayLength-1)
        //     randomPlayer=filteredPlayersArray[jerseyNumber][randomPlayerIndex]
        //     $("#triviaQuestion").text(`What was the jersey number of ${randomPlayer[0]} ${randomPlayer[1]} from ${randomPlayer[2]}-${randomPlayer[3]}?`)
        //     let currentRemaining=Number($("#remaining").html())-1
        //     $("#remaining").html(currentRemaining)
        // })
    $(document).on("mouseover",".moving-button", function(){
        $("body").css("background-color", "red")
    })
    })
// })







