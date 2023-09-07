var viewHighScores = document.getElementById("viewHighScores");
var timer = document.getElementById("timer");
var questions = document.getElementById("bigLetters");
var lists = document.getElementById("buttonsAndLists");
var startQuizButton = document.getElementById("startQuiz")

// test
console.log();

// -1. Set up CSS and HTML.
// 2. create an init function for bringing out localStorage high scores (lists).
// 3. when clicking on the 'start quiz' button, timer starts counting, h1 changes to questions, p's margin completely gone, 'ul' creates 3 more button.
// 4. when correctly answering a question, advance to the next question.
// 5. after answering all questions, result page shows up and show previous high scores (previous ten), then store the name and score in the localStorage if they are top 10.

var timeLeft;
var previousQuizScores = JSON.parse(localStorage.getItem("previousQuizHighScores"));
var previousQuizParticipants = JSON.parse(localStorage.getItem("previousQuizParticipants"));
// test
console.log(previousQuizScores);

function init () {
    timeLeft = 60;
    timer.textContent = timeLeft;
    if (previousQuizScores === null || previousQuizParticipants === null) {
        previousQuizParticipants = ["EXAMPLE"];
        previousQuizScores = ["30"];
        // test
        console.log(previousQuizParticipants, previousQuizScores);
    }
};

function viewTop10() {
    // later
};

function startQuiz() {
    console.log("hello");
};






viewHighScores.addEventListener("click", viewTop10);
startQuizButton.addEventListener("click", startQuiz);

init();