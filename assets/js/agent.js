(async () => {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS4mcEww__LUry5Tj0exevJiiIlRFZQi6TwwKwCNtiB5WToIq8UHGZ84g6gdP74Py4gs5JnkrdWkPXX/pubhtml';
  // We will convert to JSON via Tabletop.js
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tabletop.js/1.5.1/tabletop.min.js';
  document.head.appendChild(script);

  script.onload = () => {
    Tabletop.init({
      key: url,
      simpleSheet: true,
      callback: showAgents
    });
  };

  function showAgents(data) {
    const ul = document.getElementById('agent-list');
    ul.innerHTML = '';
    data.forEach(a => {
      const li = document.createElement('li');
      li.innerHTML = <b>${a.Codename || a['Codename']}</b> (${a['Agent Number']}) — ${a.Division}, ${a.Status};
      ul.appendChild(li);
    });
  }
})();
