import { useEffect, useReducer, useRef } from "react";
import type { TimerAction, TimerPhase, TimerState } from "../types/pomodoro.types";

const MIN_LENGTH_MINUTES = 1;
const MAX_LENGTH_MINUTES = 60;
const DEFAULT_SESSION_MINUTES = 25;
const DEFAULT_BREAK_MINUTES = 5;
const BEEP_SRC = "https://assets.mixkit.co/active_storage/sfx/993/993-preview.mp3";

export function createInitialState(): TimerState {
  return {
    breakLength: DEFAULT_BREAK_MINUTES,
    sessionLength: DEFAULT_SESSION_MINUTES,
    phase: "Session",
    secondsRemaining: DEFAULT_SESSION_MINUTES * 60,
    isRunning: false,
  };
}

function lengthKey(phase: TimerPhase): "sessionLength" | "breakLength" {
  return phase === "Session" ? "sessionLength" : "breakLength";
}

export function pomodoroReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case "INCREMENT":
    case "DECREMENT": {
      if (state.isRunning) return state;
      const key = lengthKey(action.phase);
      const delta = action.type === "INCREMENT" ? 1 : -1;
      const nextValue = Math.min(
        MAX_LENGTH_MINUTES,
        Math.max(MIN_LENGTH_MINUTES, state[key] + delta),
      );
      const isEditingCurrentPhase = state.phase === action.phase;
      return {
        ...state,
        [key]: nextValue,
        secondsRemaining: isEditingCurrentPhase ? nextValue * 60 : state.secondsRemaining,
      };
    }
    case "TOGGLE_RUNNING":
      return { ...state, isRunning: !state.isRunning };
    case "TICK": {
      if (state.secondsRemaining > 0) {
        return { ...state, secondsRemaining: state.secondsRemaining - 1 };
      }
      const nextPhase: TimerPhase = state.phase === "Session" ? "Break" : "Session";
      const nextLengthMinutes = state[lengthKey(nextPhase)];
      return { ...state, phase: nextPhase, secondsRemaining: nextLengthMinutes * 60 };
    }
    case "RESET":
      return createInitialState();
    default:
      return state;
  }
}

/**
 * Owns the full Session/Break timer state machine: countdown ticking,
 * automatic phase switching, and the beep cue on each switch.
 */
export function usePomodoroTimer() {
  const [state, dispatch] = useReducer(pomodoroReducer, undefined, createInitialState);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isFirstRender = useRef(true);

  // Countdown: ticks once a second while running.
  useEffect(() => {
    if (!state.isRunning) return;
    const intervalId = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => clearInterval(intervalId);
  }, [state.isRunning]);

  // Beep once whenever the phase switches (skip the very first render).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Autoplay can be blocked until the user interacts with the page;
      // harmless to ignore since Start is itself a user gesture.
    });
  }, [state.phase]);

  function toggleRunning() {
    // "Unlocks" audio playback on this user gesture so the later,
    // interval-triggered play() call on phase switch isn't blocked by
    // the browser's autoplay policy.
    audioRef.current?.play().catch(() => {});
    audioRef.current?.pause();
    dispatch({ type: "TOGGLE_RUNNING" });
  }

  function reset() {
    dispatch({ type: "RESET" });
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  return {
    state,
    audioRef,
    audioSrc: BEEP_SRC,
    increment: (phase: TimerPhase) => dispatch({ type: "INCREMENT", phase }),
    decrement: (phase: TimerPhase) => dispatch({ type: "DECREMENT", phase }),
    toggleRunning,
    reset,
  };
}
