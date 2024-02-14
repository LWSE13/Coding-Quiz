//declared set of variables that selects elements to be used in the script
var startQuizEl = document.getElementById("start-quiz");
var quizContainerEl = document.querySelector('.quiz-container');
var welcomeScreenEl = document.getElementById("welcome-box");
var questionScreenEl = document.getElementById("question-box");
var resultsScreenEl = document.getElementById("result-screen");
var resultsMessageEl = document.getElementById("result-message");
var questionHeaderEl = document.getElementById("question-title");
var selectionsEl = document.getElementById("selections");
var messageEl = document.getElementById("message");
var timerEl = document.getElementById("timer");
var startButtonEl = document.getElementById("start-quiz");
var restartButtonEl = document.getElementById("restart-quiz");
var ViewHscoresEl = document.getElementById("view-high-scores");
var submitScoreButtonEl = document.getElementById("submit-score");
var userInitialsInputEl = document.getElementById("user-initials");
//declared global variables to be used within my functions
var secondsLeft = 0;
var score = 0;
var timerInterval;

function updateQuestionDisplay() {
  questionHeaderEl.innerHTML = '';
  selectionsEl.innerHTML = '';
  currentQuestion = questions[questionIndex];
  var questionTitleEl = document.createElement('p');
  questionTitleEl.textContent = currentQuestion.title;
  questionHeaderEl.appendChild(questionTitleEl);

  var selectionsContainerEl = document.createElement('div');
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choiceEl = document.createElement('button');
    choiceEl.textContent = currentQuestion.choices[i];
    selectionsContainerEl.appendChild(choiceEl);
    choiceEl.addEventListener("click", function() {
      //
      answerSelect.call(this);
      questionIndex++;
      if (questionIndex < questions.length) {
        updateQuestionDisplay();
      } else {
        stopQuiz();
      }
    });
  }
  selectionsEl.appendChild(selectionsContainerEl);
}

function answerSelect() {
  var correctAnswer = questions[questionIndex].answer;
  var userAnswer = this.textContent;
  if (userAnswer === correctAnswer) {
    score+= 20;
    messageEl.textContent = "Correct!";
  } else {
    secondsLeft -= 10;
    timerEl.textContent = secondsLeft;
    messageEl.textContent = "Incorrect!";
  }
  setTimeout(function() {
    messageEl.textContent = "";
  }, 1000);
}

function stopQuiz() {
  clearInterval(timerInterval);
  timerEl.textContent = "Time's up!";
  questionScreenEl.style.display = "none";
  welcomeScreenEl.style.display = "none";
  resultsScreenEl.style.display = "flex";
  resultsMessageEl.textContent = "You scored " + score + " / 100!";
}

function startQuiz() {
  questionIndex = 0;
  secondsLeft = 61;
  score = 0;

  timerInterval = setInterval(function() {
    if (secondsLeft > 0) {
      secondsLeft--;
      timerEl.textContent = secondsLeft;
    } else {
      stopQuiz();
    }
  }, 1000)
  welcomeScreenEl.style.display = "none";
  questionScreenEl.style.display = "flex";
  resultsScreenEl.style.display = "none";
  updateQuestionDisplay();
}

startButtonEl.addEventListener("click", startQuiz);
restartButtonEl.addEventListener("click", startQuiz);
ViewHscoresEl.addEventListener("click", function() {
  window.location.href = "hscores.html";
});
submitScoreButtonEl.addEventListener("click", function() {
  var userInitials = userInitialsInputEl.value;
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  var newScore = {
      initials: userInitials,
      score: score
  };

  highScores.push(newScore);

  userInitialsInputEl.value = "";
  scoreSubmittedText = document.createElement("p");
  scoreSubmittedText.textContent = "Score submitted!";
  submitScoreButtonEl.parentNode.appendChild(scoreSubmittedText);

  localStorage.setItem("highScores", JSON.stringify(highScores));
});