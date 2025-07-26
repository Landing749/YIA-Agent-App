const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4mcEww__LUry5Tj0exevJiiIlRFZQi6TwwKwCNtiB5WToIq8UHGZ84g6gdP74Py4gs5JnkrdWkPXX/pub?output=csv";

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const agentNumber = document.getElementById("agentNumber").value.trim();
    const passcode = document.getElementById("passcode").value.trim();

    try {
        const res = await fetch(sheetURL);
        const text = await res.text();
        const rows = text.split("\n").slice(1); // skip header

        let valid = false;

        rows.forEach(row => {
            const cols = row.split(",");
            const sheetAgent = cols[0]?.trim();
            const sheetPasscode = cols[6]?.trim(); // Assuming Passcode is in column G (index 6)

            if (sheetAgent === agentNumber && sheetPasscode === passcode) {
                valid = true;
            }
        });

        if (valid) {
            localStorage.setItem("agentNumber", agentNumber);
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid credentials. Try again.");
        }

    } catch (err) {
        alert("Login failed. Check internet or sheet link.");
        console.error(err);
    }
});
