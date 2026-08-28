import { usePomodoroTimer } from "./hooks/usePomodoroTimer";
import { formatTime } from "./utils/format-time";
import { LengthControl } from "./components/LengthControl/LengthControl";
import { TimerDisplay } from "./components/TimerDisplay/TimerDisplay";
import styles from "./App.module.css";

function App() {
  const { state, audioRef, audioSrc, increment, decrement, toggleRunning, reset } =
    usePomodoroTimer();
  const { minutes, seconds } = formatTime(state.secondsRemaining);

  return (
    <main className={styles.main}>
      <audio id="beep" ref={audioRef} src={audioSrc} preload="auto" />

      <LengthControl
        label="Break Length"
        labelId="break-label"
        displayId="break-length"
        incrementId="break-increment"
        decrementId="break-decrement"
        value={state.breakLength}
        disabled={state.isRunning}
        onIncrement={() => increment("Break")}
        onDecrement={() => decrement("Break")}
      />

      <LengthControl
        label="Session Length"
        labelId="session-label"
        displayId="session-length"
        incrementId="session-increment"
        decrementId="session-decrement"
        value={state.sessionLength}
        disabled={state.isRunning}
        onIncrement={() => increment("Session")}
        onDecrement={() => decrement("Session")}
      />

      <TimerDisplay
        phase={state.phase}
        minutes={minutes}
        seconds={seconds}
        isRunning={state.isRunning}
        onToggle={toggleRunning}
        onReset={reset}
      />
    </main>
  );
}

export default App;
