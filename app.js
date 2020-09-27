const words = [
    'scrum master',
    'scrum',
    'javascript',
    'developer',
    'ipssi',
    'constant',
    'variable',
    'covid-19',
    'symptom',
    'bread',
    'let',
    'devops',
    'azure',
    'amazon',
    'google',
    'webservice',
    'cloud',

];
const typingWord = document.getElementById('typingWord');
const currentWord = document.getElementById("currentWord");
const currentScore = document.getElementById("score");
const currentTimer = document.getElementById("timer");
const currentLevel = document.getElementById("level");
const text = document.getElementById("text");
const seconds = document.getElementById("seconds");


const level = {
    easy: 8,
    medium: 5,
    hard: 2,
}

const thisLevel = level.easy;
currentScore.innerHTML = 0;
currentLevel.innerHTML = 'Easy';
currentTimer.innerHTML = 8;
let score = 0;
let timer = thisLevel;
let isplay;
let refreshIntervalIdTime;
let refreshIntervalIdStatus;



window.addEventListener('load', game);

function game() {
    seconds.innerHTML = thisLevel;
    showWord(words);
    typingWord.addEventListener('input', matchWords);
    if (score != -1) {
        refreshIntervalIdTime = setInterval(setTimer, 1000);
        refreshIntervalIdStatus = setInterval(setStatus, 1000);
    }


}

function showWord(words) {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    // console.log("random word: " + randomWord);
    currentWord.innerHTML = randomWord;
}

function matchWords() {

    if (setMatching()) {
        isplay = true;
        showWord(words);
        score++;

        if (score === -1) {
            currentScore.innerHTML = 0;
        } else {
            currentScore.innerHTML = score;
        }
        if (score < 5 && timer > 0) {
            timer = level.easy + 1;

        }
        if (score >= 5 && timer > 0) {
            currentLevel.innerHTML = 'Medium';
            seconds.innerHTML = level.medium;
            timer = level.medium + 1;

        }
        if (score >= 15 && timer > 0) {
            currentLevel.innerHTML = 'Hard';
            seconds.innerHTML = level.hard
            timer = level.hard + 1;

        }
    }

}

function setMatching() {
    if (typingWord.value === currentWord.innerHTML) {
        text.innerHTML = "Correct Matching words!";
        typingWord.value = '';
        return true;
    } else {
        text.innerHTML = "";
        return false;
    }
}


function setTimer() {
    if (timer > 0) {
        timer--
    } else if (timer === 0) {
        isplay = false;
        clearInterval(refreshIntervalIdTime);
    }
    // console.log(currentTimer);
    currentTimer.innerHTML = timer;

}

function setStatus() {
    if (!isplay && timer === 0) {
        text.innerHTML = 'You have loose :( Retry again';
        let player = prompt("Please enter your name");
        console.log(localStorage.length);
        // tri localStorage
        if (localStorage.length > 0) {
            var sortedLocalStroage = Object
                .keys(localStorage)
                .sort(function(a, b) {
                    return localStorage[a] - localStorage[b];
                })
            console.log(sortedLocalStroage);
            var id = sortedLocalStroage[sortedLocalStroage.length - 1];
            var isTheBest = parseInt(score) > parseInt(localStorage.getItem(id));
            if (isTheBest) {
                alert(" the best score");
            }
        }
        localStorage.setItem(player, score);
        clearInterval(refreshIntervalIdStatus);
        score = -1;

    }

}