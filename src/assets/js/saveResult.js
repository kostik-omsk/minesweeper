export default function saveResult(score) {
  const results = JSON.parse(localStorage.getItem('results')) || [];
  results.unshift(score);
  if (results.length > 10) {
    results.pop();
  }
  localStorage.setItem('results', JSON.stringify(results));
}
