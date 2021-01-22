const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORE = 5;
console.log(highScores);

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () =>{
    console.log('username.value');
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    console.log('clicked the save button');
    console.log('Most Recent Score: ', mostRecentScore)
    console.log('localStorage', localStorage);
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score)

    highScores.sort( (a,b) => b.score - a.score)
    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign("highscores.html");
    console.log("High Scores", highScores);
};
