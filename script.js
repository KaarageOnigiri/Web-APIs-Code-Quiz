var viewHighScores = document.getElementById("viewHighScores");
var timer = document.getElementById("timer");
var questions = document.getElementById("bigLetters");
var buttons = document.getElementById("buttons");
var lists = document.getElementById("lists");
var startQuizButton = document.getElementById("startQuiz");
var wordTime = document.getElementById("wordTime");
var rightOrWrong = document.getElementById("rightOrWrong");

// -1. Set up CSS and HTML.
// -2. create an init function for bringing out localStorage high scores (lists).
// -3. when clicking on the 'start quiz' button, timer starts counting, h1 changes to questions, p's margin completely gone, 'ul' creates 3 more button.
// -4. when correctly answering a question, advance to the next question.
// -5. after answering all questions, result page shows up and show previous high scores (previous ten), then store the name and score in the localStorage if they are top 10, also stop timer.
// -6. when clicked on top left, you can switch between quiz start and viewHighScores indefinitely (except during quiz)
// -7. add game over screen (refresh to restart).
// 8. add right/wrong indicator when clicking on answer buttons.

// might use it
var mainPage = true;
var timeLeft;

// just in case
// var previousQuizScores = localStorage.getItem("previousQuizHighScores");
// var previousQuizParticipants = localStorage.getItem("previousQuizParticipants");

var previousQuizScores = JSON.parse(localStorage.getItem("previousQuizHighScores"));
var previousQuizParticipants = JSON.parse(localStorage.getItem("previousQuizParticipants"));

// test
console.log(previousQuizParticipants, previousQuizScores);

function init () {
    console.log("init");
    console.log("mainPage", mainPage);
    timeLeft = 60;
    timer.textContent = timeLeft;
    
    if (previousQuizScores === null || previousQuizParticipants === null) {
        previousQuizParticipants = ["Example1", "Example2", "Example3", "Example4", "Example5", "Example6", "Example7", "Example8", "Example9", "Example10"];
        previousQuizScores = ["50", "45", "40", "35", "30", "25", "20", "15", "10", "5"];
        // test
        console.log(previousQuizParticipants[0], previousQuizScores[0]);
        console.log(previousQuizParticipants.length, previousQuizScores.length);
    }
}

function viewTop10() {
    // test
    console.log("viewTop10");
    viewHighScores.setAttribute("style", "visibility:visible");
    // changes(1)
    // new page change (3 lines changed, 10 (possibly) added)
    viewHighScores.textContent = "Return";
    questions.textContent = "High Scores";
    lists.textContent = "";
    startQuizButton.textContent = "";
    buttons.setAttribute("style", "display:none");
    lists.setAttribute("style", "text-align:left");

    var topOfList = [""];
    console.log();
    // for loop here to show top 10 high scores
    for (x=0; x<10; x++) {
        // create elements 
        topOfList[x] = document.createElement("li");
        topOfList[x].textContent = previousQuizParticipants[x] + " : " + previousQuizScores[x];
        lists.appendChild(topOfList[x]);
    }
    mainPage = false;
    viewHighScores.removeEventListener("click", viewTop10);
    viewHighScores.addEventListener("click", defaultPage);
}

function defaultPage() {
    // test
    console.log("defaultPage");
    // changes(1) back
    viewHighScores.textContent = "View high scores";
    questions.textContent = "Coding Quiz Challenge";
    lists.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    startQuizButton.textContent = "Start Quiz";
    buttons.setAttribute("style", "display:column");
    lists.setAttribute("style", "text-align:center");
    // just to keep track
    mainPage = true;
    viewHighScores.removeEventListener("click", defaultPage);
    viewHighScores.addEventListener("click", viewTop10);
}

function startQuiz() {
    // test
    console.log("start quiz");
    questions.textContent = "";
    lists.setAttribute("style", "display:none");
    startQuizButton.setAttribute("style", "display:none");
    viewHighScores.setAttribute("style", "visibility:hidden");
    buttons.setAttribute("style", "text-align:left");

    countdown();
    question1();
}

var timeInterval;

