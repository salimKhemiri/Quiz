const questions = [
    {
        question: "What is Lionel Messi's nationality?",
        answers: [
            { text: "Brazilian", correct: false },
            { text: "Spanish", correct: false },
            { text: "Portuguese", correct: false },
            { text: "Argentinian", correct: true }
        ]
    },
    {
        question: "What is Cristiano Ronaldo's nationality?",
        answers: [
            { text: "Italian", correct: false },
            { text: "Portuguese", correct: true },
            { text: "German", correct: false },
            { text: "French", correct: false }
        ]
    },
    {
        question: "What is Neymar's nationality?",
        answers: [
            { text: "Brazilian", correct: true },
            { text: "Argentinian", correct: false },
            { text: "Mexican", correct: false },
            { text: "Colombian", correct: false }
        ]
    }
];

const questionElem = document.getElementById("qution");
const answerElem = document.getElementById("answr-btn");
const nextBtn = document.getElementById("Nbtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElem.innerHTML = questionNo + ". " + currentQuestion.question;

    // Clear previous answers
    answerElem.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("list");
        answerElem.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("Correct");
        score++;
    }else{
        selectedBtn.classList.add("inCorrect");
    };
    Array.from(answerElem.children).forEach(button =>{
        if(button.dataset.correct == "true"){
            button.classList.add("Correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";

}
function resetState(){
    nextBtn.style.display = "none";
    while(answerElem.firstChild){
        answerElem.removeChild(answerElem.firstChild);
    }
}
function showscore(){
    resetState();
    questionElem.innerHTML = `You scored ${score}`;
    nextBtn.innerHTML ="Play Again";
    nextBtn.style.display = "block";

}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showscore();
    }
}
nextBtn.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton()
    }else{
        startQuiz();
    }
})

startQuiz();

