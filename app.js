// app.js - Trade Raider Dashboard Script

// Example mock signal (replace with real API call later)
const exampleSignal = {
    symbol: "EUR/USD",
    side: "Buy",
    entry: 1.12345,
    stop_loss: 1.12000,
    take_profit: 1.13000,
};

// Function to display the signal in the <pre> block
function displaySignal(signal) {
    const signalEl = document.getElementById("signal");
    if (!signal) {
        signalEl.textContent = "No signals received yet.";
        return;
    }
    const formatted = `
📊 TRADE RAIDER SIGNAL

🪙 Symbol: ${signal.symbol}
📈 Side: ${signal.side}
💵 Entry: ${signal.entry}
🛑 Stop Loss: ${signal.stop_loss}
🎯 Take Profit: ${signal.take_profit}
    `;
    signalEl.textContent = formatted;
}

// Function to update status
function updateStatus(text) {
    const statusEl = document.getElementById("status");
    statusEl.textContent = text;
}

// Initial setup
function initDashboard() {
    updateStatus("Waiting for signals...");
    displaySignal(null);
}

// Simulate signal fetching (replace with fetch API call later)
async function fetchSignal() {
    updateStatus("Fetching latest signal...");
    try {
        const response = await fetch("http://localhost:8000/latest-signal");
        if (!response.ok) throw new Error("No signal available");
        const json = await response.json();

        if (json.error) {
            displaySignal(null);
            updateStatus(json.error);
            return;
        }

        // The signal data is inside json.data (as saved in latest_signal.json)
        const signal = json.data;

        displaySignal({
            symbol: signal.symbol,
            side: signal.side,
            entry: parseFloat(signal.entry),
            stop_loss: parseFloat(signal.stop_loss),
            take_profit: parseFloat(signal.take_profit) || "N/A", // if available
        });
        updateStatus("Last updated: " + new Date().toLocaleTimeString());

    } catch (err) {
        displaySignal(null);
        updateStatus("Error fetching signal");
        console.error(err);
    }
}

// Auto refresh every 10 seconds
setInterval(fetchSignal, 10000);

// Run init on page load
window.onload = () => {
    initDashboard();
    fetchSignal();
};
