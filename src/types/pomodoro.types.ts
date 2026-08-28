export type TimerPhase = "Session" | "Break";

export type TimerState = {
  breakLength: number;
  sessionLength: number;
  phase: TimerPhase;
  secondsRemaining: number;
  isRunning: boolean;
};

export type TimerAction =
  | { type: "INCREMENT"; phase: TimerPhase }
  | { type: "DECREMENT"; phase: TimerPhase }
  | { type: "TOGGLE_RUNNING" }
  | { type: "TICK" }
  | { type: "RESET" };
