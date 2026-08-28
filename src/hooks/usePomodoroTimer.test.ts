import { describe, it, expect } from "bun:test";
import { createInitialState, pomodoroReducer } from "./usePomodoroTimer";

describe("pomodoroReducer", () => {
  it("starts with a 25 minute session", () => {
    const state = createInitialState();
    expect(state.sessionLength).toBe(25);
    expect(state.secondsRemaining).toBe(25 * 60);
    expect(state.phase).toBe("Session");
  });

  it("increments break length", () => {
    const next = pomodoroReducer(createInitialState(), { type: "INCREMENT", phase: "Break" });
    expect(next.breakLength).toBe(6);
  });

  it("does not decrement session length below 1", () => {
    const state = { ...createInitialState(), sessionLength: 1 };
    const next = pomodoroReducer(state, { type: "DECREMENT", phase: "Session" });
    expect(next.sessionLength).toBe(1);
  });

  it("does not increment break length above 60", () => {
    const state = { ...createInitialState(), breakLength: 60 };
    const next = pomodoroReducer(state, { type: "INCREMENT", phase: "Break" });
    expect(next.breakLength).toBe(60);
  });

  it("switches from Session to Break when time runs out", () => {
    const state = { ...createInitialState(), secondsRemaining: 0 };
    const next = pomodoroReducer(state, { type: "TICK" });
    expect(next.phase).toBe("Break");
    expect(next.secondsRemaining).toBe(next.breakLength * 60);
  });

  it("ignores length changes while running", () => {
    const state = { ...createInitialState(), isRunning: true };
    const next = pomodoroReducer(state, { type: "INCREMENT", phase: "Session" });
    expect(next).toEqual(state);
  });
});
