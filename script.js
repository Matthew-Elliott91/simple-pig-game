'use strict';

// Selecting the elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0ScoreEl = document.getElementById('score--0');
const player1ScoreEl = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let amountOfRolls;

// Helper function for delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Starting conditions
const startingConditions = function () {
  player0ScoreEl.textContent = 0;
  player1ScoreEl.textContent = 0;
  diceEl.classList.add('hidden');
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset UI elements
  player0ScoreEl.textContent = 0;
  player1ScoreEl.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  // Remove winner and active classes
  player0Section.classList.remove('player--winner');
  player1Section.classList.remove('player--winner');
  player0Section.classList.add('player--active');
  player1Section.classList.remove('player--active');

  // Hide the dice
  diceEl.classList.add('hidden');
};

startingConditions();

const doRoll = function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;
  return dice;
};
// Ai gameplay
const aiGameplayLoop = async function () {
  while (amountOfRolls > 0) {
    const dice = doRoll();

    // Display the dice
    diceEl.classList.remove('hidden');
    console.log(`AI rolled: ${dice}`);

    // Delay for 1 second
    await delay(2000);

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      amountOfRolls--;
    } else {
      console.log('AI rolled a 1');
      amountOfRolls = 0;
      break;
    }
  }

  // Finalize the turn
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }
};

const aiPlay = async function () {
  amountOfRolls = Math.trunc(Math.random() * 4) + 1;
  console.log(`AI will roll ${amountOfRolls} times.`);
  await aiGameplayLoop();
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Section.classList.toggle('player--active');
  player1Section.classList.toggle('player--active');

  if (activePlayer === 1) {
    aiPlay();
  }
};

// Rolling the Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. If rolled 1 switch to next player, otherwise add dice to score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current player score to overall score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  startingConditions();
});
