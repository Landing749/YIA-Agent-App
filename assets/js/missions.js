async function fetchCSV(url) {
  const res = await fetch(url);
  const text = await res.text();
  return parseCSV(text);
}

function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const cols = line.split(',');
    return headers.reduce((obj, h, i) => {
      obj[h.trim()] = cols[i]?.trim() || '';
      return obj;
    }, {});
  });
}

(async () => {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMCNr-EKIwfRW8f5Bcemo17_tdpo3KyAdKh-7USW1JXLokYR8b6r9nXflNVj1BpJOXbcX9MCK_rKqv/pub?output=csv';
  try {
    const data = await fetchCSV(url);
    const container = document.getElementById('mission-list');
    container.innerHTML = '';
    data.forEach(item => {
      const el = document.createElement('div');
      el.textContent = item.Mission || item.Title || JSON.stringify(item);
      container.appendChild(el);
    });
  } catch(err) {
    console.error('Error loading missions:', err);
    document.getElementById('mission-list').textContent = 'Error loading missions.';
  }
})();
