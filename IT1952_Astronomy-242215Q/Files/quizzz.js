const quizData = [
    { question: 'What is the name of the force which keeps the planets in orbit around the sun?', options: ['Frictional force', 'Air Resistance Force', 'Tension force', 'Gravitational force'], answer: 'Gravitational force' },
    { question: 'What is the largest planet in our solar system?', options: ['Mars', 'Saturn', 'Jupiter', 'Neptune'], answer: 'Jupiter' },
    { question: 'Which planet is closest to the sun?', options: ['Mercury', 'Venus', 'Earth', 'Saturn'], answer: 'Mercury' },
    { question: 'Which two planets take less time than Earth to orbit the sun?', options: ['Venus and Earth', 'Pluto and Saturn ', 'Mercury and Venus', 'Earth and Mars'], answer: 'Mercury and Venus' },
    { question: 'Which planet has a day which lasts eight months?', options: ['Mercury', 'Venus', 'Uranus', 'Mars'], answer: 'Venus' },
    { question: 'Which planet orbits the Sun four times in the time it takes the Earth to go round once?', options: ['Mercury', 'Jupiter', 'Neptune', 'Saturn'], answer: 'Mercury' },
    { question: 'Which planet takes almost 30 Earth years to orbit the sun?', options: ['Uranus', 'Venus', 'Saturn', 'Mercury'], answer: 'Saturn' },
    { question: 'Which planet is known as the Red Planet?', options: ['Mars', 'Venus', 'Mercury', 'Uranus'], answer: 'Mars' },
    { question: 'Which planet has the Great Red Spot?', options: ['Mercury', 'Saturn', 'Mars', 'Jupiter'], answer: 'Jupiter' },
    { question: 'Which planet is the densest?', options: ['Mercury', 'Uranus', 'Earth', 'Neptune'], answer: 'Earth' }
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const { question, options } = quizData[currentQuestion];
    quizContainer.innerHTML = `
      <div class="question">${question}</div>
      <div class="options">
        ${options.map(option => `
          <label class="option">
            <input type="radio" name="quiz" value="${option}"> ${option}
          </label>
        `).join('')}
      </div>
    `;
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer
        });
      }
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    } else {
      alert('Please select an option before submitting.');
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswers.map(({ question, incorrectAnswer, correctAnswer }) => `
        <p><strong>Question:</strong> ${question}<br>
           <strong>Your Answer:</strong> ${incorrectAnswer}<br>
           <strong>Correct Answer:</strong> ${correctAnswer}</p>
      `).join('')}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();