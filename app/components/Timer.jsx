import { useEffect, useRef, useState } from "react";

const TimerWrapper = (props) => {
  const [resetKey, setResetKey] = useState(0);
  return <Timer key={resetKey} {...props} onReset={() => setResetKey((k) => k + 1)} />;
};

const Timer = ({ size = 250, stroke = 5, time = 30, onReset }) => {
  const [timeRemaining, setTimeRemaining] = useState(time);
  const [playState, setPlayState] = useState("paused"); // 'running'

  const togglePlayStateButton =
    playState === "running"
      ? "Pause"
      : timeRemaining === time
      ? "Démarrer"
      : timeRemaining === 0
      ? "Encore !"
      : "Reprendre";

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
  const timeout = useRef(null);
  const secondStartedAt = useRef(Date.now());
  const nextTick = useRef(null);

  useEffect(() => {
    if (playState === "running" && timeRemaining > 0) {
      secondStartedAt.current = Date.now();
      timeout.current = setTimeout(() => {
        if (playState === "running") {
          nextTick.current = 1000;
          setTimeRemaining((t) => t - 1);
        } else {
          clearTimeout(timeout.current);
        }
      }, nextTick.current);
      return () => clearTimeout(timeout.current);
    } else {
      setPlayState("paused");
      clearTimeout(timeout.current);
      const init = nextTick.current === null;
      nextTick.current = init ? 1000 : 1000 - (Date.now() - secondStartedAt.current);
    }
  }, [playState, timeRemaining]);

  const togglePlayState = () => {
    if (togglePlayStateButton === "Encore !") return onReset();
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
            strokeOpacity="0.2"
            fill="none"
            className="timer-circle-bg"
            strokeWidth={stroke}
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - stroke / 2}
            ref={timerDOMRef}
            onAnimationEnd={() => {
              console.log("hein ?");
              setTimeRemaining(0);
              setPlayState("paused");
            }} // needed to be able to restart the animation
          />
          <circle
            stroke="currentColor"
            fill="none"
            className="timer-circle"
            strokeWidth={stroke}
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - stroke / 2}
            ref={timerDOMRef}
            onAnimationEnd={() => {
              // needed to be able to restart the animation
              if (playState !== "paused") {
                setTimeRemaining(0);
                setPlayState("paused");
              }
            }}
          />
        </svg>
        <span className="absolute">{display(timeRemaining, time)}</span>
      </div>
      <div className="-mt-6 flex w-full justify-between">
        <button
          className="h-16 w-16 rounded-full border border-app bg-white text-xs text-app"
          onClick={onReset}
        >
          Annuler
        </button>
        <button
          className="h-16 w-16 rounded-full border border-app bg-app text-xs text-white"
          onClick={togglePlayState}
        >
          {togglePlayStateButton}
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

export default TimerWrapper;
