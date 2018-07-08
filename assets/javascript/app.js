let playerScore = 0;
let  player2Score = 0;
const playerScore_span = document.getElementById("playerScore");
const player2Score_span = document.getElementById("player2Score");
const scoreBoard_div = document.querySelector(".Score-Board");
const Result_p = document.querySelector(".Result > p");
const rock_div = document.getElementById("R");
const paper_div = document.getElementById("P");
const scissors_div = document.getElementById("S");
const rock_div2 = document.getElementById("R2");
const paper_div2 = document.getElementById("P2");
const scissors_div2 = document.getElementById("S2");
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



 


    function player2Choice() {
    const choices = ['R','P','S'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
} 

    function convertToWord(letter) {
        if (letter === "R") return "ROCK";
        if (letter === "P") return "PAPER";
        return "SCISSORS";
        }

    function win(playerScore,player2Score) {
        playerScore++;
        playerScore.innerHTML = playerScore;
        player2Score_span.innerHTML = player2Score;
        const smallUserWord =  "Player1".fontsize(3).sub();
        const smallCompWord = " Player2".fontsize(3).sub();
        Result_p.innerHTML = `${convertToWord(playerScore)}${smallUserWord} beats ${convertToWord(player2Score)}${smallCompWord}. You Win!`;
    }

    function lose(playerScore, player2Score)  {
        player2Score++;
        playerScore.innerHTML = playerScore;
        player2Score_span.innerHTML = player2Score;
        const smallUserWord = "Player1".fontsize(3).sub();
        const smallCompWord = "Player2".fontsize(3).sub();
        Result_p.innerHTML = `${convertToWord(playerScore)}${smallUserWord} beats ${convertToWord(player2Score)}${smallCompWord}. You Lost!`;
    
    }   

    function draw(playerScore, player2Score){  
        const playerScore = "Player1".fontsize(3).sub();
        const player2Score = "Player2".fontsize(3).sub();
        Result_p.innerHTML = `${convertToWord(playerScore)}${smallUserWord} beats ${convertToWord(player2Score)}${smallCompWord}. Its A draw!`;

    } 
    
    
    
    function game(player2Choice,) {
    const player2Score = player2Choice();
    switch (playerScore + player2Score) {
        case "RS":
        case "PR":
        case "SP":
        win(playerScore, player2Score);
        break;
        case "RP":
        case "PS":
        case "SR":
        lose(playerScore, player2Score);
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

rock_div2.addEventListener('click', function() {
    game("R2");


});
paper_div2.addEventListener('click', function() {
    game("P2");


});
scissors_div2.addEventListener('click', function() {
    game("S2");


});
}
 main();