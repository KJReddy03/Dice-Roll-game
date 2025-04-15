'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Player Score set to 0
score0El.textContent = 0;
score1El.textContent = 0;
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
diceEl.classList.add('hidden');

const playerSwitch = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  currentScore = 0;
};

//Dice roll
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generate a random roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.dispaly the rolled dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.if 1 change to next player
    if (dice === 1) {
      //changing the active player
      playerSwitch();
    } else {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  } else {
    alert('The Game is completed!');
  }
});

//Holding values
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add the current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check the score is 100
    if (scores[activePlayer] >= 100) {
      //active player wins
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //switch player
      playerSwitch();
    }
  } else {
    alert('The Game is completed!');
  }
});

btnNew.addEventListener('click', function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  scores[0] = 0;
  scores[1] = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  activePlayer = 0;
  playing = true;
});

//display the rules
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseRules = document.querySelector('.close-rules');
const btnShowRules = document.querySelector('.show-rules');

//Open the modal
const openRules = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

//Close the modal
const closeRules = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnShowRules.addEventListener('click', openRules);

btnCloseRules.addEventListener('click', closeRules);
overlay.addEventListener('click', closeRules);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeRules();
  }
});
