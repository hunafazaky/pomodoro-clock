import styles from "./TimerDisplay.module.css";

export type TimerDisplayProps = {
  phase: string;
  minutes: string;
  seconds: string;
  isRunning: boolean;
};

export function TimerDisplay({ phase, minutes, seconds, isRunning }: TimerDisplayProps) {
  return (
    <div className={styles.wrapper} data-running={isRunning}>
      <div className={styles.glow} aria-hidden="true" />
      <p id="timer-label" className={styles.label}>
        {phase}
      </p>
      <p id="time-left" className={styles.time}>
        <span id="minutes">{minutes}</span>
        <span className={styles.colon}>:</span>
        <span id="seconds">{seconds}</span>
      </p>
    </div>
  );
}
