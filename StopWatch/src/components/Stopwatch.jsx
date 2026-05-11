import React, { useRef, useState, useCallback, useEffect } from "react";


const fmt = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((ms % 1000) / 10);
  return {
    mm: String(minutes).padStart(2, "0"),
    ss: String(seconds).padStart(2, "0"),
    cs: String(centiseconds).padStart(2, "0"),
  };
};
 
const fmtLap = (ms) => {
  const { mm, ss, cs } = fmt(ms);
  return `${mm}:${ss}.${cs}`;
};
const Stopwatch = () => {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const startRef = useRef(null);
  const savedRef = useRef(0);
  const rafRef = useRef(null);

  const tick = useCallback(() => {
    setElapsed(savedRef.current + (Date.now() - startRef.current));
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (running) {
      startRef.current = Date.now();
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
      savedRef.current = elapsed;
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  const handleStart = () => setRunning(true);
  const handlePause = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    setElapsed(0);
    savedRef.current = 0;
    setLaps([]);
  };
  const handleLap = () => {
    if (!running) return;
    setLaps((prev) => [{ id: prev.length + 1, time: elapsed }, ...prev]);
  };

  const { mm, ss, cs } = fmt(elapsed);
  const fastLap = laps.length > 1 ? Math.min(...laps.map((l) => l.time)) : null;
  const slowLap = laps.length > 1 ? Math.max(...laps.map((l) => l.time)) : null;

  return (
    <div className="panel">
      <div className="clock-face">
        <div className="time-display">
          <span className="digits">{mm}</span>
          <span className="colon">:</span>
          <span className="digits">{ss}</span>
          <span className="centis">.{cs}</span>
        </div>
        <div className="ring-wrap">
          <svg viewBox="0 0 200 200" className="progress-ring">
            <circle cx="100" cy="100" r="88" className="ring-bg" />
            <circle
              cx="100"
              cy="100"
              r="88"
              className="ring-fg"
              strokeDasharray={`${((elapsed % 60000) / 60000) * 553} 553`}
              strokeDashoffset="0"
              style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
            />
          </svg>
        </div>
      </div>

      <div className="controls">
        {!running ? (
          <button className="btn btn-primary" onClick={handleStart}>
            <span className="btn-icon">▶</span>{" "}
            {elapsed === 0 ? "Start" : "Resume"}
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={handlePause}>
            <span className="btn-icon">⏸</span> Pause
          </button>
        )}
        <button
          className="btn btn-ghost"
          onClick={handleLap}
          disabled={!running}
        >
          Lap
        </button>
        <button
          className="btn btn-ghost btn-danger"
          onClick={handleReset}
          disabled={elapsed === 0 && !running}
        >
          Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div className="laps">
          <div className="laps-header">
            <span>Lap</span>
            <span>Split</span>
            <span>Total</span>
          </div>
          {laps.map((lap, i) => {
            const prevTotal = laps.slice(i + 1).reduce((a, l) => a + l.time, 0);
            const split = lap.time - prevTotal;
            let mark = "";
            if (lap.time === fastLap) mark = "fast";
            if (lap.time === slowLap) mark = "slow";
            return (
              <div key={lap.id} className={`lap-row ${mark}`}>
                <span className="lap-num">#{lap.id}</span>
                <span>{fmtLap(split > 0 ? split : lap.time)}</span>
                <span>{fmtLap(lap.time)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
