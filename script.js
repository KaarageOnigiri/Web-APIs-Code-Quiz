var viewHighScores = document.getElementById("viewHighScores");
var timer = document.getElementById("timer");
var questions = document.getElementById("bigLetters");
var buttons = document.getElementById("buttons");
var lists = document.getElementById("lists");
var startQuizButton = document.getElementById("startQuiz");
// use class, change it when click so it doesn't click both at once (because id).
var container = document.querySelector(".container")
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
    // this is a problem 
    viewHighScores.setAttribute("class", "viewDefaultPage");
    // this is null 
    console.log(changeToViewDefaultPage);

    var topOfList = [""];
    console.log();
    // for loop here with .length
    for (x=0; x<previousQuizParticipants.length; x++) {
        // create elements 
        topOfList[x] = document.createElement("li");
        topOfList[x].textContent = previousQuizParticipants[x] + ": " + previousQuizScores[x];
        lists.appendChild(topOfList[x]);
    }

    // if (mode === "dark") {
    //     mode = "light";
    //     container.setAttribute("class", "light");
    //   }
    
    
    // just to keep track
    mainPage = false;
    // this one doesn't work:
    // changeToViewDefaultPage.addEventListener("click", defaultPage);
    // so I use this one
    viewHighScores.addEventListener("click", defaultPage);
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
    // this is a problem
    viewHighScores.setAttribute("class", "viewHighScores");

    // just to keep track
    mainPage = true;
};

function startQuiz() {
    console.log("start quiz");
    questions.textContent = "";
    lists.setAttribute("style", "display:none");
    startQuizButton.setAttribute("style", "display:none");
    viewHighScores.setAttribute("style", "visibility:hidden");
    buttons.setAttribute("style", "text-align:left");

    countdown();
    question1();
};

function countdown() {
    timeLeft = 60;
  
    var timeInterval = setInterval(function () { 
      timer.innerHTML = timeLeft; 
      //test
      console.log(timeLeft);
      if(timeLeft === 0) {    
        clearInterval(timeInterval);
        timer.innerHTML = "60";
        // this function below is to make the user fill in their information (initials)
        // function here
      }
      // moved this to the bottom so it doesn't stop at 1 seconds.
      timeLeft--;
    }, 1000);
}

// -5 secs function
function minus5() {
    timeLeft = timeLeft - 5;
}

function question1() {
    console.log("Question 1");
    
    questions.textContent = "Which of the following is the Boolean values?";

    var options = [""];
    var fourQuestions = ["1. 0, 1", "2. true, false", "3. 1, 2", "4. string, number"];
    for (x=0; x<fourQuestions.length; x++) {
        // create elements 
        options[x] = document.createElement("button");
        options[x].textContent = fourQuestions[x];
        buttons.appendChild(options[x]);
    }
    console.log(options);

    options[0].addEventListener("click", minus5);
    options[1].addEventListener("click", question2);
    options[2].addEventListener("click", minus5);
    options[3].addEventListener("click", minus5);
}

function question2() {
    console.log("Question 2");

    questions.textContent = [""]
}






viewHighScores.addEventListener("click", viewTop10);
// this is an error for some reason.
// changeToViewDefaultPage.addEventListener("click", defaultPage);

startQuizButton.addEventListener("click", startQuiz);

init();