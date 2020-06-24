// Questions and answers
var questions = [
    {
        title: "What are Hurricanes",
        options: ["Giant walls of dust", "Ice floating in the ocean", "A popular drink found in Louisiana",
            "Giant tropical storms producing super strong winds and heavy rainfall"],
        answer: "Giant tropical storms producing super strong winds and heavy rainfall"
    },
    {
        title: "Where do Hurricanes Form",
        options: ["Warm ocean waters near the equator", "Desert like Climates", "Only on Dry land",
            "I have seen dry land it is not a myth"],
        answer: "Warm ocean waters near the equator"
    },
    {
        title: "What is the Center of a Hurricane called",
        options: ["The Vortex", "The eye", "The place in the middle", "The safest place to be"],
        answer: "The eye"
    },
    {
        title: "What is it that causes Hurricanes to spin in different directions based off location",
        options: ["Gravity", "Current", "Weather temp", "Coriolis Force"],
        answer: "Coriolis Force"
    },

    {
        title: "What is a Storm surge",
        options: ["An energy drink", "The Final push onto land",
            "High winds toward the shore causing sea levels to rise", "None of the Above"],
        answer: "High winds toward the shore causing sea levels to rise"
    },  

];

// Declared variables
var score = 0;
var questionIndex = 0;
var points = 0;
// Declare variables where to place objects in the HTML
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var container = document.querySelector("#container");


// Total time to take quiz if answers are right
var startTime = 60;
// begin time for funtion to to start quiz
var beginTime = 0;
// time loss for wrong answer 
var deduction = 6;
// Creates new element
var ulEl = document.createElement("ul");

// event listner that makes timer start
timer.addEventListener("click", function () {
    // This should give it a base to look for to switch to the timer on click
    if (beginTime === 0) {
        beginTime = setInterval(function () {
            startTime--;
            currentTime.textContent = "Time " + startTime;

            if (startTime <= 0) {
                clearInterval(beginTime);
                quizOver();
                currentTime.textcontent = "Quiz is over";
            }
        }, 1000);
    }
    render(questionIndex);
});

//  using render() to bring quiz questions to the page(worked on this with Tutor)
function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulEl.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var quizQuestions = questions[questionIndex].title;
        var quizOptions = questions[questionIndex].options;
        questionsDiv.textContent = quizQuestions;
    }
    quizOptions.forEach(function (newItem) {
        var list = document.createElement("li");
        list.textContent = newItem;
        questionsDiv.appendChild(ulEl);
        ulEl.appendChild(list);
        list.addEventListener("click", (compare));
    })
};
// this checks if the answer from the array is correct and will either increase score or deduct time
function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "makeDiv")
        if (element.textContent == questions[questionIndex].answer) {
            points = points + 20; 

        } else {
            points = points - deduction;
            makeDiv.textContent = "Wrong";
        }
    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        quizOver();
        makeDiv.textContent = "Quiz Complete"
    } else {
        render(questionIndex);

    }
    questionsDiv.appendChild(makeDiv)
}

// create last page for entering initials and High score
function quizOver() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var creath1El = document.createElement("h1");
    creath1El.setAttribute("id", "creath1El");
    creath1El.textContent = "Quiz Over"

    questionsDiv.appendChild(creath1El);

    var createPEl = document.createElement("p");
    createPEl.setAttribute("id", "creatPEl");

    questionsDiv.appendChild(createPEl);

    if (startTime >= 0) {
        var timeLeft = startTime
        var createSecP = document.createElement("p");
        clearInterval(beginTime);
        createPEl.textContent = "Final Score is: " + points;
        questionsDiv.appendChild(createSecP);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit"; 

    questionsDiv.appendChild(createSubmit);

    // logs high score and and initials to local storage
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: points
            }
            console.log(finalScore);
            var Scores = localStorage.getItem("score");
            if (Scores === null) {
                Scores = [];
            } else {
                Scores = JSON.parse(localStorage.getItem("score")); 
            }
            Scores.push(finalScore);
            var newScore = JSON.stringify(Scores);
            localStorage.setItem("score", newScore);
            // goes to highscore page
            window.location.replace("Highscore.html");
        }
    });
}  
