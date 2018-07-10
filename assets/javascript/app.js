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
// var config = {
//     apiKey: "AIzaSyDYj-uoClopDBXN1KCW7EyZjF6DSV10n0E",
//     authDomain: "rps-game-c8fc6.firebaseapp.com",
//     databaseURL: "https://rps-game-c8fc6.firebaseio.com",
//     projectId: "rps-game-c8fc6",
//     storageBucket: "",
//     messagingSenderId: "332516704285"
// };

var config = {
    apiKey: "AIzaSyDvBsIK9yJqqebSGXcbYd6sbhY5teF2tFU",
    authDomain: "rock-paper-scissors-a9416.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-a9416.firebaseio.com",
    projectId: "rock-paper-scissors-a9416",
    storageBucket: "",
    messagingSenderId: "160392267444"
  };

var playerCount = 0;

firebase.initializeApp(config);

var database = firebase.database();

var ref = database.ref('Scores');
$("#submit-name").on("click", function(evt) {
    evt.preventDefault();
    var fname = $("#fname").val();
    if (playerCount < 2) { // if there are fewer than 2 players, add the player.
        ref.push({
            fname: fname,
            score: 0
        });
        ref.set({
            playerCount: playerCount
        });
    }
});
$("#reset").on("click", function() {
    ref.remove(); // remove all children
    ref.set({   // set count of players entered to 0
        playerCount: 0,
        playerOneChoice: null,
        playerTwoChoice: null,
    });
    playerCount = 0;
    $('#player-name-form').removeClass('hidden');  // expose the form
    $("#player-one-label").text('Player 1'); // set the placeholder for player 1
    $("#player-two-label").text('Player 2'); // set the placeholder for player 2
});
ref.on('child_added', function(childSnapShot) {
    playerCount++;
    console.log('childSnapShot', childSnapShot.val().fname);
    if (playerCount === 1) {
        $("#player-one-label").text(childSnapShot.val().fname);
    } else if (playerCount === 2) {
        $("#player-two-label").text(childSnapShot.val().fname);
        $('#player-name-form').addClass('hidden');
    }
});
ref.on('value', function(snapShot) {
    console.log('value', snapShot.val());
    if (snapShot.val() && snapShot.val().hasOwnProperty('playerOneChoice') && snapShot.val().hasOwnProperty('playerTwoChoice')) {
        var playerOneChoice = snapShot.val().playerOneChoice;
        var playerTwoChoice = snapShot.val().playerTwoChoice;

        //TODO:  Check to see who won!
        // if (playerOneChoice === 's' && playerTwoChoice === 'r') {
            // player Two Wins!  Tally the win/loss count and display the winner on the screen.
        //}
    }
});



// function getComputerChoice() {
//     const choices = ['R','P','S'];
//     const randomNumber = Math.floor(Math.random() * 3);
//     return choices[randomNumber];
// }

//     function convertToWord(letter) {
//         if (letter === "R") return "ROCK";
//         if (letter === "P") return "PAPER";
//         return "SCISSORS";
//         }

//     function win(userChoice, computerChoice) {
//         userScore++;
//         userScore_span.innerHTML = userScore;
//         computerScore_span.innerHTML = computerScore;
//         const smallUserWord =  "Player1".fontsize(3).sub();
//         const smallCompWord = " Player2".fontsize(3).sub();
//         Result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord}. You Win!`;
//     }

//     function lose(userChoice, computerChoice)  {
//         computerScore++;
//         userScore_span.innerHTML = userScore;
//         computerScore_span.innerHTML = computerScore;
//         const smallUserWord = "Player1".fontsize(3).sub();
//         const smallCompWord = "Player2".fontsize(3).sub();
//         Result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord}. You Lost!`;

//     }

//     function draw(userChoice, computerChoice){
//         const smallUserWord = "Player1".fontsize(3).sub();
//         const smallCompWord = "Player2".fontsize(3).sub();
//         Result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord}. Its A draw!`;

//     }



//     function game(userChoice) {
//     const computerChoice = getComputerChoice();
//     switch (userChoice + computerChoice) {
//         case "RS":
//         case "PR":
//         case "SP":
//         win(userChoice, computerChoice);
//         break;
//         case "RP":
//         case "PS":
//         case "SR":
//         lose(userChoice, computerChoice);
//         break;
//         case "RR":
//         case "PP":
//         case "SS":
//         draw();
//         break;
//     }
// }

$('.choice').on('click', function() {
    console.log('this', $(this).data('choice'));
    ref.update({
        playerOneChoice: $(this).data('choice')
    });
});

$('.choice2').on('click', function() {
    console.log('this2', $(this).data('choice'));
    ref.update({
        playerTwoChoice: $(this).data('choice')
    });
});

// function main(){
// rock_div.addEventListener('click', function() {
// game("R");
// })

// paper_div.addEventListener('click', function() {
// game("P");
// })

// scissors_div.addEventListener('click', function() {
// game("S");

// })
// }

//  main();