function countdown() {
    timeLeft = 60;
    timeInterval = setInterval(function () { 
      timer.innerHTML = timeLeft;
      //test
      console.log(timeLeft);
      if(timeLeft <= 0) {    
        clearInterval(timeInterval);
        timer.innerHTML = "60";
        gameOverScreen();
      }
      // moved this to the bottom so it doesn't stop at 1 seconds.
      timeLeft--;
    }, 1000);
}

function gameOverScreen() {
    // test
    console.log("gameOverScreen")
    buttons.children[4].remove();
    buttons.children[3].remove();
    buttons.children[2].remove();
    buttons.children[1].remove();

    questions.textContent = "Game Over!"
    lists.setAttribute("style", "display:column");
    lists.textContent = "Refresh the page to try again.";
    timer.textContent = "";
    wordTime.textContent = "";
}

// -5 secs function
function minus5() {
    timeLeft = timeLeft - 5;
}

function question1() {
    // test
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
    // test
    console.log(options);

    options[0].addEventListener("click", minus5);
    options[1].addEventListener("click", question2);
    options[2].addEventListener("click", minus5);
    options[3].addEventListener("click", minus5);
}

function question2() {
    // test
    console.log("Question 2");
    console.log(buttons.children[0 + 1]);

    questions.textContent = "What is hoisting, in Javascript?";

    var options = [""];
    var fourQuestions = ["1. An act of moving codes around", "2. A practice for programmers to stand up and stretch every few hours", "3. When the codes are too huge, and the machine has trouble running it", "4. A process in which the Javacript interpreter move the declaration of functions, variables, classes, and etc. to the top of the page"];
    for (x=0; x<fourQuestions.length; x++) {
        // children + 1 because the first button is hidden (startQuizButton).
        options[x] = buttons.children[x + 1];
        options[x].textContent = fourQuestions[x]; 
    }

    options[0].removeEventListener("click", minus5);
    options[1].removeEventListener("click", question2);
    options[2].removeEventListener("click", minus5);
    options[3].removeEventListener("click", minus5);
    // these 4 lines above is 
    options[0].addEventListener("click", minus5);
    options[1].addEventListener("click", minus5);
    options[2].addEventListener("click", minus5);
    options[3].addEventListener("click", question3);
}

function question3() {
    // test
    console.log("Question 3");

    questions.textContent = "Inside which HTML element do we place the Javascript?";

    var options = [""];
    var fourQuestions = ["1. script", "2. js", "3. javascript", "4. script.js"];
    for (x=0; x<fourQuestions.length; x++) {
        options[x] = buttons.children[x + 1];
        options[x].textContent = fourQuestions[x];
    }

    options[0].removeEventListener("click", minus5);
    options[1].removeEventListener("click", minus5);
    options[2].removeEventListener("click", minus5);
    options[3].removeEventListener("click", question3);

    options[0].addEventListener("click", minus5);
    options[1].addEventListener("click", minus5);
    options[2].addEventListener("click", question4);
    options[3].addEventListener("click", minus5);
}

function question4() {
    // test
    console.log("Question 4");

    questions.textContent = "Where is the best place to insert a JavaScript in the HTML?";

    var options = [""];
    var fourQuestions = ["1. The beginning of <head> section", "2. The beginning of <body> section", "3. The end of <body> section", "4. The end of <head> section"];
    for (x=0; x<fourQuestions.length; x++) {
        options[x] = buttons.children[x + 1];
        options[x].textContent = fourQuestions[x];
    }

    options[0].removeEventListener("click", minus5);
    options[1].removeEventListener("click", minus5);
    options[2].removeEventListener("click", question4);
    options[3].removeEventListener("click", minus5);

    options[0].addEventListener("click", minus5);
    options[1].addEventListener("click", minus5);
    options[2].addEventListener("click", question5);
    options[3].addEventListener("click", minus5);
}

function question5() {
    // test
    console.log("Question 5");

    questions.textContent = "How do you create an element with Javascript in the HTML?";

    var options = [""];
    var fourQuestions = ["1. document.createElement()", "2. document.setElement()", "3. document.makeElement()", "4. document.element()"];
    for (x=0; x<fourQuestions.length; x++) {
        options[x] = buttons.children[x + 1];
        options[x].textContent = fourQuestions[x];
    }

    options[0].removeEventListener("click", minus5);
    options[1].removeEventListener("click", minus5);
    options[2].removeEventListener("click", question5);
    options[3].removeEventListener("click", minus5);

    options[0].addEventListener("click", quizCompleted);
    options[1].addEventListener("click", minus5);
    options[2].addEventListener("click", minus5);
    options[3].addEventListener("click", minus5);
}

