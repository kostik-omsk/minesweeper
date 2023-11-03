import './main.scss';
import createBoardGame from './assets/js/createBoardGame';
import Game from './assets/js/Game';
import showResult from './assets/js/showResult';

createBoardGame();

const canvas = document.querySelector('#game-board');
const start = new Game(canvas);
const board = document.querySelector('.game-board');
const btnNewGame = document.querySelector('.btn-new-game');
const level = document.querySelector('.game-level');
const volumeBtn = document.querySelector('.volume');
const darkmode = document.querySelector('#darkmode');
const results = document.querySelector('.result');

function removeGameOverMessage() {
  const gameOverMessage = document.querySelector('.game-message');
  const gameResult = document.querySelector('.game-result');
  if (gameOverMessage) gameOverMessage.remove();
  if (gameResult) gameResult.remove();
}

level.addEventListener('change', () => {
  const newLevel = level.value;
  start.newLevel(newLevel);
  removeGameOverMessage();
});

btnNewGame.addEventListener('click', () => {
  removeGameOverMessage();
  start.newLevel(level.value);
});

volumeBtn.addEventListener('click', () => {
  start.volume = !start.volume;
  localStorage.setItem('volume', start.volume);
  start.toggleVolume(start.volume);
});

results.addEventListener('click', () => {
  const gameResult = document.querySelector('.game-result');
  const result = showResult();
  if (!gameResult) {
    removeGameOverMessage();
    board.append(result);
  } else {
    gameResult.remove();
  }
});

darkmode.addEventListener('change', () => {
  start.darkmode = darkmode.checked;
  localStorage.setItem('darkmode', darkmode.checked);
  start.toggleDarkMode(darkmode.checked);
});
