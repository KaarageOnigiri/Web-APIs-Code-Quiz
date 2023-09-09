var viewHighScores = document.getElementById("viewHighScores");
var timer = document.getElementById("timer");
var questions = document.getElementById("bigLetters");
var buttons = document.getElementById("buttons");
var lists = document.getElementById("lists");
var startQuizButton = document.getElementById("startQuiz");
// use class, change it when click so it doesn't click both at once (because id).
var changeToViewHighScores = document.querySelector(".viewHighScores");
var changeToViewDefaultPage = document.querySelector(".viewDefaultPage");

// test
console.log();

// -1. Set up CSS and HTML.
// -2. create an init function for bringing out localStorage high scores (lists).
// 3. when clicking on the 'start quiz' button, timer starts counting, h1 changes to questions, p's margin completely gone, 'ul' creates 3 more button.
// 4. when correctly answering a question, advance to the next question.
// 5. after answering all questions, result page shows up and show previous high scores (previous ten), then store the name and score in the localStorage if they are top 10.
// 6. when clicked on top left, you can switch between quiz start and viewHighScores indefinitely (except during quiz)

// might use it
var mainPage = true;
var timeLeft;
var previousQuizScores = JSON.parse(localStorage.getItem("previousQuizHighScores"));
var previousQuizParticipants = JSON.parse(localStorage.getItem("previousQuizParticipants"));
// test
console.log(previousQuizScores);

function init () {
    console.log("init");
    console.log("mainPage", mainPage);
    timeLeft = 60;
    timer.textContent = timeLeft;
    if (previousQuizScores === null || previousQuizParticipants === null) {
        previousQuizParticipants = ["EXAMPLE"];
        previousQuizScores = ["30"];
        // test
        console.log(previousQuizParticipants[0], previousQuizScores[0]);
        console.log(previousQuizParticipants.length, previousQuizScores.length);
    }
};

function viewTop10(event) {
    event.stopPropagation();
    // test
    console.log("viewTop10");
    // changes(1)
    //button for back to homepage (only visual)
    // new page change (3 lines changed, 10 (possibly) added)
    viewHighScores.textContent = "Return";
    questions.textContent = "High Score";
    lists.textContent = "";
    startQuizButton.textContent = "";
    buttons.setAttribute("style", "display:none");
    lists.setAttribute("style", "text-align:left");
    // this
    viewHighScores.setAttribute("class", ".viewDefaultPage");
    console.log(changeToViewHighScores);

    var topOfList = [""];
    console.log();
    // for loop here with .length
    for (x=0; x<previousQuizParticipants.length; x++) {
        // create elements 
        topOfList[x] = document.createElement("li");
        topOfList[x].textContent = previousQuizParticipants[x] + ": " + previousQuizScores[x];
        lists.appendChild(topOfList[x]);
    }
    
    // just to keep track
    mainPage = false;
    // viewHighScores.addEventListener("click", defaultPage);
};

function defaultPage(event) {
    event.stopPropagation();
    console.log("defaultPage");
    // changes(1) back
    viewHighScores.textContent = "View high scores";
    questions.textContent = "Coding Quiz Challenge";
    lists.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    startQuizButton.textContent = "Start Quiz";
    buttons.setAttribute("style", "display:column");
    lists.setAttribute("style", "text-align:center");
    // this
    viewHighScores.setAttribute("class", ".viewHighScores");

    // just to keep track
    mainPage = true;
};

function startQuiz() {
    console.log("start quiz");
};







changeToViewHighScores.addEventListener("click", viewTop10);
// changeToViewDefaultPage.addEventListener("click", defaultPage);

startQuizButton.addEventListener("click", startQuiz);

init();