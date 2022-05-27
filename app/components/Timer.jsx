import { useCallback, useEffect, useRef, useState } from "react";

const Timer = ({ size = 250, stroke = 5, time = 5 }) => {
  const [timeRemaining, setTimeRemaining] = useState(time);
  const [playState, setPlayState] = useState("paused"); // 'running'

  const timerDOMRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--timerDiameter", `${size}px`);
    document.documentElement.style.setProperty("--timerStroke", `${stroke}px`);
    document.documentElement.style.setProperty("--timerSize", `${size + stroke * 2}px`);
    document.documentElement.style.setProperty(
      "--timerInternalPerimeter",
      `${Math.round((size - stroke) * Math.PI * 10000) / 10000}px`
    );
    timerDOMRef.current.style.animationDuration = `${time}s`;
  }, [size, stroke, time]);

  useEffect(() => {
    timerDOMRef.current.style.animationPlayState = playState;
  }, [playState]);

  // Set up the interval.
  useEffect(() => {
    if (playState === "running" && timeRemaining > 0) {
      const timeout = setTimeout(() => setTimeRemaining((t) => t - 1), 1000);
      return timeout;
    } else {
      setPlayState("paused");
    }
  }, [playState, timeRemaining]);

  const togglePlayState = () => {
    if (playState === "paused") {
      setPlayState("running");
    } else {
      setPlayState("paused");
    }
  };

  return (
    <div>
      <div
        className="timer-container relative flex items-center justify-center"
        onClick={togglePlayState}
      >
        <svg className="timer text-app" viewBox={`0 0 ${size} ${size}`}>
          <circle
            stroke="currentColor"
            fill="none"
            className="timer-circle"
            strokeWidth={stroke}
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - stroke / 2}
            ref={timerDOMRef}
          />
        </svg>
        <span className="absolute">{display(timeRemaining, time)}</span>
      </div>
      <div className="-mt-6 flex w-full justify-between">
        <button className="h-16 w-16 rounded-full border border-app bg-white text-xs text-app">
          Annuler
        </button>
        <button
          className="h-16 w-16 rounded-full border border-app bg-app text-xs text-white"
          onClick={togglePlayState}
        >
          {playState === "running"
            ? "Pause"
            : timeRemaining === time
            ? "Démarrer"
            : timeRemaining === 0
            ? "Recommencer"
            : "Reprendre"}
        </button>
      </div>
    </div>
  );
};
// https://stackoverflow.com/a/52560608/5225096
const display = (seconds, initialSeconds) => {
  const format = (val) => `0${Math.floor(val)}`.slice(-2);
  const hours = seconds / 3600;
  const minutes = (seconds % 3600) / 60;

  const initialHours = initialSeconds / 3600;
  if (initialHours > 1) return [hours, minutes, seconds % 60].map(format).join(":");
  return [minutes, seconds % 60].map(format).join(":");
};

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Timer;
