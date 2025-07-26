document.addEventListener("DOMContentLoaded", () => {
  const distressBtn = document.getElementById("distressBtn");

  distressBtn.addEventListener("click", () => {
    const agent = localStorage.getItem("agentName") || "Unknown";
    const timestamp = new Date().toISOString();

    const distressData = {
      agent,
      timestamp,
      message: "DISTRESS SIGNAL ACTIVATED"
    };

    if (navigator.onLine) {
      sendOnline(distressData);
    } else {
      saveOffline(distressData);
      alert("No connection. Signal saved and will be sent when online.");
    }
  });

  // Auto-send if offline signals are stored
  if (navigator.onLine && localStorage.getItem("offlineDistress")) {
    const pending = JSON.parse(localStorage.getItem("offlineDistress"));
    pending.forEach(data => sendOnline(data));
    localStorage.removeItem("offlineDistress");
  }
});

function sendOnline(data) {
  console.log("Sending distress signal online:", data);
  // Placeholder: Replace with integration to Discord Webhook, Firebase, or Google Form
  alert(Distress signal from Agent ${data.agent} sent at ${data.timestamp});
}

function saveOffline(data) {
  const stored = JSON.parse(localStorage.getItem("offlineDistress")) || [];
  stored.push(data);
  localStorage.setItem("offlineDistress", JSON.stringify(stored));
}
