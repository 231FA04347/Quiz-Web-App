
const questions = [
  {
    type: "multiple-choice",
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Madrid"],
    correct: 0,
  },
  {
    type: "multiple-choice",
    question: "Which programming language is used in web development?",
    answers: ["Python", "Java", "JavaScript", "C++"],
    correct: 2,
  },
  {
    type: "fill-in-the-blank",
    question: "The square root of 81 is ___.",
    correctAnswer: "9",
  },
  {
    type: "fill-in-the-blank",
    question: "The square root of 9 is ___.",
    correctAnswer: "3",
  },

];

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  answersElement.innerHTML = "";

  if (currentQuestion.type === "multiple-choice") {

    currentQuestion.answers.forEach((answer, index) => {
      const li = document.createElement("li");
      li.textContent = answer;
      li.addEventListener("click", () => selectAnswer(index, li));
      answersElement.appendChild(li);
    });
  } else if (currentQuestion.type === "fill-in-the-blank") {

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type your answer here";
    input.id = "blank-answer";
    answersElement.appendChild(input);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit Answer";
    submitButton.addEventListener("click", () => checkBlankAnswer());
    answersElement.appendChild(submitButton);
  }
}

function selectAnswer(answerIndex, selectedElement) {
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = answerIndex === currentQuestion.correct;

  const allAnswers = answersElement.querySelectorAll("li");
  allAnswers.forEach((answer) => answer.classList.remove("selected")); 
  selectedElement.classList.add("selected"); 

  if (isCorrect) {
    score++;
  }

  nextButton.disabled = false; 
}

function checkBlankAnswer() {
  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = document.getElementById("blank-answer").value.trim();

  if (userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
    score++;
  }

  nextButton.disabled = false; 
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
    nextButton.disabled = true; 
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreElement.textContent = `${score}/${questions.length}`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  loadQuestion();
  nextButton.disabled = true; 
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

loadQuestion();
nextButton.disabled = true; 