function quizCompleted() {
    var options = [""];
    var fourQuestions = ["", "", "", ""]
    for (x=0; x<fourQuestions.length; x++) {
        options[x] = buttons.children[x + 1];
    }

    options[0].removeEventListener("click", quizCompleted);
    options[1].removeEventListener("click", minus5);
    options[2].removeEventListener("click", minus5);
    options[3].removeEventListener("click", minus5);
    // only show it after user fill in inputs or restart 
    // viewHighScores.setAttribute("style", "visibility:visible");
    console.log(buttons.children);
    // remove last 4 child nodes
    buttons.children[4].remove();
    buttons.children[3].remove();
    buttons.children[2].remove();
    buttons.children[1].remove();
    // quizStartButton shows up again
    startQuizButton.setAttribute("style", "display:column");
    // time stop   
    clearInterval(timeInterval);
    userInfo();
}



function userInfo() {
    // test
    console.log("userInfo")
    console.log(timeLeft, previousQuizScores[9]);
    // previousQuizParticipants = ["Example1", "Example2", "Example3", "Example4", "Example5", "Example6", "Example7", "Example8", "Example9", "Example10"];
    // previousQuizScores = ["50", "45", "40", "35", "30", "25", "20", "15", "10", "5"];
    // if user didn't make top 10, present this message to them
    
    if (timeLeft < previousQuizScores[9]) {
        console.log("tryAgain");
        questions.setAttribute("style", "text-align:center")
        questions.textContent = " 10th place's score was " + previousQuizScores[9] + ", and your score was " + timeLeft + ". Please refresh the page to try again!";
        lists.setAttribute("style", "display:column");
        lists.textContent = "";
        startQuizButton.textContent = "";
        buttons.setAttribute("style", "display:none");
    }
    else {
        // before adjusting ranking, get user to fill in initial.
        // before localStorage, adjust the array according to ranking, with for loop.
        // add localStorage function after
        // localStorage.setItem("", JSON.stringify());
        
        questions.setAttribute("style", "text-align:center")
        questions.textContent = "Please fill in your name below and click submit to view your ranking!";
        lists.setAttribute("style", "display:column");
        lists.textContent = "";
        startQuizButton.textContent = "";
        buttons.setAttribute("style", "display:none");
        
        var userInput = document.createElement("input");
        userInput.setAttribute("label", "submit");
        userInput.setAttribute("style", "border:1px solid darkgrey; padding: 5px; display:flex; flex-direction:column; margin-bottom:15px");
        userInput.placeholder = "Type name here...";
        lists.appendChild(userInput);

        var userSubmit = document.createElement("button");
        userSubmit.textContent = "Submit";
        lists.appendChild(userSubmit);

        // var userInputValue = userInput.value;
        // console.log(userInput.value);
        userSubmit.addEventListener("click", submitScore);
    }
}

function submitScore() {
    // test
    console.log("submitScore");
    
    var userInput = lists.children[0];
    var userSubmit = lists.children[1];
    // if user didn't put in name.
    // if (userInput.value = "") {
    //     userInput.value = undefined;
    // }
    console.log(userInput.value, timeLeft,previousQuizParticipants, previousQuizScores, previousQuizScores.length);

    for (x=0; x<10; x++) {
        if (timeLeft >= previousQuizScores[x]) {
            previousQuizScores.splice(x, 0, timeLeft);
            // add new name into previousQuizParticipants.
            previousQuizParticipants.splice(x, 0, userInput.value);
            // test
            console.log(previousQuizParticipants, previousQuizScores);
            localStorage.setItem("previousQuizParticipants", JSON.stringify(previousQuizParticipants));
            localStorage.setItem("previousQuizHighScores", JSON.stringify(previousQuizScores));
            viewTop10();
        }
    }
}


viewHighScores.addEventListener("click", viewTop10);
startQuizButton.addEventListener("click", startQuiz);

init();
