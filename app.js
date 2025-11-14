// app.js - Trade Raider Dashboard Script

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

function updateStatus(text) {
    document.getElementById("status").textContent = text;
}

function initDashboard() {
    updateStatus("Waiting for signals...");
    displaySignal(null);
}

async function fetchSignal() {
    updateStatus("Fetching latest signal...");

    try {
        const response = await fetch(
            "https://traderaider-app.onrender.com/latest_signal"
        );

        if (!response.ok) {
            updateStatus("No signal found");
            displaySignal(null);
            return;
        }

        const json = await response.json();

        if (json.error) {
            updateStatus(json.error);
            displaySignal(null);
            return;
        }

        const s = json.data;

        displaySignal({
            symbol: s.symbol,
            side: s.side,
            entry: s.entry,
            stop_loss: s.stop_loss,
            take_profit: s.take_profit,
        });

        updateStatus("Last updated: " + new Date().toLocaleTimeString());

    } catch (err) {
        updateStatus("Error fetching signal");
        console.error(err);
    }
}

setInterval(fetchSignal, 10000);

window.onload = () => {
    initDashboard();
    fetchSignal();
};
