import type { CSSProperties } from "react";
import { usePomodoroTimer } from "./hooks/usePomodoroTimer";
import { useTheme } from "./hooks/useTheme";
import { formatTime } from "./utils/format-time";
import { LengthControl } from "./components/LengthControl/LengthControl";
import { TimerDisplay } from "./components/TimerDisplay/TimerDisplay";
import { Controls } from "./components/Controls/Controls";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import styles from "./App.module.css";

function App() {
  const { state, audioRef, audioSrc, increment, decrement, toggleRunning, reset } =
    usePomodoroTimer();
  const { theme, toggleTheme } = useTheme();
  const { minutes, seconds } = formatTime(state.secondsRemaining);

  // Recolors the whole screen around whichever phase is active.
  const accentVars = {
    "--accent": state.phase === "Session" ? "var(--accent-session)" : "var(--accent-break)",
    "--accent-soft":
      state.phase === "Session" ? "var(--accent-session-soft)" : "var(--accent-break-soft)",
  } as CSSProperties;

  return (
    <div className={styles.app} style={accentVars}>
      <audio id="beep" ref={audioRef} src={audioSrc} preload="auto" />

      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <header className={styles.header}>
        <span className={styles.wordmark}>Pomodoro</span>
      </header>

      <div className={styles.main}>
        <TimerDisplay
          phase={state.phase}
          minutes={minutes}
          seconds={seconds}
          isRunning={state.isRunning}
        />

        <div className={styles.lengthGrid}>
          <LengthControl
            label="Session"
            labelId="session-label"
            displayId="session-length"
            incrementId="session-increment"
            decrementId="session-decrement"
            value={state.sessionLength}
            disabled={state.isRunning}
            onIncrement={() => increment("Session")}
            onDecrement={() => decrement("Session")}
          />
          <LengthControl
            label="Break"
            labelId="break-label"
            displayId="break-length"
            incrementId="break-increment"
            decrementId="break-decrement"
            value={state.breakLength}
            disabled={state.isRunning}
            onIncrement={() => increment("Break")}
            onDecrement={() => decrement("Break")}
          />
        </div>
      </div>

      <Controls isRunning={state.isRunning} onToggle={toggleRunning} onReset={reset} />
    </div>
  );
}

export default App;
