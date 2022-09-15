// question 1
var q1 = {
    question : "What is JavaScript?",
    choiceA : "a) JavaScript is a scripting language used to make the website interactive",
    choiceB : "b) JavaScript is an assembly language used to make the website interactive",
    choiceC : "c) JavaScript is a compiled language used to make the website interactive",
    choiceD : "d) None of the mentioned",
    answer : "choice_a"
}
// question 2
var q2 = {
    question : "Which of the following is correct about JavaScript?",
    choiceA : "a) JavaScript is an Object-Based language",
    choiceB : "b) JavaScript is Assembly-language",
    choiceC : "c) JavaScript is an Object-Oriented language",
    choiceD : "d) JavaScript is a High-level language",
    answer : "choice_a"
}
// question 3
var q3 = {
    question : "Among the given statements, which statement defines closures in JavaScript?",
    choiceA : "a) JavaScript is a function that is enclosed with references to its inner function scope",
    choiceB : "b) JavaScript is a function that is enclosed with references to its lexical environment",
    choiceC : "c) JavaScript is a function that is enclosed with the object to its inner function scope",
    choiceD : "d) None of the mentioned",
    answer : "choice_b"
}
//4
var q4 = {
    question : "Arrays in JavaScript are defined by which of the following statements?",
    choiceA : "a) It is an ordered list of values",
    choiceB : "b) It is an ordered list of objects",
    choiceC : "c) It is an ordered list of string",
    choiceD : "d) It is an ordered list of functions",
    answer : "choice_a"
}
//5
var q5 = {
    question : "Which of the following is not javascript data types?",
    choiceA : "a) Null type",
    choiceB : "b) Undefined type",
    choiceC : "c) Number type",
    choiceD : "d) All of the mentioned",
    answer : "choice_d"
}
//6
var q6 = {
    question : "Where is Client-side JavaScript code is embedded within HTML documents?",
    choiceA : "a) A URL that uses the special javascript:code",
    choiceB : "b) A URL that uses the special javascript:protocol",
    choiceC : "c) A URL that uses the special javascript:encoding",
    choiceD : "d) A URL that uses the special javascript:stack",
    answer : "choice_b"
}
//7
var q7 = {
    question : "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
    choiceA : "a) Position",
    choiceB : "b) Window",
    choiceC : "c) Standard",
    choiceD : "d) Location",
    answer : "choice_b"
}
//8
var q8 = {
    question : "Which of the following can be used to call a JavaScript Code Snippet?",
    choiceA : "a) Function/Method",
    choiceB : "b) Preprocessor",
    choiceC : "c) Triggering Event",
    choiceD : "d) RMI",
    answer : "choice_a"
}
//9
var q9 = {
    question : "Which of the following explains correctly what happens when a JavaScript program is developed on a Unix Machine?",
    choiceA : "a) will work perfectly well on a Windows Machine",
    choiceB : "b) will be displayed as JavaScript text on the browser",
    choiceC : "c) will throw errors and exceptions",
    choiceD : "d) must be restricted to a Unix Machine only",
    answer : "choice_a"
}
//10
var q10 = {
    question : "Which of the following scoping type does JavaScript use?",
    choiceA : "a) Sequential",
    choiceB : "b) Segmental",
    choiceC : "c) Lexical",
    choiceD : "d) Literal",
    answer : "choice_c"
}
//11
var q11 = {
    question : "What is the basic difference between JavaScript and Java?",
    choiceA : "a) Functions are considered as fields",
    choiceB : "b) Functions are values, and there is no hard distinction between methods and fields",
    choiceC : "c) Variables are specific",
    choiceD : "d) There is no difference",
    answer : "choice_b"
}


var scoreBtnEl = document.querySelector("#highscores-btn");

var mainEls = document.querySelector("#main-els");
var mainTitle = document.querySelector("#question");
var timerEl = document.querySelector("#timer");

var rightWrong = document.createElement("p");
rightWrong.setAttribute("class","right-wrong");

var qcount = 0;
var qsCorrect = 0;
var qsIncorrect = 0;
var tScore;
var timerCount = 60;
var timerInt;

var scoreForm = document.createElement("form");
scoreForm.setAttribute("id","score-form");
scoreForm.setAttribute("class","score-form-div");

var scoreSubmit = document.createElement("button");
scoreSubmit.className = "answer-choice";
scoreSubmit.setAttribute("id","score-submit-btn");
scoreSubmit.setAttribute("type","submit");
scoreSubmit.textContent = "Submit";
scoreSubmit.setAttribute("class", "score-form-btn");
var scoreInput = document.createElement("input");
scoreInput.setAttribute("type","text");
scoreInput.setAttribute("name","score-input");
scoreInput.setAttribute("placeholder", "Enter your initials.");
scoreInput.setAttribute("class", "score-text-input");
scoreForm.appendChild(scoreInput);
scoreForm.appendChild(scoreSubmit);
var allScores=[];

var qsArray = [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11];

