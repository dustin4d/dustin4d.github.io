//Initialize player and CPU score
let playerScore= 0;
let cpuScore = 0;
let roundWin = '';

// 4. Three buttons with eventListeners that call playRound w/ correct playerChoice
// Can also use document.getElementById, but query selector covers more bases
const btnRock = document.querySelector('#btn-rock')
const btnPaper = document.querySelector('#btn-paper')
const btnScissors = document.querySelector('#btn-scissors')
const playerScorecard = document.querySelector('.player-score')
const cpuScorecard = document.querySelector('.cpu-score')
const messageBox = document.querySelector('.messageBox p')
const buttons = document.querySelector('.buttons')
const btnPlayAgain = document.querySelector('.playAgain')
const scoreboard = document.querySelector('.scoreboard')

// Give the buttons the eventlisteners that will play the game
btnRock.addEventListener('click', () => clicked('ROCK'));
btnPaper.addEventListener('click', () => clicked('PAPER'));
btnScissors.addEventListener('click', () => clicked('SCISSORS'));

// Generates a random choice of RPS for the cpu to be called when clicked
const getRandomChoice = () => {
    let random = Math.floor(Math.random() * 3)
    switch (random) {
        case 0 :
            return 'ROCK'
        case 1 :
            return 'PAPER'
        case 2 : 
            return 'SCISSORS'
    }
}

// Main game logic; checks the winner as if it were RPS in real life
function playRound(playerChoice, cpuChoice) {
    if(cpuChoice == playerChoice){
        roundWin = 'tie';
    }
    // Use bitwise OR operator to test playerChoice's values against cpuChoice()'s values.
    else if (
        (playerChoice == 'ROCK') && (cpuChoice == 'SCISSORS') ||
        (playerChoice == 'SCISSORS') && (cpuChoice == 'PAPER') ||
        (playerChoice == 'PAPER') && (cpuChoice == 'ROCK')
    ) {
        playerScore++;
        roundWin = 'player';
    }
    else if (
        (cpuChoice == 'ROCK') && (playerChoice == 'SCISSORS') ||
        (cpuChoice == 'SCISSORS') && (playerChoice == 'PAPER') ||
        (cpuChoice == 'PAPER') && (playerChoice == 'ROCK')
    ) {
        cpuScore++;
        roundWin = 'cpu'
    }
}

// Adds the points necessary to the winner of the current round
const addPoints = () => {
    if (roundWin == 'tie') {
    } else if (roundWin == 'player') {
        playerScorecard.innerHTML = playerScore
    } else if (roundWin == 'cpu') {
        cpuScorecard.innerHTML = cpuScore
    }
}

// Returns true or false when the game is over.
const isGameOver = () => {
    return playerScore === 5 || cpuScore === 5;
}

/* Most of the game is 'played' from this button click, so we'll
   put all of our functions in there that get called when a button
   is clicked */
function clicked(playerChoice) {
    cpuChoice = getRandomChoice();
    playRound(playerChoice, cpuChoice);
    addPoints()
    colorChange();
    killFeed(playerChoice, cpuChoice)
    if (isGameOver()) {
        gameOverScreen()
        buttons.remove();
    }

    // This borrows the logic from the playRound function, but uses it to update the 
    // winner and loser of each round.
    function killFeed(playerChoice, cpuChoice) {
    if(cpuChoice == playerChoice){
        messageBox.innerHTML = 'TIE ROUND';
    }
    else if (
        (playerChoice == 'ROCK') && (cpuChoice == 'SCISSORS') ||
        (playerChoice == 'SCISSORS') && (cpuChoice == 'PAPER') ||
        (playerChoice == 'PAPER') && (cpuChoice == 'ROCK')
    )  { // These nested ifs are just for updating the kill feed    
            if(playerChoice == 'ROCK') {messageBox.innerHTML = 
                'You win with <i class="fa-solid fa-hand-fist"></i>'}
            if(playerChoice == 'SCISSORS') {messageBox.innerHTML = 
                'You win with <i class="fa-solid fa-shield"></i>'}
            if(playerChoice == 'PAPER') {messageBox.innerHTML = 
                'You win with <i class="fa-solid fa-drumstick-bite"></i>'}
    } else if (
        (cpuChoice == 'ROCK') && (playerChoice == 'SCISSORS') ||
        (cpuChoice == 'SCISSORS') && (playerChoice == 'PAPER') ||
        (cpuChoice == 'PAPER') && (playerChoice == 'ROCK')
    ) {
            if(cpuChoice == 'ROCK') {messageBox.innerHTML = 
                'CPU wins with <i class="fa-solid fa-hand-fist"></i>'}
            if(cpuChoice == 'SCISSORS') {messageBox.innerHTML = 
                'CPU wins with <i class="fa-solid fa-shield"></i>'}
            if(cpuChoice == 'PAPER') {messageBox.innerHTML = 
                'CPU wins with <i class="fa-solid fa-drumstick-bite"></i>'}
        }
}

function colorChange() {
    if(roundWin == 'player'){
        // change scoreboard to green
        scoreboard.style.backgroundColor = '#DFF0D8'
        scoreboard.style.borderColor = "#73D216"        
    } else if (roundWin == 'cpu') {
        //change scoreboard to red
        scoreboard.style.backgroundColor = '#F2DEDE'
        scoreboard.style.borderColor = '#D9534F'
    } else {
        //change scoreboard to black
    }
}

function gameOverScreen() {
    if (playerScore === 5) {
        messageBox.innerHTML = 'Player Wins'
    } else {
        messageBox.innerHTML = 'CPU WINS'
    }
    btnPlayAgain.style.visibility = 'visible';
    restartGame();
}}

function restartGame() {
    btnPlayAgain.addEventListener('click', () => {location.reload()})
}