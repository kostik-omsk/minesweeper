export default function showResult() {
  const gameResult = document.createElement('div');
  gameResult.className = 'game-result';
  const gameResultList = document.createElement('ul');
  gameResultList.className = 'result-list';
  const title = document.createElement('h3');
  title.className = 'title-result';
  title.textContent = 'Results';
  gameResult.append(title);
  const result = JSON.parse(localStorage.getItem('results')) || [];
  if (result.length > 0) {
    for (let i = 0; i < result.length; i += 1) {
      const { game, level, mines, moves, seconds } = result[i];
      if (game) {
        const gameResultItem = document.createElement('li');
        gameResultItem.className = 'result-item';
        const resultText = `<span class="victory">Win</span>: level-${level}, mines-${mines}, move-${moves}, seconds-${seconds}`;
        gameResultItem.insertAdjacentHTML('afterbegin', resultText);
        gameResultList.appendChild(gameResultItem);
      } else {
        const gameResultItem = document.createElement('li');
        gameResultItem.className = 'result-item';
        const resultText = `<span class="lost">Lost</span>: level-${level}, mines-${mines}, move-${moves}, seconds-${seconds}`;
        gameResultItem.insertAdjacentHTML('afterbegin', resultText);
        gameResultList.appendChild(gameResultItem);
      }
    }
    gameResult.appendChild(gameResultList);
  } else {
    const noResultsText = 'No results, you have to play the game';
    const noResultsItem = document.createElement('div');
    noResultsItem.textContent = noResultsText;
    gameResult.appendChild(noResultsItem);
  }

  return gameResult;
}
