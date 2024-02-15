//gets the highscores from local storage and parses it into a variable
var highscores = JSON.parse(localStorage.getItem("highScores")) || [];
//creates global variables that take elements from my html
var highScoreContainerEl = document.getElementById("high-scores")
var returnButtonEl = document.getElementById("bck-to-quiz")
var clearScoresButtonEl = document.getElementById("clear-scores") 

//creates an ordered list element and gives it a class of score-list
scoreListEl = document.createElement("ol")
scoreListEl.classList.add("score-list")
//sorts the highscores array in order of the highest score
//y.score - x.score takes the result of the two scores being compared and gives a positive or negative value
//if positive y's score will be placed before x's score if negative vice versa. This achieves an ordered highscore list from highest to lowest
highscores.sort(function(x, y) {
    return y.score - x.score;
  });

for (var i = 0; i < highscores.length; i++) {
    var playerScore = document.createElement("li");
playerScore.classList.add("list-item")
    playerScore.textContent = highscores[i].initials + ": " + highscores[i].score;
    scoreListEl.appendChild(playerScore)
}

highScoreContainerEl.appendChild(scoreListEl)

returnButtonEl.addEventListener("click", function(){
    window.location.href = "index.html";
})
clearScoresButtonEl.addEventListener("click", function () {
    localStorage.clear();
    scoreListEl.innerHTML = "";
})