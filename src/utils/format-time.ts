export type FormattedTime = {
  minutes: string;
  seconds: string;
};

/**
 * Formats a total-seconds count as zero-padded MM / SS strings.
 */
export function formatTime(totalSeconds: number): FormattedTime {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return { minutes, seconds };
}
