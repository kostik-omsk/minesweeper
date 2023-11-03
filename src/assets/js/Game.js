/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import flagImg from '../images/flag.png';
import mineImg from '../images/boom2.png';
import volumeImg from '../images/volume.png';
import volumemuteImg from '../images/volume-mute.png';
import clickАudio from '../sound/click.mp3';
import boomАudio from '../sound/boom.mp3';
import flagAudio from '../sound/flag.mp3';
import winAudio from '../sound/win.mp3';
import saveResult from './saveResult';
import createAudioElement from './createAudioElement';

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.levels = {
      simple: { cells: 10, numMines: 10 },
      medium: { cells: 15, numMines: 30 },
      hard: { cells: 20, numMines: 50 },
    };
    this.level = 'simple';
    this.setGameLevel(this.level);
    this.resetBoard();
    this.flagImage = new Image();
    this.mineImage = new Image();
    this.volumeImage = new Image();
    this.volumemuteImage = new Image();
    this.flagImage.src = flagImg;
    this.mineImage.src = mineImg;
    this.volumeImage.src = volumeImg;
    this.volumemuteImage.src = volumemuteImg;
    this.imagesLoaded = Promise.all([
      this.loadImage(this.flagImage),
      this.loadImage(this.mineImage),
      this.loadImage(this.volumeImage),
      this.loadImage(this.volumemuteImage),
    ]);
    this.imagesLoaded.then(() => {
      this.init();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  loadImage(image) {
    return new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });
  }

  setGameLevel(level) {
    this.level = level;
    const { cells, numMines } = this.levels[this.level];
    this.numMines = numMines;
    this.cells = cells;
    this.cellSize = 480 / cells;
    this.numCells = cells * cells;
  }

  resetBoard() {
    this.board = [];
    this.cordMin = [];
    this.seconds = 0;
    this.firstClick = true;
    this.numRevealed = 0;
    this.countFlag = 0;
    this.isGameover = false;
    this.numberMoves = 0;
    this.volume = JSON.parse(localStorage.getItem('volume') || 'true');
    this.darkmode = JSON.parse(localStorage.getItem('darkmode') || 'false');
  }

  newLevel(level) {
    this.setGameLevel(level);
    this.resetBoard();
    this.generateBoard();
    this.updateMovesCount();
    clearInterval(this.timer);
    const stopwatchElement = document.querySelector('.time__stopwatch');
    stopwatchElement.innerText = '00';
    this.saveGame();
    this.rangeMines();
  }

  saveGame() {
    const gameData = {
      level: this.level,
      board: this.board,
      cordMin: this.cordMin,
      numMines: this.numMines,
      firstClick: this.firstClick,
      numRevealed: this.numRevealed,
      countFlag: this.countFlag,
      isGameover: this.isGameover,
      cells: this.cells,
      cellSize: this.cellSize,
      seconds: this.seconds,
      numberMoves: this.numberMoves,
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
  }

  loadGame() {
    const savedData = localStorage.getItem('gameData');
    if (savedData) {
      const gameData = JSON.parse(savedData);
      this.level = gameData.level;
      this.board = gameData.board;
      this.cordMin = gameData.cordMin;
      this.firstClick = gameData.firstClick;
      this.numRevealed = gameData.numRevealed;
      this.countFlag = gameData.countFlag;
      this.isGameover = gameData.isGameover;
      this.cells = gameData.cells;
      this.cellSize = gameData.cellSize;
      this.numMines = gameData.numMines;
      this.seconds = gameData.seconds;
      this.numberMoves = gameData.numberMoves;

      for (let row = 0; row < this.cells; row += 1) {
        for (let col = 0; col < this.cells; col += 1) {
          const cell = this.board[row][col];
          if (cell.isRevealed) {
            this.drawRevealedCell(row, col);
          } else {
            this.drawClosedCell(row, col);
            if (cell.isFlagged) {
              this.addFlag(row, col);
            }
          }
        }
      }
      if (!this.firstClick) this.startTimer(gameData.seconds);
      this.updatelevel();
      this.updateFlagCount();
      this.updateMineCount();
      this.updateMovesCount();
      this.rangeMines();
      this.toggleVolume(this.volume);
      this.toggleDarkMode(this.darkmode);
    }
  }

  toggleVolume(volume) {
    const volumeimg = document.querySelector('.volume__img');
    if (volume) {
      volumeimg.src = this.volumeImage.src;
    } else {
      volumeimg.src = this.volumemuteImage.src;
    }
  }

  toggleDarkMode(dark) {
    const body = document.querySelector('body');
    const darkmode = document.querySelector('#darkmode');
    darkmode.checked = dark;
    if (dark) {
      body.classList.add('darkmode');
    } else {
      body.classList.remove('darkmode');
    }
    for (let row = 0; row < this.cells; row += 1) {
      for (let col = 0; col < this.cells; col += 1) {
        if (!this.board[row][col].isRevealed) {
          this.drawClosedCell(row, col);
        }
        if (this.board[row][col].isFlagged) {
          this.addFlag(row, col);
        }
      }
    }
  }

  updatelevel() {
    const level = document.querySelector('.game-level');
    level.value = this.level;
  }

  updateFlagCount() {
    const count = document.querySelector('.flag__count');
    count.innerText = this.countFlag;
  }

  updateMineCount() {
    const countBoom = document.querySelector('.mine__count');
    countBoom.innerText = this.numMines;
  }

  updateMovesCount() {
    const countMoves = document.querySelector('.moves__count');
    countMoves.innerText = this.numberMoves;
  }

  rangeMines() {
    const minesRange = document.getElementById('minesRange');
    if (this.firstClick) {
      minesRange.disabled = false;
    } else {
      minesRange.disabled = true;
    }
    minesRange.value = this.numMines;
    minesRange.addEventListener('input', () => {
      const minesCount = document.querySelector('.mine__count');
      const selectedMines = Number(minesRange.value);
      this.numMines = selectedMines;
      minesCount.innerText = selectedMines;
    });
  }

  startTimer(savedSeconds = 0) {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    // if () {
    const stopwatchElement = document.querySelector('.time__stopwatch');
    this.seconds = savedSeconds;
    stopwatchElement.innerText = this.seconds.toString().padStart(2, '0');
    this.timer = setInterval(() => {
      this.seconds += 1;
      stopwatchElement.innerText = this.seconds.toString().padStart(2, '0');
      this.saveGame();
    }, 1000);
  }

  generateBoard() {
    this.updateFlagCount();
    this.updateMineCount();
    for (let row = 0; row < this.cells; row += 1) {
      const rowData = [];
      for (let col = 0; col < this.cells; col += 1) {
        this.drawClosedCell(row, col);
        rowData.push({
          isMine: false,
          isFlagged: false,
          isRevealed: false,
          value: 0,
        });
      }
      this.board.push(rowData);
    }
  }

  placeMines(firstRow, firstCol) {
    let minesToPlace = this.numMines;
    while (minesToPlace > 0) {
      const row = Math.floor(Math.random() * this.cells);
      const col = Math.floor(Math.random() * this.cells);
      const cell = this.board[row][col];
      if (!cell.isMine && !(row === firstRow && col === firstCol)) {
        cell.isMine = true;
        this.cordMin.push({ row, col });
        minesToPlace -= 1;
        for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, this.cells - 1); i += 1) {
          for (let j = Math.max(col - 1, 0); j <= Math.min(col + 1, this.cells - 1); j += 1) {
            const adjacentCell = this.board[i][j];
            if (!adjacentCell.isMine) {
              adjacentCell.value += 1;
            }
          }
        }
      }
    }
  }

  drawClosedCell(row, col) {
    if (this.darkmode) {
      this.ctx.fillStyle = '#8a8a8a';
    } else {
      this.ctx.fillStyle = '#272727';
    }
    const x = col * this.cellSize;
    const y = row * this.cellSize;
    this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
    if (this.darkmode) {
      this.ctx.fillStyle = '#272727';
    } else {
      this.ctx.fillStyle = '#8a8a8a';
    }
    this.ctx.fillRect(x, y, this.cellSize - 1, this.cellSize - 1);
  }

  drawRevealedCell(row, col) {
    const cell = this.board[row][col];
    const x = col * this.cellSize;
    const y = row * this.cellSize;
    this.ctx.fillStyle = '#8a8a8a';
    this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
    this.ctx.fillStyle = '#e2e2e2';
    this.ctx.fillRect(x, y, this.cellSize - 1, this.cellSize - 1);
    if (cell.value > 0) {
      switch (cell.value) {
        case 1:
          this.ctx.fillStyle = 'blue';
          break;
        case 2:
          this.ctx.fillStyle = 'green';
          break;
        case 3:
          this.ctx.fillStyle = 'red';
          break;
        case 4:
          this.ctx.fillStyle = 'purple';
          break;
        case 5:
          this.ctx.fillStyle = 'orange';
          break;
        case 6:
          this.ctx.fillStyle = 'brown';
          break;
        case 7:
          this.ctx.fillStyle = 'pink';
          break;
        default:
          this.ctx.fillStyle = 'black';
          break;
      }
      const text = cell.value.toString();
      const textWidth = this.ctx.measureText(text).width;
      const centerX = col * this.cellSize + this.cellSize / 2;
      const centerY = row * this.cellSize + this.cellSize / 2;
      const textX = centerX - textWidth / 2;
      let textY = centerY + 10;
      switch (this.numMines) {
        case 10:
          this.ctx.font = '30px Arial';
          break;
        case 30:
          this.ctx.font = '22px Arial';
          textY = centerY + 9;
          break;
        default:
          this.ctx.font = '20px Arial';
          textY = centerY + 8;
          break;
      }
      this.ctx.fillText(text, textX, textY);
    }
    cell.isRevealed = true;
  }

  addFlag(row, col) {
    this.ctx.drawImage(
      this.flagImage,
      col * this.cellSize,
      row * this.cellSize,
      this.cellSize,
      this.cellSize,
    );
  }

  removeFlag(row, col) {
    if (this.darkmode) {
      this.ctx.fillStyle = '#8a8a8a';
    } else {
      this.ctx.fillStyle = '#272727';
    }
    const x = col * this.cellSize;
    const y = row * this.cellSize;
    this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
    if (this.darkmode) {
      this.ctx.fillStyle = '#272727';
    } else {
      this.ctx.fillStyle = '#8a8a8a';
    }
    this.ctx.fillRect(x, y, this.cellSize - 1, this.cellSize - 1);
  }

  revealCell(row, col) {
    const cell = this.board[row][col];
    cell.isRevealed = true;
    this.numRevealed += 1;
    this.drawRevealedCell(row, col);
  }

  revealSurroundingCells(row, col) {
    const cellsToCheck = [{ row, col }];
    while (cellsToCheck.length) {
      const { row, col } = cellsToCheck.pop();
      for (let i = row - 1; i <= row + 1; i += 1) {
        for (let j = col - 1; j <= col + 1; j += 1) {
          if (i >= 0 && i < this.cells && j >= 0 && j < this.cells) {
            const cell = this.board[i][j];
            if (!cell.isRevealed && !cell.isFlagged) {
              this.revealCell(i, j);
              if (cell.value === 0) {
                cellsToCheck.push({ row: i, col: j });
              }
            }
          }
        }
      }
    }
  }

  gameOver() {
    this.isGameover = true;
    localStorage.removeItem('gameData');
    this.cordMin.forEach(({ row, col }) => {
      const cell = this.board[row][col];
      if (cell.isMine && !cell.isFlagged) {
        this.ctx.drawImage(
          this.mineImage,
          col * this.cellSize,
          row * this.cellSize,
          this.cellSize,
          this.cellSize,
        );
      }
    });
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    const gameOverMessage = document.createElement('div');
    const board = document.querySelector('.game-board');
    gameOverMessage.innerText = 'Game over. Try again';
    gameOverMessage.classList.add('game-message');
    board.append(gameOverMessage);
    const result = {
      game: false,
      level: this.level,
      mines: this.numMines,
      moves: this.numberMoves,
      seconds: this.seconds,
    };
    saveResult(result);
  }

  checkWin() {
    const openCell = this.numRevealed + this.numMines === this.numCells;
    if (openCell) {
      localStorage.removeItem('gameData');
      this.playSound(this.winSound);
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.timer = null;
      }
      const gameOverMessage = document.createElement('div');
      const board = document.querySelector('.game-board');
      gameOverMessage.innerText = `Hooray! You found all mines in ${this.seconds} seconds and ${this.numberMoves} moves!`;
      gameOverMessage.classList.add('game-message');
      board.append(gameOverMessage);
      localStorage.removeItem('gameData');
      const result = {
        game: true,
        level: this.level,
        mines: this.numMines,
        moves: this.numberMoves,
        seconds: this.seconds,
      };
      saveResult(result);
    }
  }

  getClickedCell(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    const row = Math.floor(y / this.cellSize);
    const col = Math.floor(x / this.cellSize);
    return { row, col };
  }

  playSound(sound) {
    if (this.volume) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  click(e) {
    const { row, col } = this.getClickedCell(e);
    const cell = this.board[row][col];
    if (this.isGameover) return;
    if (this.firstClick) {
      this.placeMines(row, col);
      this.startTimer();
    }
    this.firstClick = false;
    this.rangeMines();
    if (!cell.isRevealed && !cell.isFlagged) {
      this.numberMoves += 1;
      this.updateMovesCount();
      if (cell.isMine) {
        this.playSound(this.boomSound);
        this.gameOver();
      } else {
        this.playSound(this.clickSound);
        this.revealCell(row, col);
        if (cell.value === 0) {
          this.revealSurroundingCells(row, col);
        }
        this.saveGame();
        this.checkWin();
      }
    }
  }

  clickFlag(e) {
    if (this.isGameover) return;
    e.preventDefault();
    const { row, col } = this.getClickedCell(e);
    const cell = this.board[row][col];
    if (!cell.isRevealed) {
      this.playSound(this.flagSound);
      if (cell.isFlagged) {
        cell.isFlagged = false;
        this.removeFlag(row, col);
        this.countFlag -= 1;
      } else {
        cell.isFlagged = true;
        this.addFlag(row, col);
        this.countFlag += 1;
      }
    }
    this.saveGame();
    this.checkWin();
    this.updateFlagCount();
  }

  init() {
    const savedData = localStorage.getItem('gameData');
    if (savedData) {
      this.loadGame();
    } else {
      this.generateBoard();
    }
    this.rangeMines();
    this.toggleVolume(this.volume);
    this.toggleDarkMode(this.darkmode);
    this.clickSound = createAudioElement(clickАudio);
    this.boomSound = createAudioElement(boomАudio);
    this.flagSound = createAudioElement(flagAudio);
    this.winSound = createAudioElement(winAudio);
    this.canvas.addEventListener('click', this.click.bind(this));
    this.canvas.addEventListener('contextmenu', this.clickFlag.bind(this));
  }
}
