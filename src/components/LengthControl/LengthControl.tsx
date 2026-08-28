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
      <div id={labelId} className={styles.label}>
        {label}
      </div>
      <div id={displayId} className={styles.numDisplay}>
        {value}
      </div>
      <button
        id={incrementId}
        type="button"
        className={styles.stepButton}
        onClick={onIncrement}
        disabled={disabled}
        aria-label={`Increment ${label.toLowerCase()}`}
      >
        &#9650;
      </button>
      <button
        id={decrementId}
        type="button"
        className={styles.stepButton}
        onClick={onDecrement}
        disabled={disabled}
        aria-label={`Decrement ${label.toLowerCase()}`}
      >
        &#9660;
      </button>
    </section>
  );
}
