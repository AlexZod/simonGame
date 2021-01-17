var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;

function nextSequence() {
	level++;
	$("#level-title").html("Level " + level);
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	$("#" +  randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
	playAudio(randomChosenColour);
	}

// Слушатель нажатий на кнопки

$(".btn").click(function (event) { 
// Записывает на какие кнопки нажимат пользователь
	var userChosenColour = event.target.id;
	userClickPattern.push(event.target.id);
	animatePress(event.target.id);
	playAudio(event.target.id);
// Проверяет началась ли игра. Если игра началась активирует следующую кнопку.
	if(gameStarted === true) {
	}
	checkAnswer(userClickPattern.length-1);
});

//  Воспроизведение звука при нажатии
function playAudio (name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

// Анимация нажатия клавиши пользователем
function animatePress(currentColour) {
	$("." + currentColour).addClass("pressed");
	setTimeout(function() {
	$("." + currentColour).removeClass("pressed");
	}, 100);
}
//  Слушатель нажатий на клавиши
var gameStarted = false;
$(".start-Game-Button").click(function(){
	$(".start-Game-Button").addClass("pressedStartGameButton");
setTimeout(function() {
$(".start-Game-Button").removeClass("pressedStartGameButton");
}, 100);
	if(gameStarted === false) {
		setTimeout(function(){
		nextSequence();
		gameStarted = true;
		}, 600);
}
});
$("body").keydown(function() {
	if(gameStarted === false) {
	setTimeout(function(){
		nextSequence();
		gameStarted = true;
		}, 600);
	}
});

	function checkAnswer(currentLevel) {
		if(userClickPattern[currentLevel] === gamePattern[currentLevel]){
			console.log("succes");
			if((userClickPattern.length) === (gamePattern.length)){
		setTimeout(function(){		
			nextSequence();
			userClickPattern = [];
		}, 1000);
			}
		}
		else{	
			console.log("wrong");
			playAudio("wrong");
			$("body").addClass("game-over");
			setTimeout(function() {
				$("body").removeClass("game-over");
			}, 200);
			$("h1").html("Game over. Press any Key to Restart.");
			startOver();
		}

	}
	function startOver(){
		level = 0;
		gamePattern = [];
		userClickPattern = [];
		gameStarted = false;
	}