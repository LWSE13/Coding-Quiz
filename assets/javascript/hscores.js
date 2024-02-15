var highscores = JSON.parse(localStorage.getItem("highScores")) || [];
var highScoreContainerEl = document.getElementById("high-scores")
var returnButtonEl = document.getElementById("bck-to-quiz")
var clearScoresButtonEl = document.getElementById("clear-scores") 

scoreListEl = document.createElement("ol")
scoreListEl.classList.add("score-list")
highscores.sort(function(a, b) {
    return b.score - a.score;
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