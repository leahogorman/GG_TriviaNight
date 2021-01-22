const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answerBtn'));
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const scoreCount = document.getElementById('score');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let questionsLeft = [];


let questions = [
    {
        question: "Whose house do the girls live in?",
        A: "Dorothy's",
        B: "Rose's",
        C: "Blanche's",
        D: "Coco's",
        correctAnswer: "C"
    },
    {
        question: "What does Charmaine do that angers Blanche?",
        A: "Writes a novel using Blanche's sex life for the plot",
        B: "Disinvites her from their father's funeral",
        C: "Calls Blanche selfish",
        D: "Auditions for the same part in a play",
        correctAnswer: "A"
    },
    {
        question: "How many kids does Dorothy have?",
        A: "Five",
        B: "Five and her husband has 1 from an affair",
        C: "Two",
        D: "Zero",
        correctAnswer: "C"
    },
    {
        question: "How do the girls end up living together?",
        A: "They are related",
        B: "Dorothy and Rose answer an ad placed by Blanche in the newspaper",
        C: "They share a house in a retirement community",
        D: "They get a place together after all their houses burn down",
        correctAnswer: "B"
    },
    {
        question: "Which actor chose to leave the show?",
        A: "Betty White",
        B: "Rue McClanahan",
        C: "Bea Arthur",
        D: "Estelle Getty",
        correctAnswer: "C"
    },
    {
        question: "Where is Dorothy from?",
        A: "St. Olaf Minnesota",
        B: "The South",
        C: "Queens",
        D: "Brooklyn",
        correctAnswer: "D"
    },
    {
        question: "Who is Fifi?",
        A: "It's what Blanche calls her fur coat",
        B: "An old friend of Sophia's",
        C: "Rose's cat",
        D: "A fake monkey made out of a traffic cone",
        correctAnswer: "D"
    },
    {
        question: "What is the name of the retirement home Sophia was in?",
        A: "Twin Oaks",
        B: "Shady Pines",
        C: "Sunny Days",
        D: "Shady Trees",
        correctAnswer: "B"
    },
    {
        question: "How did Charlie die?",
        A: "Heart Attack during sex",
        B: "In his sleep",
        C: "He died after she told him to drop dead",
        D: "We are never told",
        correctAnswer: "A"
    },
    {
        question: "Who does Sophia claim to have formerly been in business with ?",
        A: "Tony Paglia",
        B: "Mama Celeste",
        C: "Ellio Betzios",
        D: "Papa DiGiorno",
        correctAnswer: "B"
    },
    {
        question: "What dessert did the girls often eat?",
        A: "Chocolate Chip Cookies",
        B: "Baked Alaska",
        C: "Lemon Bars",
        D: "Cheesecake",
        correctAnswer: "D"
    },
    {
        question: "Who founded St. Olaf?",
        A: "Heinrich von Andredunen",
        B: "Gustav Lundqvist",
        C: "Bernt Julius Muus",
        D: "Gunter Lindstrom",
        correctAnswer: "A"
    },
    {
        question: "What was the founder of St. Olaf the first to do?",
        A: "Invented fish flavoured ice cream",
        B: "Was the first person to pickle a herring",
        C: "Came up with the idea of canning salmon",
        D: "Came up with the idea of canning tuna in it's own juices",
        correctAnswer: "D"
    },
    {
        question: "What did Rose study in university?",
        A: "French",
        B: "English",
        C: "Pig Latin",
        D: "Latin",
        correctAnswer: "C"
    },
    {
        question: "Where is Sophia from?",
        A: "St. Olaf Minnesota",
        B: "Sicily",
        C: "Brooklyn",
        D: "Florida",
        correctAnswer: "B"
    },
    {
        question: "Who has Sophia NOT claimed to have had a romantic relationship with?",
        A: "Pablo Picasso",
        B: "Charles de Gaulle",
        C: "Charlie Chaplin",
        D: "Winston Churchill",
        correctAnswer: "C"
    },
    {
        question: "What does Kate's husband do for work?",
        A: "He's a heart surgeon",
        B: "He's a pharmacist",
        C: "He's a psychologist",
        D: "He's a podiatrist",
        correctAnswer: "D"
    },
    {
        question: "What was the premise of the Golden Girls spin off?",
        A: "The Girls running a bar",
        B: "Blanche and a new group of tenants",
        C: "Blanche, Sophia, and Rose running a hotel",
        D: "Dorothy and Sophia back in New York",
        correctAnswer: "C"
    },
    ];

const correctBonus = 10;
const incorrectDeficit = -5;
const totalQuestions =  11;

startGame = () => {
    questionCounter = 0;
    score = 0;
    questionsLeft = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {

    if(questionsLeft.length === 0 || questionCounter >= totalQuestions -1 ) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('thankyou.html')
    }
    questionCounter++;
    // progressText.innerText = `${questionCounter} of ${totalQuestions - 1}`;
    progressBarFull.style.width = `${(questionCounter / totalQuestions) * 100}%`;

    const questionIndex = Math.floor(Math.random() * questionsLeft.length)
    currentQuestion = questionsLeft[questionIndex];
    question.innerText = currentQuestion.question;

    answers.forEach( answer => {
        const letter = answer.dataset['letter'];
        answer.innerText = currentQuestion[letter];
    })
    questionsLeft.splice(questionIndex, 1);

    acceptingAnswers = true;
}

answers.forEach(answer => {
    answer.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['letter'];

        const classToApply =
            selectedAnswer == currentQuestion.correctAnswer ? "correct" : "incorrect";
        
        if(classToApply === 'correct') {
            addScore(correctBonus);
        } else {
            minusScore(incorrectDeficit);
        }

        selectedChoice.classList.add(classToApply); 
        setTimeout(() => {
            selectedChoice.classList.remove(classToApply); 
            getNewQuestion();
        }, 1000);
    });
});

addScore = num => {
    score +=num;
    scoreCount.innerText = "Score: " + score;
}
minusScore = num => {
    score +=num;
    scoreCount.innerText = "Score: " + score;
}

startGame()