var loadHighScores = function(){

    mainEls.addEventListener("click", choiceHandler);

    var goBackBtn = document.createElement("button");
    goBackBtn.setAttribute("class","answer-choice");
    goBackBtn.setAttribute("id","go-back-btn");
    goBackBtn.textContent = "Go Back";
    var clearScoresBtn = document.createElement("button");
    clearScoresBtn.setAttribute("class","answer-choice");
    clearScoresBtn.setAttribute("id","clear-scores-btn");
    clearScoresBtn.textContent = "Clear High Scores";

    allScores = localStorage.getItem("scores");
    
    if (allScores === null) {
        mainTitle.textContent = "No highscores yet!";
        mainEls.replaceChildren(goBackBtn,clearScoresBtn); 
        return false;
    } 
    allScores = JSON.parse(allScores);

    
    var scoreList = document.createElement("ul");
    scoreList.setAttribute("class","scores-ul");
    var scoreListEls = [];
    for (let i = 0; i < allScores.length;i++) {
        scoreListEls[i] = document.createElement("li");
        scoreListEls[i].setAttribute("class","highscore-list-el");
        scoreListEls[i].innerHTML = allScores[i].initial + ": " + allScores[i].quizScore + "%"; 
        scoreList.appendChild(scoreListEls[i]);
    }

    mainTitle.textContent = "High Scores";
    mainEls.replaceChildren(scoreList,goBackBtn,clearScoresBtn);
};


var scoreSubmitted = function(event) {
    
    event.preventDefault();
    
    allScores = localStorage.getItem("scores");
    if (allScores === null) {
        allScores = [];
    } else {
        allScores = JSON.parse(allScores);
    }

    var storeScore = {
        initial : scoreInput.value,
        quizScore : tScore.toFixed(2)
    }
    allScores.push(storeScore);
    localStorage.setItem("scores",JSON.stringify(allScores));
    loadHighScores();
};


var loadScoreForm = function() {
    mainTitle.textContent = "All Done!";
    var textEl = document.createElement("p");
    textEl.setAttribute("class","score-form-text");
    tScore = (qsCorrect/(qsCorrect+qsIncorrect))*100;
    textEl.innerHTML = "your score is " + tScore.toFixed(2)+" %";
    mainEls.replaceChildren(textEl,scoreForm);
    scoreForm.addEventListener("submit",scoreSubmitted);
};


var setTimer = function() {
    timerEl.innerHTML = "time: " + timerCount.toString();
    timerCount--;
    if (timerCount <= 0) {
        timerEl.innerHTML = "time: 0";
        clearInterval(timerInt);
        mainEls.removeEventListener("click",choiceHandler);
        loadScoreForm();  
    }
};

var loadNewQuestion = function(qnum) {

    
    var q = qnum.question;
    
    var choice_a =  document.createElement("button");
    choice_a.className = "answer-choice";
    choice_a.setAttribute("id", "choice_a");
    choice_a.textContent = qnum.choiceA;
    
    var choice_b =  document.createElement("button");
    choice_b.className = "answer-choice";
    choice_b.setAttribute("id", "choice_b");
    choice_b.textContent = qnum.choiceB;
    
    var choice_c =  document.createElement("button");
    choice_c.className = "answer-choice";
    choice_c.setAttribute("id", "choice_c");
    choice_c.textContent = qnum.choiceC;
    
    var choice_d =  document.createElement("button");
    choice_d.className = "answer-choice";
    choice_d.setAttribute("id", "choice_d");
    choice_d.textContent = qnum.choiceD;

    return [q, choice_a, choice_b, choice_c, choice_d];
   
};

var choiceHandler = function(event) {
  
    if (event.target.getAttribute("id")==="go-back-btn") {
        
        mainTitle.textContent = "Start Quiz";

        var quizInstructions = document.createElement("p");
        quizInstructions.textContent = "You will have 75 seconds to start. For every incorrect answer, 15 seconds will be subtracted from your time remaining.";
        quizInstructions.setAttribute("class", "quiz-instructions");

        var startButton = document.createElement("button");
        startButton.setAttribute("class","answer-choice");
        startButton.setAttribute("id","start-btn");
        startButton.textContent = "Start Quiz";

        mainEls.replaceChildren(quizInstructions,startButton);

    } else if (event.target.getAttribute("id")==="clear-scores-btn") {
        
        localStorage.removeItem("scores");
        loadHighScores();

    } else {
        
        if (event.target.getAttribute("id")==="start-btn") {
            qsCorrect = 0;
            qsIncorrect = 0;
            qcount = 0;
            timerCount=75;
            rightWrong.textContent = "";
        }
        
        if(!qsArray[qcount]){
            timerCount = 0;
            window.alert("You answered all of the questions! Enter your initials to submit your score!");
            return false;
        }

        
        var qAndChoices = loadNewQuestion(qsArray[qcount]);
        
        var qchoice = event.target.getAttribute("id");
        
        if (qcount !== 0) {
            
            if (qchoice == qsArray[qcount-1].answer) {
                qsCorrect++;
                rightWrong.textContent = "Correct!";
            } else {
                qsIncorrect++;
                rightWrong.textContent = "Incorrect!";
                timerCount -= 15;
            }
        } else {
            
            timerInt = setInterval(setTimer,1000);

        }
        mainTitle.textContent = qAndChoices[0];
        mainEls.replaceChildren(qAndChoices[1],qAndChoices[2],qAndChoices[3],qAndChoices[4],rightWrong);
    
        qcount ++;
    }
};




mainEls.addEventListener("click", choiceHandler);

scoreBtnEl.addEventListener("click",loadHighScores);