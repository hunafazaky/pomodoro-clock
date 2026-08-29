import styles from "./LengthControl.module.css";

export type LengthControlProps = {
  label: string;
  labelId: string;
  displayId: string;
  incrementId: string;
  decrementId: string;
  value: number;
  disabled: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
};

export function LengthControl(props: LengthControlProps) {
  const {
    label,
    labelId,
    displayId,
    incrementId,
    decrementId,
    value,
    disabled,
    onIncrement,
    onDecrement,
  } = props;

  return (
    <section className={styles.action}>
      <span id={labelId} className={styles.label}>
        {label}
      </span>
      <div className={styles.stepper}>
        <button
          id={decrementId}
          type="button"
          className={styles.stepButton}
          onClick={onDecrement}
          disabled={disabled}
          aria-label={`Decrement ${label.toLowerCase()}`}
        >
          <svg viewBox="0 0 24 24" className={styles.chevron} aria-hidden="true">
            <path
              d="M15 5 8 12l7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span id={displayId} className={styles.numDisplay}>
          {value}
        </span>
        <button
          id={incrementId}
          type="button"
          className={styles.stepButton}
          onClick={onIncrement}
          disabled={disabled}
          aria-label={`Increment ${label.toLowerCase()}`}
        >
          <svg viewBox="0 0 24 24" className={styles.chevron} aria-hidden="true">
            <path
              d="M9 5l7 7-7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
