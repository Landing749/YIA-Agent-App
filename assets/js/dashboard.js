document.addEventListener("DOMContentLoaded", () => {
  const agentName = localStorage.getItem("agentName");
  if (agentName) {
    document.getElementById("welcome").textContent = Welcome Agent ${agentName};
  } else {
    location.href = "index.html";
  }

  loadMissions();
  loadChallenges();
});

// Load Missions from Google Sheet
function loadMissions() {
  const missionSheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMCNr-EKIwfRW8f5Bcemo17_tdpo3KyAdKh-7USW1JXLokYR8b6r9nXflNVj1BpJOXbcX9MCK_rKqv/pub?output=csv';
  fetch(missionSheetURL)
    .then(response => response.text())
    .then(csv => {
      const rows = csv.split('\n').slice(1);
      const container = document.getElementById("missions");

      rows.forEach(row => {
        const [title, description] = row.split(',');
        const div = document.createElement("div");
        div.className = "tile";
        div.innerHTML = <h3>${title}</h3><p>${description}</p>;
        container.appendChild(div);
      });
    });
}

// Load Challenges from Google Sheet
function loadChallenges() {
  const challengeSheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRk3oLKf4ePlm68sw8rNVqTcAmmVBui8nPy9vqfKbO60l4721DcVAdADQWuOxWjfWdokKS-UzP6A8Iy/pub?output=csv';
  fetch(challengeSheetURL)
    .then(response => response.text())
    .then(csv => {
      const rows = csv.split('\n').slice(1);
      const container = document.getElementById("challenges");

      rows.forEach(row => {
        const [description] = row.split(',');
        const div = document.createElement("div");
        div.className = "tile";
        div.innerHTML = <h3>Daily Challenge</h3><p>${description}</p>;
        container.appendChild(div);
      });
    });
}
