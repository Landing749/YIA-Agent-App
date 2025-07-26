(async () => {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRk3oLKf4ePlm68sw8rNVqTcAmmVBui8nPy9vqfKbO60l4721DcVAdADQWuOxWjfWdokKS-UzP6A8Iy/pub?output=csv';
  try {
    const rows = await (await fetch(url)).text();
    const parsed = parseCSV(rows);
    const latest = parsed.reverse().find(r => r.Challenge || r.Description);
    document.getElementById('challenge-desc').textContent = latest
      ? ${latest.Challenge || latest.Description}
      : 'No challenge today';
  } catch (err) {
    console.error('Error loading challenge:', err);
    document.getElementById('challenge-desc').textContent = 'Error loading challenge.';
  }
})();

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
