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
function fetchSignal() {
    updateStatus("Fetching latest signal...");
    // Simulate network delay
    setTimeout(() => {
        displaySignal(exampleSignal);
        updateStatus("Last updated: " + new Date().toLocaleTimeString());
    }, 1500);
}

// Auto refresh every 10 seconds
setInterval(fetchSignal, 10000);

// Run init on page load
window.onload = () => {
    initDashboard();
    fetchSignal();
};
