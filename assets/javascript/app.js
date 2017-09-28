// Coding Boot Camp week 5 homework. Trivia game. 


// variables
var imagePath = "assets/images/";		// this is the path to the images folder

var answerTime = 10;					// amount of time that the user has to answer a question

var timeRemaining = 10;					// amount of time remaining to answer a question, reset to answerTime at the start of each question

var intervalID;							// variable associated with the interval timer

var currentQuestion = 0;				// the index value of the question that is currently being asked

var currentAnswer = "";					// variable containing the current correct answer

var currentImage = "";					// variable containing the path to the current image

var message = "";						// message to be shown to the user after a question round

var totalCorrect = 0;					// total number of correct answers

var totalWrong = 0;						// total umber of wrong answers

var totalTimeUp = 0;					// total number of questions where time ran out

var questions = [
{	question: "What is the name of the studio where The Beatles recorded their first album?",
	options: ["Abbey Road", "Mersey Avenue", "Liverpool Street", "Quarry Lane"],
	answer: "Abbey Road", image: "abbeyRoad.gif"},

{	question: "Which Rolling Stones song was used as the theme for the TV series 'Tour of Duty'?",
	options: ["Ruby Tuesday", "Paint it Black", "Brown Sugar", "Start Me Up"],
	answer: "Paint it Black", image: "rollingStones.gif"},

{	question: "Who sang a duet with Freddie Mercury on the Queen song 'Under Pressure'?",
	options: ["Eric Clapton", "Elton John", "David Bowie", "Vanilla Ice"],
	answer: "David Bowie", image: "bowie.gif"},

{	question: "What is the home town of the band Oasis?",
	options: ["London", "Liverpool", "Edinburgh", "Manchester"],
	answer: "Manchester", image: "oasis.gif"},

]



// functions

// start the timer
function startTimer() {

	// reset the timer to the time allowed for each answer
	timeRemaining = answerTime;

	// run the countdown every second
	intervalId = setInterval(countdown, 1000);
} //end of startTimer function


// decrease the timer every second until it reaches zero
function countdown() {

	//  Decrease number by one.
	timeRemaining--;

    //  Show the timer in the timer div.
    $("#timer").text("Time remaining: " + timeRemaining + " seconds");

    //  if timer reaches zero...
    if (timeRemaining === 0) {

    	// run the timesUp function
        stopTimer("You've run out of time to answer this question.");
        totalTimeUp ++;
        showAnswer();
    }
} //end of countdown function


// run if the question is answered or if the countdown reaches zero
function stopTimer(message) {

	// clear the interval
	clearInterval(intervalId);

	// message to user
    $("#timer").html(message);
} //end of stopTimer function


// display a question with buttons for answer options
function newQuestion(questionIndex) {

	currentAnswer = questions[questionIndex].answer;			// set the current answer to the current question

	currentImage = imagePath + questions[questionIndex].image;	// set the path of the image associated with the question

	var answerOptions = questions[questionIndex].options;		// shorthand for the location of the answer options in the questions object


	// empty the divs
	$("#timer").empty();
	$("#question").empty();
	$("#answers").empty();

	// create a div for the question and add the question text
	var newQuestion	= $("<div>");

		newQuestion.text("Question: " + questions[questionIndex].question);

	// show the question on screen
	$("#question").html(newQuestion);

	// create a button for each answer option and show on screen
	for (var i = 0; i < answerOptions.length; i++) {

		var newButton = $("<button>");
			newButton.text(answerOptions[i]);
			newButton.attr("value", answerOptions[i]);
			newButton.addClass("answerButton");

		$("#answers").append(newButton);
	}

	// assign click function to answer buttons
	$ (".answerButton").on("click", function() {

		// store the user's guess in a variable
		var guess = $(this).attr("value");

		// if guess is correct..
		if (guess === currentAnswer) {
			stopTimer("Correct!");
			totalCorrect ++;
			showAnswer();
		}

		// if guess is wrong...
		else {
			stopTimer("Sorry, that's the wrong answer.");
			totalWrong ++;
			showAnswer();
		}

	}); //end of click function for answer buttons

} //end of question function


// show the correct answer, then decide if a new question should be shown
function showAnswer() {

	var answerPanel = $("<div>");

		answerPanel.addClass(".answerPanel");
		answerPanel.text("Answer: " + currentAnswer);

	var answerImage = $("<img>");

		answerImage.addClass("answerImage");
		answerImage.attr("src", currentImage);


	$("#answers").html(answerPanel);
	$("#answers").append(answerImage);

	currentQuestion ++;

	setTimeout(nextQuestion, 3000);

} //end of showAnswer function


// either show a new question or game over
function nextQuestion() {

	if (currentQuestion < questions.length) {
		
		newQuestion(currentQuestion);

		startTimer();	

	} else {

		gameOver();
	}
}


// game over
function gameOver() {

	$("#timer").html("Thanks for playing!");
	$("#question").empty();
	$("#answers").html("<p>Number of questions answered correctly: " + totalCorrect + "</p>");
	$("#answers").append("<p>Number of questions answered incorrectly: " + totalWrong + "</p>");
	$("#answers").append("<p>Number of questions not answered: " + totalTimeUp + "</p>");
}



// run the following after the document has loaded
$(document).ready(function() {

	// start button calls the first question and starts the timer
	$ ("#startButton").on("click", function() {
		newQuestion(currentQuestion);

		startTimer();
	});
});


