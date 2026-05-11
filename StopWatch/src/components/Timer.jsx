import React, { useState , useRef, useCallback, useEffect } from 'react'

const fmt = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const ss = String(totalSeconds % 60).padStart(2, '0');
  const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return { mm, ss, cs };
};

const Timer = () => {

  const [hours , setHours] = useState(0)
  const[minutes , setMinutes] = useState(5)
  const [seconds , setSeconds] = useState(0)
  const [remaining , setRemaning] = useState(null)
  const [running , setRunning] = useState(false)
  const [done , setDone] =useState(false)
  const endRef = useRef(null)
  const rafRef = useRef(null)

  const totalMs = (hours * 3600 + minutes *60 + seconds) * 1000;

  const tick = useCallback(()=>{
    const left = endRef.current - Date.now();
    if(left <= 0){
      setRemaning(0);
      setRunning(false);
      setDone(true);
      return ;
    }
    setRemaning(left);
    rafRef.current = requestAnimationFrame(tick)
  } , []);

  const handleStart = ( )=>{
    if(totalMs === 0 && remaining === null) return;

    const ms = remaining !== null ? remaining : totalMs;
    if(ms <= 0) return;
    endRef.current = Date.now() + ms;

    setRunning(true);
    setDone(false);
    rafRef.current = requestAnimationFrame(tick)
  }

  const handlePause = () => {
    setRunning(false);
    cancelAnimationFrame(rafRef.current);
    setRemaning(endRef.current - Date.now())
  }

  const handleReset = () => {
    cancelAnimationFrame(rafRef.current);
    setRunning(false)
    setRemaning(null)
    setDone(false)
  }

  useEffect(()=>()=>cancelAnimationFrame(rafRef.current),[])

  const displayMs = remaining !== null ? remaining : totalMs;

  const {mm,ss,cs} = fmt(displayMs);
  const progress = totalMs > 0 ? Math.max(0 , displayMs / totalMs) : 0
  const circumference  = 533;
  const clamp = (v ,min , max) => Math.msx(min,Math.min(max,v));



  return (
    <div className="panel">
      {!running && remaining === null && (
        <div className="time-inputs">
          <div className="input-group">
            <label>Hours</label>
            <input
              type="number" min="0" max="23" value={hours}
              onChange={(e) => setHours(clamp(parseInt(e.target.value) || 0, 0, 23))}
            />
          </div>
          <span className="input-sep">:</span>
          <div className="input-group">
            <label>Min</label>
            <input
              type="number" min="0" max="59" value={minutes}
              onChange={(e) => setMinutes(clamp(parseInt(e.target.value) || 0, 0, 59))}
            />
          </div>
          <span className="input-sep">:</span>
          <div className="input-group">
            <label>Sec</label>
            <input
              type="number" min="0" max="59" value={seconds}
              onChange={(e) => setSeconds(clamp(parseInt(e.target.value) || 0, 0, 59))}
            />
          </div>
        </div>
      )}
 
      {(running || remaining !== null) && (
        <div className="clock-face">
          <div className={`time-display ${done ? "done-flash" : ""}`}>
            <span className="digits">{mm}</span>
            <span className="colon">:</span>
            <span className="digits">{ss}</span>
            <span className="centis">.{cs}</span>
          </div>
          <div className="ring-wrap">
            <svg viewBox="0 0 200 200" className="progress-ring">
              <circle cx="100" cy="100" r="88" className="ring-bg" />
              <circle
                cx="100" cy="100" r="88"
                className={`ring-fg ${done ? "ring-done" : "ring-timer"}`}
                strokeDasharray={`${progress * circumference} ${circumference}`}
                strokeDashoffset="0"
                style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
              />
            </svg>
          </div>
          {done && <p className="done-label">⏰ Time's up!</p>}
        </div>
      )}
 
      <div className="controls">
        {!running ? (
          <button
            className="btn btn-primary"
            onClick={handleStart}
            disabled={totalMs === 0 && remaining === null}
          >
            <span className="btn-icon">▶</span> {remaining !== null && !done ? "Resume" : "Start"}
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={handlePause}>
            <span className="btn-icon">⏸</span> Pause
          </button>
        )}
        <button
          className="btn btn-ghost btn-danger"
          onClick={handleReset}
          disabled={remaining === null && !done}
        >
          Reset
        </button>
      </div>
 
      {!running && remaining === null && (
        <div className="presets">
          <p className="presets-label">Quick set</p>
          <div className="preset-row">
            {[[0,1,0,"1 min"],[0,5,0,"5 min"],[0,10,0,"10 min"],[0,25,0,"25 min"],[0,30,0,"30 min"],[1,0,0,"1 hr"]].map(([h,m,s,label]) => (
              <button key={label} className="preset-btn" onClick={() => { setHours(h); setMinutes(m); setSeconds(s); }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

}

export default Timer
