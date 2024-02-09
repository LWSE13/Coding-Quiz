
//declared set of variables that selects elements to be used in the script
var startQuizEl = document.getElementById("start-quiz");
var welcomeScreenEl = document.getElementById("welcome-box");
var questionScreenEl = document.getElementById("question-box");
var resultsScreenEl = document.getElementById("result-screen");
var resultsMessageEl = document.getElementById("result-message");
var selectionsEl = document.getElementById("selections");
var messageEl = document.getElementById("message");
var timerEl = document.getElementById("timer");
var startButtonEl = document.getElementById("start-quiz");
var restartButtonEl = document.getElementById("restart-quiz");

//declared global variables to be used within my functions
var secondsLeft = 0;
var currentQuestion = 0;
var score = 0;
var timerInterval 


function stopQuiz() {
  clearInterval(timerInterval);
  timerEl.textContent = "Time's up!";
 questionScreenEl.style.display = "none";
 welcomeScreenEl.style.display = "none";
 resultsScreenEl.style.display = "flex";
 resultsMessageEl.textContent = "You scored " + score;
}

function startQuiz() {
  secondsLeft = 9;
  currentQuestion = 0;
  score = 0;

  timerInterval = setInterval(function() {
    if (secondsLeft > 0) {
      secondsLeft--;
      timerEl.textContent = secondsLeft;
    } else {
      stopQuiz();
    }
  },1000)
  welcomeScreenEl.style.display = "none";
  questionScreenEl.style.display = "flex";
  resultsScreenEl.style.display = "none";
}

startButtonEl.addEventListener("click", startQuiz);
restartButtonEl.addEventListener("click", startQuiz);