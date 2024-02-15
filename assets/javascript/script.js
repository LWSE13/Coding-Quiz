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
  //firstly clears the inner html of the questionHeaderEl and selectionsEl in order to prevent questions and answers from staying
  questionHeaderEl.innerHTML = '';
  selectionsEl.innerHTML = '';
  //currentQuestion = the index of the questions array
  currentQuestion = questions[questionIndex];
  //creates a variable called questionTitleEl that creates a p element
  var questionTitleEl = document.createElement('p');
  //sets the text content of the questionTitleEl to the currentQuestion.title (title of the question in the array)
  questionTitleEl.textContent = currentQuestion.title;
  //adding a classlist allows me to style my js variablesusing my css file
  questionTitleEl.classList.add("question-heading")
  //appends the questionTitleEl to the questionHeaderEl (places the questionTitleEl inside the questionHeaderEl div element)
  questionHeaderEl.appendChild(questionTitleEl);

  //creates a variable called selectionsContainerEl that creates a div element
  var selectionsContainerEl = document.createElement('div');
  //adds a classlist to the selectionsContainerEl
  selectionsContainerEl.classList.add("selections-container")
  //simple for loop that creates a variable called i which is 0. As long as i is less than currentQuestion.choices.length, (the length of the choices for the question) 
  //i will increase by 1 and run the following code...
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    //it will create a choiceEl variable that creates a button element
    var choiceEl = document.createElement('button');
    //it will then set the text content of the button to the question choice using i as an index for what choice to use
    choiceEl.textContent = currentQuestion.choices[i];
    //it will then add a classlist to the choiceEl
    choiceEl.classList.add("answer-button-styling")
    //it will then append the choiceEl to the selectionsContainerEl
    selectionsContainerEl.appendChild(choiceEl);
    //finally, it adds an event listener to listen for a click before running the following function
    choiceEl.addEventListener("click", function() {
      //it will now run the answerSelect.call function: the .call method calls the function. the (this) section represents the button that was clicked
      //to put simply you can read it backwards as THIS button Calls the ANSWERSELECT
      answerSelect.call(this);
      //increments the questionIndex by 1
      questionIndex++;
      //if the questionIndex is less than the length of the questions array, it will run the updateQuestionDisplay function again to display the next question
      //else it will run the stopQuiz function
      if (questionIndex < questions.length) {
        updateQuestionDisplay();
      } else {
        stopQuiz();
      }
    });
  }
  //appends the selectionsContainerEl to the selectionsEl 
  selectionsEl.appendChild(selectionsContainerEl);
}

function answerSelect() {
  //creates a variable called correctAnswer that represents the answer variable in the questions array
  var correctAnswer = questions[questionIndex].answer;
  //creates a variable called userAnswer which represents the text content of "this"
  //once again, this represents the element that triggered the function in our case it was the selection button that was clicked
  var userAnswer = this.textContent;

  var correctSound = document.getElementById("correct-sound");
  var incorrectSound = document.getElementById("incorrect-sound");
  //if the userAnswer is equal to the correctAnswer, the score will increase by 20 and the messageEl will display "Correct!"
  if (userAnswer === correctAnswer) {
    score+= 20;
    //removes the incorrect class and adds the correct class to the messageEl
    //this prevents any of the two classes from ovverriding one another
    messageEl.classList.remove("incorrect")
    messageEl.classList.add("correct")
    messageEl.style.opacity = 1;
    messageEl.textContent = "Correct!";
    correctSound.play();
    //if the userAnswer is not equal to the correctAnswer, the secondsLeft will decrease by 10 and the messageEl will display "Incorrect!"
  } else {
    secondsLeft -= 10;
    timerEl.textContent = secondsLeft;
    messageEl.classList.remove("correct")
    messageEl.classList.add("incorrect")
    messageEl.style.opacity = 1;
    messageEl.textContent = "Incorrect!";
    incorrectSound.play();
  }
  //this setTimeout function removes the messageEl text content and sets the opacity to 0 after 1 second
  //pretty much just getting rid of the messageEl and it's styling after 1 second
  setTimeout(function() {
    messageEl.textContent = "";
    messageEl.style.opacity = 0;
  }, 1000);
}

function stopQuiz() {
  //clears the quiz's timer and replaces the text content to display "Time's up!"
  //hides all screens and displays the results screen with a result message
  clearInterval(timerInterval);
  timerEl.textContent = "Time's up!";
  questionScreenEl.style.display = "none";
  welcomeScreenEl.style.display = "none";
  resultsScreenEl.style.display = "flex";
  resultsMessageEl.classList.add("question-heading")
  resultsMessageEl.textContent = "You scored " + score + " / 100!";
}

function startQuiz() {
  //resets the questionIndex, secondsLeft to 61 and score to 0
  questionIndex = 0;
  secondsLeft = 61;
  score = 0;
//uses setInterval to run the following function every 1 second
  timerInterval = setInterval(function() {
    //if secondsLeft is greater than 0, it will decrease the secondsLeft by 1 and the timerEl text content will be updated to the new secondsLeft
    if (secondsLeft > 0) {
      secondsLeft--;
      timerEl.textContent = secondsLeft;
      //else if the timer reaches 0, it will run the stopQuiz function
    } else {
      stopQuiz();
    }
  }, 1000)
  //hides all screens except for the question screen and runs the updateQuestionDisplay function to display the first question
  welcomeScreenEl.style.display = "none";
  questionScreenEl.style.display = "flex";
  resultsScreenEl.style.display = "none";
  updateQuestionDisplay();
}
//event listeners that listen for a click on the start and restart buttons and run the startQuiz function
startButtonEl.addEventListener("click", startQuiz);
restartButtonEl.addEventListener("click", startQuiz);
//when you click the view high scores button it will take you to the highscores.html page
ViewHscoresEl.addEventListener("click", function() {
  window.location.href = "hscores.html";
});
//when you click the submit score button it will check if the user has entered anything within the input field
//if they haven't it will alert them to enter their initials
submitScoreButtonEl.addEventListener("click", function() {
  if (userInitialsInputEl.value === "") {
    alert("Please enter your initials!");
    return;
  }
  //creates a userInitials variable that is equal to the value of the userInitialsInputEl
  var userInitials = userInitialsInputEl.value;
  //creates a highscores variable that retrieves the highScores from local storage or creates an empty array if there are no highScores
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  //creates an object called userScore that has two variables within
  //initials is the userInitials variable. I used the .touppercase function to make what the user entered uppercase 
  var userScore = {
      initials: userInitials.toUpperCase(),
      //score is the score variable gathered throughout the quiz
      score: score
  };  
  //pushes the userScore object into the highScores array
  highScores.push(userScore);
//clears the inner html of the userInitialsInputEl and sets the scoreSubmittedText to a p element with the text content "Score submitted!"
  userInitialsInputEl.value = "";
  scoreSubmittedText = document.createElement("p");
  scoreSubmittedText.textContent = "Score submitted!";
  //clears the scoreSubmittedText after 1 second
  setTimeout(function() {
    scoreSubmittedText.textContent = "";
  }, 1000);
  //appends the scoreSubmittedText to the submitScoreButtonEl's parent node
  submitScoreButtonEl.parentNode.appendChild(scoreSubmittedText);
//stores the highScores array in local storage as a string
  localStorage.setItem("highScores", JSON.stringify(highScores));
});