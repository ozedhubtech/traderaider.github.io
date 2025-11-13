// Initialize the chart
const chart = LightweightCharts.createChart(document.getElementById("chart"), {
  width: 800,
  height: 400,
  layout: { backgroundColor: "#0e0e0e", textColor: "#fff" },
  grid: { vertLines: { color: "#222" }, horzLines: { color: "#222" } },
});

const candleSeries = chart.addCandlestickSeries();

// Example candlestick data
candleSeries.setData([
  { time: "2025-11-10", open: 1.085, high: 1.089, low: 1.083, close: 1.087 },
  { time: "2025-11-11", open: 1.087, high: 1.090, low: 1.084, close: 1.086 },
  { time: "2025-11-12", open: 1.086, high: 1.092, low: 1.083, close: 1.090 },
]);

// Example FX signals (this will later come from backend)
const signals = [
  { pair: "EURUSD", signal: "BUY", entry: 1.0850, stopLoss: 1.0830, takeProfit: 1.0910 },
  { pair: "GBPUSD", signal: "SELL", entry: 1.2720, stopLoss: 1.2750, takeProfit: 1.2660 },
];

const signalList = document.getElementById("signal-list");

signals.forEach((sig) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${sig.pair}</strong> — 
    <span class="signal-${sig.signal.toLowerCase()}">${sig.signal}</span>
    <br>Entry: ${sig.entry} | SL: ${sig.stopLoss} | TP: ${sig.takeProfit}
  `;
  signalList.appendChild(li);
});
