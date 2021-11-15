
var buttonColors = ["red","green", "blue", "yellow"];

var gamePattern = [];
var userClickedPatter = [];

var started = false;
var level = 0;

//keypress
$(document).keypress(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function(){

    var useChosenColor = $(this).attr("id"); 
    userClickedPatter.push(useChosenColor);

    playSound(useChosenColor);
    animatePress(useChosenColor);

    checkAnswer(userClickedPatter.length - 1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPatter[currentLevel]){
        if(userClickedPatter.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence(){
    userClickedPatter = [];

    level++;
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //flash the button
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    //play sound for the button
    playSound(randomChosenColor);
}

function animatePress(currentColor){
    $('#' + currentColor).addClass("pressed");
    setTimeout(function(){
        $('#' + currentColor).removeClass("pressed");
    }, 100);
}



//play sound
function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}



