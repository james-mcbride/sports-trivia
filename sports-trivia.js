$(document).ready(function(event){
let windowWidth=window.innerWidth;
let windowHeight=window.innerHeight
// let i=1;
// let playersPickedArray=[]
// while (i<100){
//     $("#buttons").append("<div id='numbers' class='col-1'><button class='triviaButtons' id='"+i+"'>"+i+"</button></div>")
//     i++
// }
// var intervals=[]
    var intervals=[]
    var gameCounter=0;

    $(".start-button").click(function(event){
        $("#remaining").html(0)
        $("#gameOver").hide()
        let i=1;
        let playersPickedArray=[]
        while (i<100){
            $("#buttons").append("<div id='numbers' class='col-1'><button class='triviaButtons' id='"+i+"'>"+i+"</button></div>")
            i++
            let id="#"+i
            $(id).css("transform", "none")
        }

        event.preventDefault()
        $("#start-page").hide()
        $("#buttons").show()
        $("#trivia").show()
        $("#score").hide()
        $("#buttons").css("display", "flex")

        let jerseyArrayIndex = Math.round(Math.random() * 99)
        while (playersPickedArray.indexOf(jerseyArrayIndex)!==-1){
            jerseyArrayIndex = Math.round(Math.random() * 99)
        }
        playersPickedArray.push(jerseyArrayIndex)
        let jerseyNumber=jerseyArrayIndex+1
        let jerseyNumberArrayLength = filteredPlayersArray[jerseyArrayIndex].length;
        let randomPlayerIndex = Math.round(Math.random() * (jerseyNumberArrayLength - 1))
        let randomPlayer = filteredPlayersArray[jerseyArrayIndex][randomPlayerIndex]
        $("#triviaQuestion").text(`What was the jersey number of ${randomPlayer[0]} ${randomPlayer[1]} from ${randomPlayer[2]}-${randomPlayer[3]}?`)
        $("#trivia").css("display", "flex")
        $("#score").show()


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

                let x = getOffset(document.getElementById(jerseyNumber.toString())).left;
                let y = getOffset(document.getElementById(jerseyNumber.toString())).top;
                let height = $(correctButton).height() + 6
                let width = $(correctButton).width() + 16
                let initialXMovement = windowWidth - x - width - 20;
                let translateMovement = "translate(" + initialXMovement + "px, 0)"
                $(correctButton).toggleClass("moving")
                $(correctButton).css("transform", translateMovement)
                $(correctButton).toggleClass("moving-button")
                setTimeout(function () {
                    let counter = 0
                    let i= setInterval(function () {
                        if (counter % 2 == 1) {
                            let translateMovement = "translate(" + (windowWidth - x - width - 20) + "px, 0)"
                            $(correctButton).css("transform", translateMovement)
                        } else {
                            let translateMovement = "translate(" + (-x + 5) + "px, 0)"
                            $(correctButton).css("transform", translateMovement)
                        }
                        counter++
                    }, 3100)
                    intervals.push(i)
                }, 2100)

                jerseyArrayIndex = Math.round(Math.random() * 99)
                while (playersPickedArray.indexOf(jerseyArrayIndex)!==-1){
                    jerseyArrayIndex = Math.round(Math.random() * 99)
                }
                playersPickedArray.push(jerseyArrayIndex)
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
        $("#buttons").html("")
        $("#gameScore").html($("#remaining").text())
        if (Number($("#remaining").html())>Number($("#highScore").html())){
            $("#highScore").html($("#remaining").html())
        }
        $("#gameOver").show()
        $("#trivia").hide()
        gameCounter++
        for (let j=0; j<intervals.length; j++){
            clearInterval(intervals[j])
        }
        intervals=[]
    })
    })
    // $("#start-button").click(function(event){
    //     let i=1;
    //     let playersPickedArray=[]
    //     for (let j=0; j<intervals.length; j++){
    //         clearInterval(intervals[j])
    //     }
    //     $('#buttons').load(document.URL +  '')
    //     while (i<100){
    //         $("#buttons").append("<div id='numbers' class='col-1'><button class='triviaButtons' id='"+i+"'>"+i+"</button></div>")
    //         i++
    //         let id="#"+i
    //         $(id).css("transform", "none")
    //
    //
    //     }
    //     $("#gameOver").hide()
    //     // event.preventDefault()
    //     // playersPickedArray=[]
    //     // $("#buttons").show()
    //     // i=1;
    //     // while (i<100){
    //     //     $("#buttons").append("<div id='numbers' class='col-1'><button class='triviaButtons' id='"+i+"'>"+i+"</button></div>")
    //     //     i++
    //     // }
    //     // $("#gameOver").hide()
    //     // $("#trivia").show()
    //     // $("#score").hide()
    //     // $("#buttons").css("display", "flex")
    // })
})







