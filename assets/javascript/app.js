let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-Score");
const computerScore_span = document.getElementById("computer-Score");
const scoreBoard_div = document.querySelector(".Score-Board");
const Result_p = document.querySelector(".Result > p");
const rock_div = document.getElementById("R");
const paper_div = document.getElementById("P");
const scissors_div = document.getElementById("S");
 
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDYj-uoClopDBXN1KCW7EyZjF6DSV10n0E",
    authDomain: "rps-game-c8fc6.firebaseapp.com",
    databaseURL: "https://rps-game-c8fc6.firebaseio.com",
    projectId: "rps-game-c8fc6",
    storageBucket: "",
    messagingSenderId: "332516704285"
}; 
firebase.initializeApp(config);
console.log(firebase);

var database = firebase.database();

var ref = database.ref('Scores');

var data ={
    name: "bizybiz",
    score:40
}

ref.push(data);
console.log(data);

function getComputerChoice() {
    const choices = ['R','P','S'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
} 

    function convertToWord(letter) {
        if (letter === "R") return "ROCK";
        if (letter === "P") return "PAPER";
        return "SCISSORS";
        }

    function win(userChoice, computerChoice) {
        userScore++;
        userScore_span.innerHTML = userScore;
        computerScore_span.innerHTML = computerScore;
        const smallUserWord =  "Player1".fontsize(3).sub();
        const smallCompWord = " Player2".fontsize(3).sub();
        Result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord}. You Win!`;
    }

    function lose(userChoice, computerChoice)  {
        computerScore++;
        userScore_span.innerHTML = userScore;
        computerScore_span.innerHTML = computerScore;
        const smallUserWord = "Player1".fontsize(3).sub();
        const smallCompWord = "Player2".fontsize(3).sub();
        Result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord}. You Lost!`;
    
    }   

    function draw(userChoice, computerChoice){  
        const smallUserWord = "Player1".fontsize(3).sub();
        const smallCompWord = "Player2".fontsize(3).sub();
        Result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord}. Its A draw!`;

    } 
    
    
    
    function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case "RS":
        case "PR":
        case "SP":
        win(userChoice, computerChoice);
        break;
        case "RP":
        case "PS":
        case "SR":
        lose(userChoice, computerChoice);
        break;
        case "RR":
        case "PP":
        case "SS":
        draw();
        break;
    }
}

function main(){
rock_div.addEventListener('click', function() {
game("R");     
})

paper_div.addEventListener('click', function() {
game("P");  
})

scissors_div.addEventListener('click', function() {
game("S");  
    
})
}

 main();