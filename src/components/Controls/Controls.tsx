import styles from "./Controls.module.css";

export type ControlsProps = {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
};

export function Controls({ isRunning, onToggle, onReset }: ControlsProps) {
  return (
    <div className={styles.controls}>
      <button
        id="reset"
        type="button"
        className={styles.resetButton}
        onClick={onReset}
        aria-label="Reset timer"
      >
        Reset
      </button>
      <button
        id="start_stop"
        type="button"
        className={styles.primaryButton}
        onClick={onToggle}
        aria-label={isRunning ? "Pause timer" : "Start timer"}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
}
