const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const scoreText = document.getElementById('score');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [
    {
        question: "Whose house do the girls live in?",
        answers: {
            a: "Dorothy's",
            b: "Rose's",
            c: "Blanche's",
            d: "Coco's"
        },
        correctAnswer: "c"
    },
    {
        question: "What does Charmaine do that angers Blanche?",
        answers: {
            a: "Writes a novel using Blanche's sex life for the plot",
            b: "Disinvites her from their father's funeral",
            c: "She calls Blanche selfish",
            d: "She auditioned for the same part in a play"
        },
        correctAnswer: "a"
    },
    {
        question: "How many kids does Dorothy have?",
        answers: {
            a: "Five",
            b: "Five and her husband has 1 from an affair",
            c: "Two",
            d: "Zero"
        },
        correctAnswer: "c"
    },
    {
        question: "How do the girls end up living together?",
        answers: {
            a: "They are related",
            b: "Dorothy and Rose answer an ad placed by Blanche in the newspaper",
            c: "They share a house in a retirement community",
            d: "They get a place together after all their houses burn down"
        },
        correctAnswer: "b"
    },
    {
        question: "Which actor chose to leave the show?",
        answers: {
            a: "Betty White",
            b: "Rue McClanahan",
            c: "Bea Miller",
            d: "Estelle Getty"
        },
        correctAnswer: "c"
    },
    {
        question: "Where is Dorothy from?",
        answers: {
            a: "St. Olaf Minnesota",
            b: "The South",
            c: "Queens",
            d: "Brooklyn"
        },
        correctAnswer: "d"
    },
    {
        question: "Who is Fifi?",
        answers: {
            a: "It's what Blanche calls her fur coat",
            b: "An old friend of Sophia's",
            c: "Rose's cat",
            d: "A fake monkey made out of a traffic cone"
        },
        correctAnswer: "d"
    },
    {
        question: "What is the name of the retirement home Sophia was in?",
        answers: {
            a: "Twin Oaks",
            b: "Shady Pines",
            c: "Sunny Days",
            d: "Shady Trees"
        },
        correctAnswer: "b"
    },
    {
        question: "How did Charlie die?",
        answers: {
            a: "Heart Attack during sex",
            b: "In his sleep",
            c: "He died after she told him to drop dead",
            d: "We are never told"
        },
        correctAnswer: "a"
    },
    ];

const CORRECT_BONUS = 10;
const INCORRECT_DEFICIT = -10;
const MAX_QUESTIONS =  10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/ ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        } else {
            decrementScore(INCORRECT_DEFICIT);
        }

        selectedChoice.parentElement.classList.add(classToApply); 
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply); 
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}
decrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame()