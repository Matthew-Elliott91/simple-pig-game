'use strict';

const diceRoll = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const diceImage = document.querySelector('.dice');
const player0CurrentScore = document.querySelector('#current--0');
const player1CurrentScore = document.querySelector('#current--1');

diceRoll.addEventListener('click', function () {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  diceImage.src = `dice-${randomNumber}.png`;
  console.log(randomNumber);
  if (randomNumber !== 1) {
    player0CurrentScore.textContent =
      Number(player0CurrentScore.textContent) + randomNumber;
  }
});
