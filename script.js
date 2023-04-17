const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('timer');

let shuffledQuestions, currentQuestionIndex, timeLeft, timerIntervalId;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startQuiz() {
  startButton.textContent = "Next";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove('hide');
  timeLeft = 50; // Set the total time for the quiz (in seconds)
  timerIntervalId = setInterval(updateTimer, 1000); // Update the timer every second
  setNextQuestion();
}


function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
  
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('answer-button');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
  
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      startButton.innerText = 'Restart';
      startButton.classList.remove('hide');
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }

  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

  function endQuiz() {
    clearInterval(timerIntervalId);
    // Display the final score or any other end-of-quiz information
  }

  function updateTimer() {
    timeLeft--;
    if (timeLeft < 0) {
      // If time is up, end the quiz
      clearInterval(timerIntervalId);
      endQuiz();
    } else {
      timerElement.innerText = `Time left: ${timeLeft}s`;
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

  
  const questions = [
    {
      question: 'What is the largest organ in the human body?',
      answers: [
        { text: 'Brain', correct: false },
        { text: 'Skin', correct: true },
        { text: 'Heart', correct: false },
        { text: 'Liver', correct: false }
      ]
    },
    {
      question: 'What is the smallest planet in our solar system?',
      answers: [
        { text: 'Venus', correct: false },
        { text: 'Mercury', correct: true },
        { text: 'Mars', correct: false },
        { text: 'Earth', correct: false }
      ]
    },
    {
      question: 'What is the capital city of Japan?',
      answers: [
        { text: 'Kyoto', correct: false },
        { text: 'Osaka', correct: false },
        { text: 'Tokyo', correct: true },
        { text: 'Hiroshima', correct: false }
      ]
    },
    {
      question: 'Who is the author of the Harry Potter series?',
      answers: [
        { text: 'J.K. Rowling', correct: true },
        { text: 'Stephen King', correct: false },
        { text: 'George R.R. Martin', correct: false },
        { text: 'Suzanne Collins', correct: false }
      ]
    },
    {
      question: 'What is the currency of China?',
      answers: [
        { text: 'Yuan', correct: true },
        { text: 'Dollar', correct: false },
        { text: 'Euro', correct: false },
        { text: 'Pound', correct: false }
      ]
    },
    {
      question: 'Who painted the famous artwork "The Starry Night"?',
      answers: [
        { text: 'Vincent van Gogh', correct: true },
        { text: 'Leonardo da Vinci', correct: false },
        { text: 'Pablo Picasso', correct: false },
        { text: 'Claude Monet', correct: false }
      ]
    },
    {
      question: 'What is the chemical symbol for gold?',
      answers: [
        { text: 'Ag', correct: false },
        { text: 'Fe', correct: false },
        { text: 'Au', correct: true },
        { text: 'Cu', correct: false }
      ]
    },
    {
      question: 'Who directed the movie "Jurassic Park"?',
      answers: [
        { text: 'Steven Spielberg', correct: true },
        { text: 'Martin Scorsese', correct: false },
        { text: 'Quentin Tarantino', correct: false },
        { text: 'Christopher Nolan', correct: false }
      ]
    },
    {
      question: 'What is the largest continent in the world?',
      answers: [
        { text: 'Europe', correct: false },
        { text: 'Asia', correct: true },
        { text: 'South America', correct: false },
        { text: 'Africa', correct: false }
      ]
    },
    {
      question: 'What is the name of the actor who plays Iron Man in the Marvel Cinematic Universe?',
      answers: [
        { text: 'Robert Downey Jr.', correct: true },
        { text: 'Chris Evans', correct: false },
        { text: 'Mark Ruffalo', correct: false },
        { text: 'Chris Hemsworth', correct: false }
      ]
    }
  ];
  