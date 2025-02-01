document.addEventListener('DOMContentLoaded',() => {

    const quizContainer = document.getElementById('quiz-container');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const questionOptions = document.getElementById('question-options');
    const nextBtn = document.getElementById('next-btn');
    const resultContainer = document.getElementById('result-container');
    const showScore = document.getElementById('score');
    const restartBtn = document.getElementById('restart-btn');
    const startBtn = document.getElementById('start-btn');

    const questions = [
        {
            question : "What is the capital of France?",
            choices : ["Paris" , "London" , "Berlin" , "Madrid"],
            answer : "Paris"
        },
        {
            question : "Which Planet is known as red Planet?",
            choices : ["Mars" , "Venus" , "Jupiter" , "Saturn"],
            answer : "Mars"
        },
        {
            question : "Who wrote Hamlet",
            choices : ["Charles Dickens" , "Jane Austen" , "William Shakespeare" , "Mark Twian"],
            answer : "William Shakespeare"
        },
    ];

    let currentQuestion  = 0;
    let score = 0;

    startBtn.addEventListener('click' , startQuiz);

    nextBtn.addEventListener('click' , nextQuestion);

    restartBtn.addEventListener('click' , restartQuiz);

    function startQuiz(){
        startBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        showQuestion();
    }

    function nextQuestion(){
        currentQuestion++;
        if(currentQuestion < questions.length){
            showQuestion();
        }else{
            showResult();
        }
    }

    function restartQuiz(){
        currentQuestion = 0;
        score = 0;
        resultContainer.classList.add('hidden');
        startQuiz();
    }

    function showQuestion(){
        nextBtn.classList.add('hidden');
        questionText.textContent = questions[currentQuestion].question;
        questionOptions.innerHTML = "";  // clear previous options
        questions[currentQuestion].choices.forEach((choice) => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click' , () => selectAnswer(choice));
            questionOptions.appendChild(li);
        });
    }

    function selectAnswer(choice){
        const correctAnswer = questions[currentQuestion].answer;
        if(choice === correctAnswer){
            score++;
        }
        nextBtn.classList.remove('hidden');
    }

    function showResult(){
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        showScore.textContent = `${score} out of ${questions.length}`;
    }

}); // DOM Ended //