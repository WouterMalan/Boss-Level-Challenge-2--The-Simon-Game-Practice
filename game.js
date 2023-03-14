var buttonColors = ["red" , "blue" , "green" , "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started  = false;
var level  = 0;

$(document).keypress(function() {
  if(!started){ // if started is false then only it will run 
    $("#level-title").text("Level " + level);
    started = true;
  }

});

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  

});

function checkAnswer(currentLevel) {

  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else{
    console.log("wrong");
    $("body").addClass("game-over");
    $("level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    },2000);

    startOver();
  }
}


function nextSequence() {
  userClickedPattern = [];
  level++;

  $("level-title").text("Level " + level);
  
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}