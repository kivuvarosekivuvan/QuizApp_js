const questions = [
    {
        question: "How do you write ouput code  in javascript?",
        answers:[
            {ans1: "print:", correct: false},
            {ans1: "console.log()", correct: true},
            {ans1: "print()", correct: false},
            {ans1: "output()", correct: false},


        ]

    },

    {
        question: "Which of the following is not javascript data types?",
        answers:[
            {ans1: "Null type", correct: false},
            {ans1: "Undefined type", correct: false},
            {ans1: "Number type", correct: false},
            {ans1: "digits", correct: true},


        ]
    },
    

    {
        question: "Will the following code work? var js = (function(x) {return x*x;}(10));",
        answers:[
            {ans1: "Exeption will be thrown", correct: false},
            {ans1: "Yes perfectly", correct: true},
            {ans1: "Not sure", correct: false},
            {ans1: "Error", correct: false},


        ]

    }
];


const questionElement = document.getElementById("question")
const answerButtons=document.getElementById("answerButtons")
const nextButton=document.getElementById("next-btn")


let questionIndex=0;
let score=0;
let playerName=""


function startExercise(){
    questionIndex=0;
    score = 0;
    nextButton.innerHTML = "NEXT";
    playerName=prompt("Please enter your name")
    showQuestion();
}


// code to get question numbers
function showQuestion(){
    // resetState has to be called before the question to hide the answer buttons
    resetState();   
    let currentQuestion = questions[questionIndex];
    let questionNo = questionIndex + 1;
    questionElement.innerHTML= questionNo + ". " +currentQuestion.question;
    // questions;


    // code when I am diplaying answer
     currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.ans1;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;         //this add true of false in this dataset
        }
        button.addEventListener("click", selectAnswer)
     });
    };


// removing previous answer buttons
function resetState(){
    nextButton.style.display= "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(a){
    const selectedButton = a.target;
    const isCorrect=selectedButton.dataset.correct =="true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;


    }else{
        selectedButton.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display="block"

    }



    function showScore(){
        resetState();
        document.getElementById("result").innerHTML = `Congrats ${playerName} you finished the game!! Your score is ${score} out of ${questions.length}`;
        // questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display= "block"
        const congratsSound=document.getElementById("success-sound")
        congratsSound.play();
    }


    function handleNextButton(){
        questionIndex++;
        if(questionIndex<questions.length){
            showQuestion();
        }else{
            showScore();
        }
    }


    nextButton.addEventListener("click", ()=>{
        if(questionIndex<questions.length){
            handleNextButton();
        }else{
            startExercise();
        }
    });
    

    function download(){
        var quizData = JSON.stringify(questions);
        var blob = new Blob([quizData], {type: "application/json"});
        var url =URL.createObjectURL(blob);

        var link=document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "quizgame.json");
        link.click();
    }


    //  calling the question
    startExercise();





