import styles from "./TimerDisplay.module.css";

export type TimerDisplayProps = {
  phase: string;
  minutes: string;
  seconds: string;
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
};

export function TimerDisplay(props: TimerDisplayProps) {
  const { phase, minutes, seconds, isRunning, onToggle, onReset } = props;

  return (
    <section className={styles.display}>
      <div id="timer-label" className={styles.label}>
        {phase}
      </div>
      <div id="time-left" className={styles.numDisplay}>
        <span id="minutes">{minutes}</span>:<span id="seconds">{seconds}</span>
      </div>
      <button
        id="start_stop"
        type="button"
        className={styles.controlButton}
        onClick={onToggle}
        aria-label={isRunning ? "Pause timer" : "Start timer"}
      >
        {isRunning ? "\u23F8" : "\u25B6"}
      </button>
      <button
        id="reset"
        type="button"
        className={styles.controlButton}
        onClick={onReset}
        aria-label="Reset timer"
      >
        &#10226;
      </button>
    </section>
  );
}
