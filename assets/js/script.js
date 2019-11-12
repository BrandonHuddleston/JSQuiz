// Vars
var bodyDiv = document.querySelector("body")
var topBar = document.querySelector(".top-bar");
var highscoreEl = document.querySelector("#highscore");
var timerEl = document.querySelector("#timer");
var landingContent = document.querySelector("#landing");
var startButton = document.querySelector("#startButton");
var questionsDiv = document.querySelector(".questions");
questionsDiv.setAttribute("style", "display: none;");
var initialsDiv = document.querySelector("#initials");
var highscoreDiv = document.querySelector("#highScoreDiv");
var buttonParent = document.querySelector("ul");
var submitButton = initialsDiv.querySelector(".submit");
var initialsInput = initialsDiv.querySelector(".inputSection");
var scoreButton = document.querySelector(".scoreButton");
var homeButton = document.querySelector(".homeButton");
var questionCounter = 0;
var scores = [];
// Checks Scores
init();

function init() {
    var storedScores = JSON.parse(localStorage.getItem("highscores"));
    
    if (storedScores !== null) {
        scores = storedScores;
    }
  }

scoreButton.addEventListener("click", function() {
    highscoreDiv.innerHTML="";
    renderScores();
});
// Timer JS
var timeLeft = questions.length * 15;
startButton.addEventListener("click", function() {
    landingContent.setAttribute("style", "display: none;");
    scoreButton.setAttribute("style", "display: none;");
    timerEl.setAttribute("style", "text-align: center;");
    var timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
        } else {
            timerEl.innerHTML = 'Time | ' + timeLeft;
            timeLeft--;

            if (questionCounter === 5) {
                clearTimeout(timerId);
            }
        }
    }
    questionFunction();
});
// Questions div JS
var questionHead = document.createElement("h2");
questionHead.setAttribute("id", "whiteBackground");
var ans1 = document.createElement("button");
ans1.setAttribute("class", "answerButton btn");
var ans2 = document.createElement("button");
ans2.setAttribute("class", "answerButton btn");
var ans3 = document.createElement("button");
ans3.setAttribute("class", "answerButton btn");
var ans4 = document.createElement("button");
ans4.setAttribute("class", "answerButton btn");
var toHome = document.createElement("button");
toHome.setAttribute("class", "btn");
toHome.setAttribute("style", "display: block; margin: auto;")

function questionFunction() {

    questionsDiv.setAttribute("style", "display: block;");

    if (questionCounter === questions.length) {
        console.log("Done");
        allDone();
    } else {
        questionHead.innerHTML="Question " + (questionCounter+1) + ": " + questions[questionCounter].title;
        questionsDiv.appendChild(questionHead);
        ans1.innerHTML=questions[questionCounter].choices[0];
        questionsDiv.appendChild(ans1);
        ans2.innerHTML=questions[questionCounter].choices[1];
        questionsDiv.appendChild(ans2);
        ans3.innerHTML=questions[questionCounter].choices[2];
        questionsDiv.appendChild(ans3);
        ans4.innerHTML=questions[questionCounter].choices[3];
        questionsDiv.appendChild(ans4);
        toHome.innerHTML='<i class="fa fa-home fa-2x"></i>';
        toHome.setAttribute("style", "color: white; margin-top: 50px; background: #575757; margin-bottom: 200px;")
        homeButton.appendChild(toHome);       
    }
    toHome.addEventListener("click", function() {
        window.location.reload();
    })
}

var isThisRight = document.createElement("p");
isThisRight.setAttribute("style", "color: white; font-style: italic; padding-top: 15px; background: #404040;")

questionsDiv.addEventListener("click", function(event) {
    if (event.target.innerHTML === questions[questionCounter].answer) {
        questionsDiv.innerHTML="";
        questionCounter++;
        questionFunction();
        isThisRight.innerHTML="Correct!";
        questionsDiv.appendChild(isThisRight);
        timerEl.setAttribute("style", "color: limegreen;")
        setTimeout(function () {
            timerEl.setAttribute("style", "color: cyan;")
        }, 1000);
        pTagDelay();
    } 
    else {
        questionsDiv.innerHTML="";
        questionFunction();
        isThisRight.innerHTML="Wrong!";
        questionsDiv.appendChild(isThisRight);
        timerEl.setAttribute("style", "color: red;")
        setTimeout(function () {
            timerEl.setAttribute("style", "color: cyan;")
        }, 1000);
        pTagDelay();
        timeLeft = timeLeft - 10;
    }

    if (timeLeft <= 0) {
        timeLeft = 0;
        clearInterval(timerInterval);
    }
})

function pTagDelay() {
    setTimeout(function () {
        isThisRight.innerHTML="";
    }, 1000);
}
function allDone() {
    toHome.setAttribute("style", "display: none;");
    questionsDiv.setAttribute("style", "display: none;");
    initialsDiv.setAttribute("style", "display: inline;");
    var finalScoreLine = initialsDiv.querySelector("#finalScore");
    finalScoreLine.innerHTML="Your final score is " + timeLeft + ".";

    function submitButtonFunc() {
        event.preventDefault();

        var inputText = initialsInput.value.trim();
        
        if (inputText === "") {
            return;
        }

        scores.push(inputText + "-" + timeLeft);
        storeScores();
        renderScores();
    }

    submitButton.addEventListener("click", submitButtonFunc);

    initialsDiv.addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
            submitButtonFunc();
        }
    })
}

function storeScores() {
    localStorage.setItem("highscores", JSON.stringify(scores));
}

function renderScores() {
    highscoreDiv.setAttribute("style", "display: none;");
    toHome.setAttribute("style", "display: none;");
    initialsDiv.setAttribute("style", "display: none;");
    questionsDiv.setAttribute("style", "display: none;");
    landingContent.setAttribute("style", "display: none;");
    highscoreDiv.setAttribute("style", "display: inline;");
    timeLeft = 0;
    var scoreHeader = document.createElement("h2");
    scoreHeader.innerHTML = "High Scores";
    highscoreDiv.appendChild(scoreHeader);

    for (var i=0; i < scores.length; i++) {
        var scoreDiv = document.createElement("div");
        scoreDiv.setAttribute("style", "background: none; border: 4px solid #404040; width: 200px; padding: 7px 7px 0px 7px; margin: 20px auto; border-radius: 10px; font-size: 22px;");
        highscoreDiv.appendChild(scoreDiv);
        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerHTML = scores[i];
        scoreDisplay.setAttribute("style", "color: #404040; font-weight: bold;")
        scoreDiv.appendChild(scoreDisplay);
    }
    // Button JS
    var gobackButton = document.createElement("button");
    gobackButton.setAttribute("id", "scorePageButtons");
    gobackButton.innerHTML = "Back To Home";
    highscoreDiv.appendChild(gobackButton);

    var clearButton = document.createElement("button");
    clearButton.setAttribute("id", "scorePageButtons");
    clearButton.innerHTML = "Clear Highscores";
    highscoreDiv.appendChild(clearButton);

    gobackButton.addEventListener("click", function() {
        window.location.reload();
    });

    clearButton.addEventListener("click", function() {
        window.localStorage.clear();
        scores = [];
        highscoreDiv.innerHTML= "";
        renderScores();
    })
}

