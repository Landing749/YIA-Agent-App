const AGENT_LIST_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSMCNr-EKIwfRW8f5Bcemo17_tdpo3KyAdKh-7USW1JXLokYR8b6r9nXflNVj1BpJOXbcX9MCK_rKqv/pub?output=csv";
const MISSION_LIST_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRk3oLKf4ePlm68sw8rNVqTcAmmVBui8nPy9vqfKbO60l4721DcVAdADQWuOxWjfWdokKS-UzP6A8Iy/pub?output=csv";

// Utility: Parse CSV into an array of objects
function parseCSV(data) {
  const lines = data.trim().split("\n");
  const headers = lines.shift().split(",");
  return lines.map(line => {
    const values = line.split(",");
    return headers.reduce((obj, key, i) => {
      obj[key.trim()] = values[i]?.trim() || "";
      return obj;
    }, {});
  });
}

// Fetch Agent List
async function fetchAgentList() {
  const response = await fetch(AGENT_LIST_URL);
  const csv = await response.text();
  const agents = parseCSV(csv);
  localStorage.setItem("agentList", JSON.stringify(agents));
  return agents;
}

// Fetch Missions
async function fetchMissionList() {
  const response = await fetch(MISSION_LIST_URL);
  const csv = await response.text();
  const missions = parseCSV(csv);
  localStorage.setItem("missionList", JSON.stringify(missions));
  return missions;
}

// Usage: fetch data on load
document.addEventListener("DOMContentLoaded", () => {
  fetchAgentList().then(data => {
    console.log("Agents Loaded:", data.length);
  }).catch(err => {
    console.error("Failed to load agent list:", err);
  });

  fetchMissionList().then(data => {
    console.log("Missions Loaded:", data.length);
  }).catch(err => {
    console.error("Failed to load missions:", err);
  });
});

