(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var i=e.g.document;if(!t&&i&&(i.currentScript&&(t=i.currentScript.src),!t)){var s=i.getElementsByTagName("script");if(s.length)for(var l=s.length-1;l>-1&&!t;)t=s[l--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();const t=e.p+"images\\boom.4bbe6bcb.png",i=e.p+"images\\time.66b6fda8.png",s=e.p+"images\\flag.41a4e7f8.png",l=e.p+"images\\moves.dbdebc5f.png",a=e.p+"images\\volume.e69bb093.png",n=e.p+"images\\pedestal.19812fd3.png",o=e.p+"images\\boom2.12878515.png",r=e.p+"images\\volume-mute.6ccacf62.png",c={click:e.p+"assets/songs/click.mp3",boom:[e.p+"assets/songs/boom.mp3",e.p+"assets/songs/boom2.mp3",e.p+"assets/songs/boom3.mp3",e.p+"assets/songs/boom4.mp3"],flag:e.p+"assets/songs/flag.mp3",win:e.p+"assets/songs/win.mp3"};function u(e){var t=JSON.parse(localStorage.getItem("results"))||[];t.unshift(e),t.length>10&&t.pop(),localStorage.setItem("results",JSON.stringify(t))}var m=0;function h(e){if(Array.isArray(e)){var t=new Audio;return t.src=e[m],m=(m+1)%e.length,t}var i=new Audio;return i.src=e,i}function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function v(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,(void 0,l=function(e,t){if("object"!==d(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var s=i.call(e,"string");if("object"!==d(s))return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(s.key),"symbol"===d(l)?l:String(l)),s)}var l}var g,f,p=function(){function e(t){var i=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.canvas=t,this.ctx=t.getContext("2d"),this.levels={simple:{cells:10,numMines:10},medium:{cells:15,numMines:30},hard:{cells:20,numMines:50}},this.level="simple",this.setGameLevel(this.level),this.resetBoard(),this.flagImage=new Image,this.mineImage=new Image,this.volumeImage=new Image,this.volumemuteImage=new Image,this.flagImage.src=s,this.mineImage.src=o,this.volumeImage.src=a,this.volumemuteImage.src=r,this.imagesLoaded=Promise.all([this.loadImage(this.flagImage),this.loadImage(this.mineImage),this.loadImage(this.volumeImage),this.loadImage(this.volumemuteImage)]),this.imagesLoaded.then((function(){i.init()})),this.currentSound=null}var t,i;return t=e,i=[{key:"loadImage",value:function(e){return new Promise((function(t,i){e.onload=t,e.onerror=i}))}},{key:"setGameLevel",value:function(e){this.level=e;var t=this.levels[this.level],i=t.cells,s=t.numMines;this.numMines=s,this.cells=i,this.cellSize=480/i,this.numCells=i*i}},{key:"resetBoard",value:function(){this.board=[],this.cordMin=[],this.seconds=0,this.firstClick=!0,this.numRevealed=0,this.countFlag=0,this.isGameover=!1,this.numberMoves=0,this.volume=JSON.parse(localStorage.getItem("volume")||"true"),this.darkmode=JSON.parse(localStorage.getItem("darkmode")||"false"),this.stopSound()}},{key:"newLevel",value:function(e){this.setGameLevel(e),this.resetBoard(),this.generateBoard(),this.updateMovesCount(),clearInterval(this.timer),document.querySelector(".time__stopwatch").innerText="00",this.saveGame(),this.rangeMines()}},{key:"saveGame",value:function(){var e={level:this.level,board:this.board,cordMin:this.cordMin,numMines:this.numMines,firstClick:this.firstClick,numRevealed:this.numRevealed,countFlag:this.countFlag,isGameover:this.isGameover,cells:this.cells,cellSize:this.cellSize,seconds:this.seconds,numberMoves:this.numberMoves};localStorage.setItem("gameData",JSON.stringify(e))}},{key:"loadGame",value:function(){var e=localStorage.getItem("gameData");if(e){var t=JSON.parse(e);this.level=t.level,this.board=t.board,this.cordMin=t.cordMin,this.firstClick=t.firstClick,this.numRevealed=t.numRevealed,this.countFlag=t.countFlag,this.isGameover=t.isGameover,this.cells=t.cells,this.cellSize=t.cellSize,this.numMines=t.numMines,this.seconds=t.seconds,this.numberMoves=t.numberMoves;for(var i=0;i<this.cells;i+=1)for(var s=0;s<this.cells;s+=1){var l=this.board[i][s];l.isRevealed?this.drawRevealedCell(i,s):(this.drawClosedCell(i,s),l.isFlagged&&this.addFlag(i,s))}this.firstClick||this.startTimer(t.seconds),this.updatelevel(),this.updateFlagCount(),this.updateMineCount(),this.updateMovesCount(),this.rangeMines(),this.toggleVolume(this.volume),this.toggleDarkMode(this.darkmode)}}},{key:"toggleVolume",value:function(e){document.querySelector(".volume__img").src=e?this.volumeImage.src:this.volumemuteImage.src}},{key:"toggleDarkMode",value:function(e){var t=document.querySelector("body");document.querySelector("#darkmode").checked=e,e?t.classList.add("darkmode"):t.classList.remove("darkmode");for(var i=0;i<this.cells;i+=1)for(var s=0;s<this.cells;s+=1)this.board[i][s].isRevealed||this.drawClosedCell(i,s),this.board[i][s].isFlagged&&this.addFlag(i,s)}},{key:"updatelevel",value:function(){document.querySelector(".game-level").value=this.level}},{key:"updateFlagCount",value:function(){document.querySelector(".flag__count").innerText=this.countFlag}},{key:"updateMineCount",value:function(){document.querySelector(".mine__count").innerText=this.numMines}},{key:"updateMovesCount",value:function(){document.querySelector(".moves__count").innerText=this.numberMoves}},{key:"rangeMines",value:function(){var e=this,t=document.getElementById("minesRange");this.firstClick?t.disabled=!1:t.disabled=!0,t.value=this.numMines,t.addEventListener("input",(function(){var i=document.querySelector(".mine__count"),s=Number(t.value);e.numMines=s,i.innerText=s}))}},{key:"startTimer",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;null!==this.timer&&(clearInterval(this.timer),this.timer=null);var i=document.querySelector(".time__stopwatch");this.seconds=t,i.innerText=this.seconds.toString().padStart(2,"0"),this.timer=setInterval((function(){e.seconds+=1,i.innerText=e.seconds.toString().padStart(2,"0"),e.saveGame()}),1e3)}},{key:"generateBoard",value:function(){this.updateFlagCount(),this.updateMineCount();for(var e=0;e<this.cells;e+=1){for(var t=[],i=0;i<this.cells;i+=1)this.drawClosedCell(e,i),t.push({isMine:!1,isFlagged:!1,isRevealed:!1,value:0});this.board.push(t)}}},{key:"placeMines",value:function(e,t){for(var i=this.numMines;i>0;){var s=Math.floor(Math.random()*this.cells),l=Math.floor(Math.random()*this.cells),a=this.board[s][l];if(!a.isMine&&(s!==e||l!==t)){a.isMine=!0,this.cordMin.push({row:s,col:l}),i-=1;for(var n=Math.max(s-1,0);n<=Math.min(s+1,this.cells-1);n+=1)for(var o=Math.max(l-1,0);o<=Math.min(l+1,this.cells-1);o+=1){var r=this.board[n][o];r.isMine||(r.value+=1)}}}}},{key:"drawClosedCell",value:function(e,t){this.darkmode?this.ctx.fillStyle="#8a8a8a":this.ctx.fillStyle="#272727";var i=t*this.cellSize,s=e*this.cellSize;this.ctx.fillRect(i,s,this.cellSize,this.cellSize),this.darkmode?this.ctx.fillStyle="#272727":this.ctx.fillStyle="#8a8a8a",this.ctx.fillRect(i,s,this.cellSize-1,this.cellSize-1)}},{key:"drawRevealedCell",value:function(e,t){var i=this.board[e][t],s=t*this.cellSize,l=e*this.cellSize;if(this.ctx.fillStyle="#8a8a8a",this.ctx.fillRect(s,l,this.cellSize,this.cellSize),this.ctx.fillStyle="#e2e2e2",this.ctx.fillRect(s,l,this.cellSize-1,this.cellSize-1),i.value>0){switch(i.value){case 1:this.ctx.fillStyle="blue";break;case 2:this.ctx.fillStyle="green";break;case 3:this.ctx.fillStyle="red";break;case 4:this.ctx.fillStyle="purple";break;case 5:this.ctx.fillStyle="orange";break;case 6:this.ctx.fillStyle="brown";break;case 7:this.ctx.fillStyle="pink";break;default:this.ctx.fillStyle="black"}var a=i.value.toString(),n=this.ctx.measureText(a).width,o=t*this.cellSize+this.cellSize/2,r=e*this.cellSize+this.cellSize/2,c=o-n/2,u=r+10;switch(this.numMines){case 10:this.ctx.font="30px Arial";break;case 30:this.ctx.font="22px Arial",u=r+9;break;default:this.ctx.font="20px Arial",u=r+8}this.ctx.fillText(a,c,u)}i.isRevealed=!0}},{key:"addFlag",value:function(e,t){this.ctx.drawImage(this.flagImage,t*this.cellSize,e*this.cellSize,this.cellSize,this.cellSize)}},{key:"removeFlag",value:function(e,t){this.darkmode?this.ctx.fillStyle="#8a8a8a":this.ctx.fillStyle="#272727";var i=t*this.cellSize,s=e*this.cellSize;this.ctx.fillRect(i,s,this.cellSize,this.cellSize),this.darkmode?this.ctx.fillStyle="#272727":this.ctx.fillStyle="#8a8a8a",this.ctx.fillRect(i,s,this.cellSize-1,this.cellSize-1)}},{key:"revealCell",value:function(e,t){this.board[e][t].isRevealed=!0,this.numRevealed+=1,this.drawRevealedCell(e,t)}},{key:"revealSurroundingCells",value:function(e,t){for(var i=[{row:e,col:t}];i.length;)for(var s=i.pop(),l=s.row,a=s.col,n=l-1;n<=l+1;n+=1)for(var o=a-1;o<=a+1;o+=1)if(n>=0&&n<this.cells&&o>=0&&o<this.cells){var r=this.board[n][o];r.isRevealed||r.isFlagged||(this.revealCell(n,o),0===r.value&&i.push({row:n,col:o}))}}},{key:"gameOver",value:function(e,t){var i=this;this.isGameover=!0,localStorage.removeItem("gameData");var s=this.board[e][t];s.isMine&&!s.isFlagged&&this.ctx.drawImage(this.mineImage,t*this.cellSize,e*this.cellSize,this.cellSize,this.cellSize),function e(){if(0!==i.cordMin.length){var t=i.cordMin.shift(),s=t.row,l=t.col,a=i.board[s][l];a.isMine&&!a.isFlagged&&i.ctx.drawImage(i.mineImage,l*i.cellSize,s*i.cellSize,i.cellSize,i.cellSize),setTimeout(e,100)}}(),null!==this.timer&&(clearInterval(this.timer),this.timer=null);var l=document.createElement("div"),a=document.querySelector(".game-board");l.innerText="Game over. Try again",l.classList.add("game-message"),a.append(l),u({game:!1,level:this.level,mines:this.numMines,moves:this.numberMoves,seconds:this.seconds})}},{key:"checkWin",value:function(){if(this.numRevealed+this.numMines===this.numCells){localStorage.removeItem("gameData"),this.playSound(this.winSound),null!==this.timer&&(clearInterval(this.timer),this.timer=null);var e=document.createElement("div"),t=document.querySelector(".game-board");e.innerText="Hooray! You found all mines in ".concat(this.seconds," seconds and ").concat(this.numberMoves," moves!"),e.classList.add("game-message"),t.append(e),localStorage.removeItem("gameData"),u({game:!0,level:this.level,mines:this.numMines,moves:this.numberMoves,seconds:this.seconds})}}},{key:"getClickedCell",value:function(e){var t=e.offsetX,i=e.offsetY;return{row:Math.floor(i/this.cellSize),col:Math.floor(t/this.cellSize)}}},{key:"playSound",value:function(e){this.volume&&(e.currentTime=0,e.play(),this.currentSound=e)}},{key:"stopSound",value:function(){this.currentSound&&(this.currentSound.pause(),this.currentSound.currentTime=0,this.currentSound=null)}},{key:"click",value:function(e){var t=this.getClickedCell(e),i=t.row,s=t.col,l=this.board[i][s];this.isGameover||(this.firstClick&&(this.placeMines(i,s),this.startTimer()),this.firstClick=!1,this.rangeMines(),l.isRevealed||l.isFlagged||(this.numberMoves+=1,this.updateMovesCount(),l.isMine?(this.playSound(h(c.boom)),this.gameOver(i,s)):(this.playSound(this.clickSound),this.revealCell(i,s),0===l.value&&this.revealSurroundingCells(i,s),this.saveGame(),this.checkWin())))}},{key:"clickFlag",value:function(e){if(!this.isGameover){e.preventDefault();var t=this.getClickedCell(e),i=t.row,s=t.col,l=this.board[i][s];l.isRevealed||(this.playSound(this.flagSound),l.isFlagged?(l.isFlagged=!1,this.removeFlag(i,s),this.countFlag-=1):(l.isFlagged=!0,this.addFlag(i,s),this.countFlag+=1)),this.saveGame(),this.checkWin(),this.updateFlagCount()}}},{key:"init",value:function(){localStorage.getItem("gameData")?this.loadGame():this.generateBoard(),this.rangeMines(),this.toggleVolume(this.volume),this.toggleDarkMode(this.darkmode),this.clickSound=h(c.click),this.flagSound=h(c.flag),this.winSound=h(c.win),this.canvas.addEventListener("click",this.click.bind(this)),this.canvas.addEventListener("contextmenu",this.clickFlag.bind(this))}}],i&&v(t.prototype,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();g=document.querySelector("body"),f=' \n                    <div class="game">\n                      <h1 class="title">Minesweeper!!!</h1>\n                      <div class="game-container">\n                        <div class="game-control">\n                          <div class="new-game">\n                            <button class="btn-new-game">New Game</button> \n                            <select class="game-level">\n                              <option value="simple">simple</option>\n                              <option value="medium">medium</option>\n                              <option value="hard">hard</option>\n                            </select>\n                            <div class="volume">\n                              <img class="volume__img icons" src="'.concat(a,'" alt="">\n                            </div>\n                            <div class="result">\n                              <img class="result__img icons" src="').concat(n,'" alt="">\n                            </div>\n                            <div class="checkbox-wrapper">\n                              <input class="tgl" id="darkmode" type="checkbox" />\n                              <label class="tgl-btn" for="darkmode">\n                              <svg class="icon icon_sun" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                                <circle cx="11.9998" cy="11.9998" r="5.75375" fill="currentColor" />\n                                  <g>\n                                    <circle cx="3.08982" cy="6.85502" r="1.71143" transform="rotate(-60 3.08982 6.85502)" fill="currentColor" />\n                                    <circle cx="3.0903" cy="17.1436" r="1.71143" transform="rotate(-120 3.0903 17.1436)" fill="currentColor" />\n                                    <circle cx="12" cy="22.2881" r="1.71143" fill="currentColor" />\n                                    <circle cx="20.9101" cy="17.1436" r="1.71143" transform="rotate(-60 20.9101 17.1436)" fill="currentColor" />\n                                    <circle cx="20.9101" cy="6.8555" r="1.71143" transform="rotate(-120 20.9101 6.8555)" fill="currentColor" />\n                                    <circle cx="12" cy="1.71143" r="1.71143" fill="currentColor" />\n                                  </g>\n                                </circle>\n                              </svg>\n                              <svg class="icon icon_moon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 50 50">\n                                <path d="M 43.81 29.354 C 43.688 28.958 43.413 28.626 43.046 28.432 C 42.679 28.238 42.251 28.198 41.854 28.321 C 36.161 29.886 30.067 28.272 25.894 24.096 C 21.722 19.92 20.113 13.824 21.683 8.133 C 21.848 7.582 21.697 6.985 21.29 6.578 C 20.884 6.172 20.287 6.022 19.736 6.187 C 10.659 8.728 4.691 17.389 5.55 26.776 C 6.408 36.163 13.847 43.598 23.235 44.451 C 32.622 45.304 41.28 39.332 43.816 30.253 C 43.902 29.96 43.9 29.647 43.81 29.354 Z" fill="currentColor" />\n                              </svg>\n                              </label>\n                            </div>\n                          </div>\n                          <div class="info">\n                            <div class="mine">\n                              <input type="range" id="minesRange" class="mines-range slider-progress" min="10" max="99" value="10">\n                              <img class="mine__img icons" src="').concat(t,'" alt="">\n                              <p class="mine__count">00</p>\n                            </div>\n                            <div class="flag">\n                              <img class="flag__img icons" src="').concat(s,'" alt="">\n                              <p class="flag__count">0</p>\n                            </div>\n                            <div class="moves">\n                              <img class="moves__img icons" src="').concat(l,'" alt="">\n                              <p class="moves__count">0</p>\n                            </div>\n                            <div class="time">\n                              <img class="time__img icons" src="').concat(i,'" alt="">\n                              <p class="time__stopwatch">00</p>\n                            </div>\n                          </div> \n                        </div>\n                        <div class="game-board">\n                          <canvas id="game-board"   width="480" height="480"></canvas>\n                        </div>\n                      </div>\n                      <a href="https://github.com/kostik-omsk/minesweeper" class="github-link" target="_blank">\n                      <svg id="github" width="60" height="60" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n                      <g opacity="0.8">\n                      <path d="M15 5C9.47833 5 5 9.59069 5 15.2528C5 19.7828 7.865 23.6259 11.8391 24.9818C12.3383 25.0767 12.5 24.7588 12.5 24.4889V22.5801C9.71833 23.2004 9.13916 21.3703 9.13916 21.3703C8.68416 20.1853 8.02834 19.87 8.02834 19.87C7.12084 19.2334 8.0975 19.2471 8.0975 19.2471C9.10167 19.3189 9.63 20.304 9.63 20.304C10.5217 21.871 11.9691 21.4182 12.54 21.1558C12.6291 20.4937 12.8884 20.0409 13.175 19.7854C10.9542 19.5248 8.61916 18.6456 8.61916 14.718C8.61916 13.5978 9.01 12.6836 9.64917 11.9659C9.54584 11.707 9.20333 10.6638 9.74667 9.25235C9.74667 9.25235 10.5866 8.97723 12.4975 10.3033C13.295 10.076 14.15 9.96236 15 9.95808C15.85 9.96236 16.7059 10.076 17.505 10.3033C19.4142 8.97723 20.2525 9.25235 20.2525 9.25235C20.7966 10.6647 20.4542 11.7079 20.3509 11.9659C20.9925 12.6836 21.38 13.5987 21.38 14.718C21.38 18.6559 19.0408 19.5231 16.8141 19.7768C17.1725 20.0947 17.5 20.7184 17.5 21.6753V24.4889C17.5 24.7614 17.66 25.0818 18.1675 24.981C22.1383 23.6233 25 19.7811 25 15.2528C25 9.59069 20.5225 5 15 5Z" fill="white"/>\n                      </g>\n                      </svg><sapn>GitHub</sapn>                       \n                      </a>\n\n                    </div>'),g.insertAdjacentHTML("afterbegin",f);var S=new p(document.querySelector("#game-board")),y=document.querySelector(".game-board"),b=document.querySelector(".btn-new-game"),k=document.querySelector(".game-level"),C=document.querySelector(".volume"),w=document.querySelector("#darkmode"),M=document.querySelector(".result");function x(){var e=document.querySelector(".game-message"),t=document.querySelector(".game-result");e&&e.remove(),t&&t.remove()}k.addEventListener("change",(function(){var e=k.value;S.newLevel(e),x()})),b.addEventListener("click",(function(){x(),S.newLevel(k.value)})),C.addEventListener("click",(function(){S.volume=!S.volume,localStorage.setItem("volume",S.volume),S.toggleVolume(S.volume)})),M.addEventListener("click",(function(){var e=document.querySelector(".game-result"),t=function(){var e=document.createElement("div");e.className="game-result";var t=document.createElement("ul");t.className="result-list";var i=document.createElement("h3");i.className="title-result",i.textContent="Results",e.append(i);var s=JSON.parse(localStorage.getItem("results"))||[];if(s.length>0){for(var l=0;l<s.length;l+=1){var a=s[l],n=a.game,o=a.level,r=a.mines,c=a.moves,u=a.seconds;if(n){var m=document.createElement("li");m.className="result-item";var h='<span class="victory">Win</span>: level-'.concat(o,", mines-").concat(r,", move-").concat(c,", seconds-").concat(u);m.insertAdjacentHTML("afterbegin",h),t.appendChild(m)}else{var d=document.createElement("li");d.className="result-item";var v='<span class="lost">Lost</span>: level-'.concat(o,", mines-").concat(r,", move-").concat(c,", seconds-").concat(u);d.insertAdjacentHTML("afterbegin",v),t.appendChild(d)}}e.appendChild(t)}else{var g=document.createElement("div");g.textContent="No results, you have to play the game",e.appendChild(g)}return e}();e?e.remove():(x(),y.append(t))})),w.addEventListener("change",(function(){S.darkmode=w.checked,localStorage.setItem("darkmode",w.checked),S.toggleDarkMode(w.checked)}))})();