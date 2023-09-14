const gameDiv = document.querySelector(".gameDiv");
const title = document.querySelector(".title");

const playerDiv = document.querySelector(".playerDiv");
const computerDiv = document.querySelector(".computerDiv");
const winnerDiv = document.querySelector(".winnerDiv");

const winner = document.querySelector(".winner");
const winnerScore = document.querySelector(".winnerScore");

const buttons = document.querySelectorAll('button');
const start = document.querySelector('.start');
const restart = document.querySelector('.restart');

const h3Player = document.createElement('h3');
const h3Computer = document.createElement('h3');
const player = document.createElement("p");
const computer = document.createElement("p");
const playerScoreP = document.createElement("p");
const computerScoreP = document.createElement("p");

let playerScore = 0;
let computerScore = 0;
let playerSelection;

function game(playerSelection){

    //Izveido spēlētāja tabulu:
    playerDiv.classList.add("box");
    h3Player.textContent = 'You';
    h3Player.classList.add('player');
    playerDiv.appendChild(h3Player);

    //Izveido datora tabulu:
    computerDiv.classList.add("box");
    h3Computer.textContent = 'Computer';
    h3Computer.classList.add('computer');
    computerDiv.appendChild(h3Computer);

    function getComputerChoice() {
        let random = Math.floor(Math.random() * 3 + 1);
        if (random === 1){
            return "Rock";
        } else if (random === 2){
            return "Paper";
        } else if (random === 3){
            return "Scissors";
        }
    }

    let computerSelection = getComputerChoice();
    
    //Parāda abu spēlētāju izvēli:
    player.textContent = playerSelection;
    computer.textContent = computerSelection;

    function playRound(playerSelection, computerSelection) {
        //Izveido paziņojumu tabulu - kurš zaudēja, kurš uzvarēja:
        winnerDiv.classList.add("box");
        winner.classList.add("smallBox");

        if(playerSelection === computerSelection){
            winner.textContent = "Tie!";
        } 
        
        if(playerSelection === "Rock"){
            if(computerSelection === "Paper"){
                winner.textContent = "You Lose! Paper beats Rock!";
                computerScore++;
            }
        } if(playerSelection === "Paper"){
            if(computerSelection === "Rock"){
                winner.textContent = "You Win! Paper beats Rock!";
                playerScore++;
            }
        } if(playerSelection === "Rock"){
            if(computerSelection === "Scissors"){
                winner.textContent = "You Win! Rock beats Scissors!";
                playerScore++;
            }
        } if(playerSelection === "Scissors"){
            if(computerSelection === "Rock"){
                winner.textContent = "You Lose! Rock beats Scissors!";
                computerScore++;
            }
        } if(playerSelection === "Paper"){
            if(computerSelection === "Scissors"){
                winner.textContent = "You Lose! Scissors beats Paper!";
                computerScore++;
            }
        } if(playerSelection === "Scissors"){
            if(computerSelection === "Paper"){
                winner.textContent = "You Win! Scissors beats Paper!";
                playerScore++;
            }
        } 

        //Parāda abu spēlētāju punktus:
        playerScoreP.textContent = "Score: " + playerScore;
        computerScoreP.textContent = "Score: " + computerScore;
    }

    player.classList.add('smallBox');
    computer.classList.add('smallBox');
    playerScoreP.classList.add('smallBox');
    computerScoreP.classList.add('smallBox');

    playerDiv.appendChild(player);
    playerDiv.appendChild(playerScoreP);
    computerDiv.appendChild(computer);
    computerDiv.appendChild(computerScoreP);

    playRound(playerSelection, computerSelection);

    //Ļauj spēlēt līdz 5 uzvarām:
    if(computerScore === 5){
        winnerScore.textContent = "You lost!";
        endGame();
        restartGame();
    }else if(playerScore === 5){
        winnerScore.textContent = "You won!";
        endGame();
        restartGame();
    } 
}

restart.style.visibility = 'hidden';
title.style.visibility = 'hidden';

function endGame(){
    winnerScore.classList.add("smallBox");
    //Neļauj tālāk spēlēt, kad spēle ir beigusies:
    buttons.forEach((button) => {
        button.disabled = true;                  
    });
    title.style.visibility = 'hidden';
    //Lai spēli varētu sākt no jauna:
    restart.style.visibility = 'visible';
    restart.disabled = false;    
}

function restartGame(){
    restart.addEventListener('click', () => {
        //Sagatavo spēli, lai tā izskatītos kā pašā sākumā:
        playerScore = 0;
        computerScore = 0;
        gameDiv.style.visibility = 'hidden';
        restart.style.visibility = 'hidden';
        start.style.display = 'block';
        start.disabled = false;
        winnerScore.textContent = "";
        winnerScore.classList.remove("smallBox"); 
    });
}

start.addEventListener('click', () => {
    start.style.display = 'none';
    gameDiv.style.visibility = 'hidden';
    buttons.forEach((button) => {
        button.disabled = false;                  
    });
    title.style.visibility = 'visible';  
});

buttons.forEach((button) => {
    //Lai nevarētu sākt gājienu, pirms nospiests "Start":
    button.disabled = true;
    button.style.color = 'black';
    start.disabled = false;

    button.addEventListener('click', () => {
        if(button.value !== 'start'){  
            gameDiv.style.visibility = 'visible';
            game(button.value);
        }
    });
}); 



