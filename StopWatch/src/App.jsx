import { useState } from "react"; 
import Stopwatch from "./components/Stopwatch.jsx"
import Timer from "./components/Timer.jsx"
export default function App() {
  const [tab, setTab] = useState("stopwatch");
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');
 
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
        :root {
          --bg: #0d0f14;
          --surface: #14181f;
          --surface2: #1c2230;
          --border: rgba(255,255,255,0.07);
          --accent: #4fffb0;
          --accent2: #f7c948;
          --accent-red: #ff5f5f;
          --text: #f0f4ff;
          --muted: #7a859c;
          --radius: 16px;
        }
 
        body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }
 
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1rem 4rem;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, #1a2a3a 0%, #0d0f14 70%);
        }
 
        .app-title {
          font-family: 'Space Mono', monospace;
          font-size: clamp(1.1rem, 3vw, 1.4rem);
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 2.5rem;
        }
 
        .tab-bar {
          display: flex;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 50px;
          padding: 4px;
          margin-bottom: 2rem;
          gap: 4px;
        }
 
        .tab-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: none;
          background: transparent;
          color: var(--muted);
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn.active {
          background: var(--accent);
          color: #0d0f14;
          font-weight: 700;
        }
 
        .panel {
          width: min(420px, 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
 
        /* Clock face */
        .clock-face {
          position: relative;
          width: 260px;
          height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
 
        .ring-wrap {
          position: absolute;
          inset: 0;
        }
 
        .progress-ring {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
 
        .ring-bg {
          fill: none;
          stroke: var(--surface2);
          stroke-width: 6;
        }
 
        .ring-fg {
          fill: none;
          stroke: var(--accent);
          stroke-width: 6;
          stroke-linecap: round;
          transition: stroke-dasharray 0.08s linear;
        }
 
        .ring-timer { stroke: var(--accent2); }
        .ring-done { stroke: var(--accent-red); }
 
        .time-display {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: baseline;
          gap: 1px;
          font-family: 'Space Mono', monospace;
        }
 
        .digits { font-size: 3rem; font-weight: 700; line-height: 1; color: var(--text); }
        .colon { font-size: 2.5rem; font-weight: 700; color: var(--accent); margin: 0 2px; animation: blink 1s step-end infinite; }
        .centis { font-size: 1.4rem; color: var(--muted); margin-left: 4px; }
 
        @keyframes blink { 50% { opacity: 0.3; } }
 
        .done-flash { animation: pulse-done 0.5s ease-in-out infinite alternate; }
        @keyframes pulse-done { from { opacity: 1; } to { opacity: 0.4; } }
        .done-label {
          position: absolute;
          bottom: -1.5rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
          color: var(--accent-red);
          letter-spacing: 0.1em;
        }
 
        /* Controls */
        .controls {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }
 
        .btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          padding: 0.7rem 1.4rem;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s;
        }
        .btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .btn-icon { font-size: 0.9em; }
 
        .btn-primary {
          background: var(--accent);
          color: #0d0f14;
          font-weight: 700;
        }
        .btn-primary:hover:not(:disabled) { background: #6effc4; transform: scale(1.03); }
 
        .btn-secondary {
          background: var(--accent2);
          color: #0d0f14;
          font-weight: 700;
        }
        .btn-secondary:hover:not(:disabled) { background: #ffd966; }
 
        .btn-ghost {
          background: var(--surface2);
          color: var(--text);
          border: 1px solid var(--border);
        }
        .btn-ghost:hover:not(:disabled) { background: var(--surface); border-color: rgba(255,255,255,0.15); }
 
        .btn-danger { color: var(--accent-red); }
 
        /* Laps */
        .laps {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
        }
 
        .laps-header {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          padding: 0.6rem 1rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
          border-bottom: 1px solid var(--border);
        }
 
        .lap-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          padding: 0.7rem 1rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.8rem;
          border-bottom: 1px solid var(--border);
          transition: background 0.2s;
        }
        .lap-row:last-child { border-bottom: none; }
        .lap-row.fast { color: var(--accent); }
        .lap-row.slow { color: var(--accent-red); }
 
        .lap-num { color: var(--muted); }
 
        /* Timer Inputs */
        .time-inputs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1.5rem 1.5rem;
        }
 
        .input-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
        }
 
        .input-group label {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }
 
        .input-group input {
          width: 72px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text);
          font-family: 'Space Mono', monospace;
          font-size: 1.6rem;
          font-weight: 700;
          text-align: center;
          padding: 0.4rem 0;
          outline: none;
          transition: border-color 0.2s;
          -moz-appearance: textfield;
        }
        .input-group input::-webkit-inner-spin-button,
        .input-group input::-webkit-outer-spin-button { -webkit-appearance: none; }
        .input-group input:focus { border-color: var(--accent2); }
 
        .input-sep {
          font-family: 'Space Mono', monospace;
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--accent2);
          margin-top: 1rem;
        }
 
        /* Presets */
        .presets { width: 100%; }
        .presets-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
          margin-bottom: 0.6rem;
          text-align: center;
        }
        .preset-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }
        .preset-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          background: var(--surface2);
          border: 1px solid var(--border);
          color: var(--muted);
          padding: 0.4rem 0.8rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.15s;
          letter-spacing: 0.05em;
        }
        .preset-btn:hover { border-color: var(--accent2); color: var(--accent2); }
      `}</style>
 
      <div className="app">
        <p className="app-title">Stopwatch and Timer App</p>
 
        <div className="tab-bar">
          <button
            className={`tab-btn ${tab === "stopwatch" ? "active" : ""}`}
            onClick={() => setTab("stopwatch")}
          >
            Stopwatch
          </button>
          <button
            className={`tab-btn ${tab === "timer" ? "active" : ""}`}
            onClick={() => setTab("timer")}
          >
            Timer
          </button>
        </div>
 
        {tab === "stopwatch" ? <Stopwatch /> : <Timer />}
      </div>
    </>
  );
}