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
                      <a href="https://github.com/kostik-omsk/minesweeper" class="github-link" target="_blank">
                      <svg id="github" width="60" height="60" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.8">
                      <path d="M15 5C9.47833 5 5 9.59069 5 15.2528C5 19.7828 7.865 23.6259 11.8391 24.9818C12.3383 25.0767 12.5 24.7588 12.5 24.4889V22.5801C9.71833 23.2004 9.13916 21.3703 9.13916 21.3703C8.68416 20.1853 8.02834 19.87 8.02834 19.87C7.12084 19.2334 8.0975 19.2471 8.0975 19.2471C9.10167 19.3189 9.63 20.304 9.63 20.304C10.5217 21.871 11.9691 21.4182 12.54 21.1558C12.6291 20.4937 12.8884 20.0409 13.175 19.7854C10.9542 19.5248 8.61916 18.6456 8.61916 14.718C8.61916 13.5978 9.01 12.6836 9.64917 11.9659C9.54584 11.707 9.20333 10.6638 9.74667 9.25235C9.74667 9.25235 10.5866 8.97723 12.4975 10.3033C13.295 10.076 14.15 9.96236 15 9.95808C15.85 9.96236 16.7059 10.076 17.505 10.3033C19.4142 8.97723 20.2525 9.25235 20.2525 9.25235C20.7966 10.6647 20.4542 11.7079 20.3509 11.9659C20.9925 12.6836 21.38 13.5987 21.38 14.718C21.38 18.6559 19.0408 19.5231 16.8141 19.7768C17.1725 20.0947 17.5 20.7184 17.5 21.6753V24.4889C17.5 24.7614 17.66 25.0818 18.1675 24.981C22.1383 23.6233 25 19.7811 25 15.2528C25 9.59069 20.5225 5 15 5Z" fill="white"/>
                      </g>
                      </svg><sapn>GitHub</sapn>                       
                      </a>

                    </div>`;
  body.insertAdjacentHTML('afterbegin', gameHtml);
}
