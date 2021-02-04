$(document).ready(function(event) {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let windowWidthOffset = 0;
    let windowHeightOffset=0;
    if (windowWidth>1200){
        windowWidthOffset=(windowWidth-1200)/2;
        windowWidth=1200;
    } else{
    }
    if (windowHeight>800){
        windowHeightOffset = (windowHeight -800)/2;
        windowHeight=800;
        $("#gameZone").css("margin-top", windowHeightOffset-15)
    }
    $("#hoverBoxLeft").css({
        width: windowWidthOffset,
        height: windowHeight,
        left: 0
    })
    $("#hoverBoxRight").css({
        width: windowWidthOffset,
        height: windowHeight,
        right: 0
    })
    $("#hoverBoxTop").css({
        width: windowWidth,
        height: windowHeightOffset,
        top: 0
    })
    $("#hoverBoxBottom").css({
        width: windowWidth,
        height: windowHeightOffset,
        bottom: 0
    })
    var intervals = []
    var gameCounter = 0;
    var teamsPicked=[];

    //When the start game button is clicked on the main menu screen, this function will execute.
    $(".start-button").click(function (event) {
        var divisionsArray=[];
        for (let j = 0; j < intervals.length; j++) {
            clearInterval(intervals[j])
        }
        intervals = []
        event.preventDefault()
        //will set the score to zero before each new game.
        $("#remaining").html(0)
        //will make sure the gameOver screen is hidden before each game.
        $("#gameOver").hide()

        //will create freshly create the 99 buttons before each game, and cancel any transforms that were created last game.
        let i = 1;
        for (let division in NFLTeams){
            for (let team in NFLTeams[division]) {
                $("#buttons").append("<div id='numbers' class='col-2'><button class='triviaButtons' id='" + team + "'>" + team + "</button></div>")
                i++
                let id = "#" + team
                console.log(NFLTeams[division][team])
                $(id).css({
                    "transform": "none",
                    "color": NFLTeams[division][team][1],
                    "background-color": NFLTeams[division][team][0]
                })
            }
            divisionsArray.push([division,4]);
        }

        //will set up remaining layout of page, will hide main menu, and show the buttons and trivia sections.
        $("#start-page").hide()
        $("#buttons").show()
        $("#trivia").show()
        $("#buttons").css("display", "flex")
        $("#trivia").css("display", "flex")
        $("#gameZone").show();
        $("#score").show()


        //will generate the random trivia question. Will randomly pick one of the 99 jersey numbers and will then randomly choose a player with
        //that jersey number. Will check to make sure that that number has not been chosen yet, then will generate the trivia question.
        var divisionIndex = Math.round(Math.random() * (divisionsArray.length-1));
        var divisionPicked = divisionsArray[divisionIndex];
        let divisionPicked1=divisionPicked;
         var divisionPickedString=divisionPicked[0].replace("_", "-")
            divisionsArray[divisionIndex][1]-=1;
         if (divisionsArray[divisionIndex][1]===0){
             divisionsArray.splice(divisionIndex, 1);
         }
        if (divisionsArray[divisionIndex][1]===0){
            divisionsArray.splice(divisionIndex,1);
        }
        $("#triviaQuestion").text(`Pick a team in the ${divisionPickedString}`)

        //When one of the jersey number buttons is chosen as an answer, this function will start.
        $(".triviaButtons").click(function (event) {
            let team = $(this).attr("id");
            console.log(team)
            console.log(NFLTeams[divisionPicked1[0]][team])
            //Will check to see if the correct jersey number was chosen as an answer, and will update the score accordingly.
            if ( NFLTeams[divisionPicked1[0]][team]!==undefined) {
                let currentRemaining = Number($("#remaining").html()) + 1
                $("#remaining").html(currentRemaining)
                var correctButton="#"+team;
            }

            //found this function on stack overflow. Creates the distance the element is from top and left of window.
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

            //creates the id for the correct jersey number button.
            for (let team in NFLTeams[divisionPicked1]){
                if (teamsPicked.indexOf(team)===-1){
                    var correctButton="#"+team;
                    teamsPicked.push(team);
                }
            }

            //the next several lines does the calculation for the distance the button will move to move back and forths across the page.
            let x = getOffset(document.getElementById(team)).left;
            let y = getOffset(document.getElementById(team)).top;
            let height = $(correctButton).height() + 6
            let width = $(correctButton).width() + 16
            let initialXMovement = windowWidth+windowWidthOffset - x - width - 5;
            let initialYMovement = windowHeight+windowHeightOffset - y - height-5;

            //This variable will represent a random number that is either 0 or 1. This will decide if the box moves horizontal or vertical.
            let randomDirectionNumber = Math.round(Math.random());

            //The next few lines add a transform translate style, moving the button its initial movement to the right side or bottom of the page,
            //and then the full distance back and forth across the whole page.
            let translateMovement;
            if (randomDirectionNumber===0) {
                translateMovement = "translate(" + initialXMovement + "px, 0)";
            } else{
                translateMovement= "translate(0," + initialYMovement + "px)";
            }
            $(correctButton).toggleClass("moving")
            $(correctButton).css("transform", translateMovement)

            //adds a class to the button when it begins moving. This will be used as our detector for our hover function later on.
            $(correctButton).toggleClass("moving-button");

            //this function will use setTimeout to wait until the button moves to the far right side of the screen, and then sets an interval,
            //to move back and forth across the screen for the amount of time it takes for the button to travel the distance.
            if (randomDirectionNumber===0) {
                setTimeout(function () {
                    let counter = 0
                    let i = setInterval(function () {
                        if (counter % 2 == 1) {
                            let translateMovement = "translate(" + (windowWidth +windowWidthOffset - x - width - 5) + "px, 0)"
                            $(correctButton).css("transform", translateMovement)
                        } else {
                            let translateMovement = "translate(" + (-x +windowWidthOffset+ 5) + "px, 0)"
                            $(correctButton).css("transform", translateMovement)
                        }
                        counter++
                    }, 3100)
                    intervals.push(i)
                }, 2100)
            } else{
                setTimeout(function () {
                    let counter = 0
                    let i = setInterval(function () {
                        if (counter % 2 == 1) {
                            let translateMovement = "translate(0," + (windowHeight + windowHeightOffset - y - height - 5) + "px)"
                            $(correctButton).css("transform", translateMovement)
                        } else {
                            let translateMovement = "translate(0," + (-y+ windowHeightOffset + 5) + "px)"
                            $(correctButton).css("transform", translateMovement)
                        }
                        counter++
                    }, 3100)
                    intervals.push(i)
                }, 2100)
            }

            //The function finishes with picking a new trivia question, same way as before.
            var divisionIndex = Math.round(Math.random() * (divisionsArray.length-1));
            var divisionPicked = divisionsArray[divisionIndex];
            console.log(divisionPicked)
            divisionPicked1=divisionPicked;
            var divisionPickedString=divisionPicked[0].replace("_", "-")
            divisionsArray[divisionIndex][1]-=1;
            if (divisionsArray[divisionIndex][1]===0){
                divisionsArray.splice(divisionIndex, 1);
            }
            if (divisionsArray[divisionIndex][1]===0){
                divisionsArray.splice(divisionIndex,1);
            }
            $("#triviaQuestion").text(`Pick a team in the ${divisionPickedString}`)
        })

        //this function will start when the players mouse touches one of the moving buttons.
        $(document).on("mouseover", ".moving-button", function () {
            //The buttons are cleared, the gameOver page is displayed, and the score is shown and compared to the high score.
            $("#buttons").html("")
            $("#gameScore").html($("#remaining").text())
            if (Number($("#remaining").html()) > Number($("#highScore").html())) {
                $("#highScore").html($("#remaining").html())
            }
            $("#gameOver").show()
            $("#trivia").hide()
            gameCounter++

            //all of the setIntervals that were moving the buttons back and forth are cleared.
            for (let j = 0; j < intervals.length; j++) {
                clearInterval(intervals[j])
            }
            intervals = []
        })

        //will end game if you leave the playing field.
        $(document).on("mouseover", ".hoverBox", function(){
            //The buttons are cleared, the gameOver page is displayed, and the score is shown and compared to the high score.
            $("#buttons").html("")
            $("#gameScore").html($("#remaining").text())
            if (Number($("#remaining").html()) > Number($("#highScore").html())) {
                $("#highScore").html($("#remaining").html())
            }
            $("#gameOver").show()
            $("#trivia").hide()
            gameCounter++

            //all of the setIntervals that were moving the buttons back and forth are cleared.
            for (let j = 0; j < intervals.length; j++) {
                clearInterval(intervals[j])
            }
            intervals = []
            alert("Leaving the playing field automatically ends the game!")
        })

        $("#mainMenu").click(function(event){
            event.preventDefault()
            //will display the main menu div, and hide everything else.
            $("#gameOver").hide()
            $("#start-page").show()


        })
    })

})
