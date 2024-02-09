var startQuizEl = document.getElementById("start-quiz");

var welcomeScreenEl = document.getElementById("welcome-box");
var questionScreenEl = document.getElementById("question-box");
var ResultsScreenEl = document.getElementById("results-box");
var resultsMessageEl = document.getElementById("result-message");
var selectionsEl = document.getElementById("selections");
var messageEl = document.getElementById("message");
var timerEl = document.getElementById("timer");

var secondsLeft = 0;
var currentQuestion = 0;
var score = 0;
var timerInterval = 0;

function startQuiz() {
  secondsLeft = 90;
  currentQuestion = 0;
  score = 0;


  if (secondsLeft > 0) {
    timerEl.textContent = secondsLeft;
  } else {
    stopQuiz();
  }
} 

function stopQuiz() {
  clearInterval(timerInterval);
  timerEl.textContent = "Time's up!";
 questionScreenEl.style.display = "none";
 welcomeScreenEl.style.display = "none";
 ResultsScreenEl.style.display = "flex";
 resultsMessageEl.textContent = "You scored " + score;
}