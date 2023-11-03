import boomImg from '../images/boom.png';
import timeImg from '../images/time.png';
import flagImg from '../images/flag.png';
import movesImg from '../images/moves.png';
import volumeImg from '../images/volume.png';
import resImg from '../images/pedestal.png';

export default function createBoardGame() {
  const body = document.querySelector('body');
  const gameHtml = ` 
                    <div class="game">
                      <h1 class="title">Minesweeper!!!</h1>
                      <div class="game-container">
                        <div class="game-control">
                          <div class="new-game">
                            <button class="btn-new-game">New Game</button> 
                            <select class="game-level">
                              <option value="simple">simple</option>
                              <option value="medium">medium</option>
                              <option value="hard">hard</option>
                            </select>
                            <div class="volume">
                              <img class="volume__img icons" src="${volumeImg}" alt="">
                            </div>
                            <div class="result">
                              <img class="result__img icons" src="${resImg}" alt="">
                            </div>
                            <div class="checkbox-wrapper">
                              <input class="tgl" id="darkmode" type="checkbox" />
                              <label class="tgl-btn" for="darkmode">
                              <svg class="icon icon_sun" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.9998" cy="11.9998" r="5.75375" fill="currentColor" />
                                  <g>
                                    <circle cx="3.08982" cy="6.85502" r="1.71143" transform="rotate(-60 3.08982 6.85502)" fill="currentColor" />
                                    <circle cx="3.0903" cy="17.1436" r="1.71143" transform="rotate(-120 3.0903 17.1436)" fill="currentColor" />
                                    <circle cx="12" cy="22.2881" r="1.71143" fill="currentColor" />
                                    <circle cx="20.9101" cy="17.1436" r="1.71143" transform="rotate(-60 20.9101 17.1436)" fill="currentColor" />
                                    <circle cx="20.9101" cy="6.8555" r="1.71143" transform="rotate(-120 20.9101 6.8555)" fill="currentColor" />
                                    <circle cx="12" cy="1.71143" r="1.71143" fill="currentColor" />
                                  </g>
                                </circle>
                              </svg>
                              <svg class="icon icon_moon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 50 50">
                                <path d="M 43.81 29.354 C 43.688 28.958 43.413 28.626 43.046 28.432 C 42.679 28.238 42.251 28.198 41.854 28.321 C 36.161 29.886 30.067 28.272 25.894 24.096 C 21.722 19.92 20.113 13.824 21.683 8.133 C 21.848 7.582 21.697 6.985 21.29 6.578 C 20.884 6.172 20.287 6.022 19.736 6.187 C 10.659 8.728 4.691 17.389 5.55 26.776 C 6.408 36.163 13.847 43.598 23.235 44.451 C 32.622 45.304 41.28 39.332 43.816 30.253 C 43.902 29.96 43.9 29.647 43.81 29.354 Z" fill="currentColor" />
                              </svg>
                              </label>
                            </div>
                          </div>
                          <div class="info">
                            <div class="mine">
                              <input type="range" id="minesRange" class="mines-range slider-progress" min="10" max="99" value="10">
                              <img class="mine__img icons" src="${boomImg}" alt="">
                              <p class="mine__count">00</p>
                            </div>
                            <div class="flag">
                              <img class="flag__img icons" src="${flagImg}" alt="">
                              <p class="flag__count">0</p>
                            </div>
                            <div class="moves">
                              <img class="moves__img icons" src="${movesImg}" alt="">
                              <p class="moves__count">0</p>
                            </div>
                            <div class="time">
                              <img class="time__img icons" src="${timeImg}" alt="">
                              <p class="time__stopwatch">00</p>
                            </div>
                          </div> 
                        </div>
                        <div class="game-board">
                          <canvas id="game-board"   width="480" height="480"></canvas>
                        </div>
                      </div>
                    </div>`;
  body.insertAdjacentHTML('afterbegin', gameHtml);
}
