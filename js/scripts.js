/* REFERENCJE DO HTML-A */

var newGameBtn = document.getElementById('js-newGameButton');
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

/* PrzypiÍcie eventow */

newGameBtn.addEventListener('click', newGame);

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

/* PODSTAWOWE OBIEKTY, DANE */

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

/**************** GENEROWANIE PLANSZY **********************/

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
      break;
    case 'notStarted':
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
        break;

  }
}

setGameElements();

/**************** NOWA GRA ******************/

function newGame() {

  player.name = prompt('Please enter your name', 'imi  gracza');

  if (player.name.length > 0) {

    //wpisaÊ w html nazwÍ naszego gracza
    playerNameElem.innerHTML = player.name;

    //zerowanie wynikow
    player.score = 0;
    computer.score = 0;
    setGamePoints();

    gameState = 'started';
    setGameElements(); //aktualizacja planszy

  }

}


/******************* PLAYER PICK *********************/

function playerPick(playerPick) {

    //losowanie wyboru komputera
    var computerPick = getComputerPick();

    //aktualizacja wyboru w html-u
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);

    //sprawdz, czy to juz nie jest koniec gry
    checkEnd();
}

/******************** SPRAWDè ZWYCI ZCE *****************/

function checkRoundWinner(playerPick, computerPick) {

  //zerowanie informacji o zyciÍstwie
  playerResultElem.innerHTML = "";
  computerResultElem.innerHTML = '';

    if (playerPick == computerPick) {

    } else if ((computerPick == 'rock' &&  playerPick == 'scissors') || (computerPick == 'scissors' &&  playerPick == 'paper') || (computerPick == 'paper' &&  playerPick == 'rock')) {
          computerResultElem.innerHTML = "Win!";
          computer.score++;
          setGamePoints();
    } else {
          playerResultElem.innerHTML = "Win!";
          player.score++;
          setGamePoints();
    }

}

/***************** SPRAWDZ CZY TO JUZ KONIEC ***************/

function checkEnd() {
  if(player.score == 10) {
    console.log("Wygra≥ gracz");
    gameState = "ended";
    setGameElements();
  }
  else if(computer.score == 10) {
    console.log("Wygra≥ komputer");
    gameState = "ended";
    setGameElements();
  }
}

/****************************************************************
/**************** FUNCKJE POMOCNICZNE ***************************
*****************************************************************/

/********** AKTUALIZACJA WYNIKOW W HTML-U ************/

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}


/***************** LOSOWANIE WYBORU KOMPUTERA *****************/

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}