import { describe, it, expect } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { TimerDisplay } from "./TimerDisplay";

describe("TimerDisplay", () => {
  it("shows the formatted time and phase", () => {
    render(
      <TimerDisplay
        phase="Session"
        minutes="25"
        seconds="00"
        isRunning={false}
        onToggle={() => {}}
        onReset={() => {}}
      />,
    );
    expect(screen.getByText("Session")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("00")).toBeInTheDocument();
  });

  it("calls onToggle when start/stop is clicked", () => {
    let toggled = false;
    render(
      <TimerDisplay
        phase="Session"
        minutes="25"
        seconds="00"
        isRunning={false}
        onToggle={() => (toggled = true)}
        onReset={() => {}}
      />,
    );
    fireEvent.click(screen.getByLabelText("Start timer"));
    expect(toggled).toBe(true);
  });

  it("calls onReset when reset is clicked", () => {
    let wasReset = false;
    render(
      <TimerDisplay
        phase="Session"
        minutes="25"
        seconds="00"
        isRunning={false}
        onToggle={() => {}}
        onReset={() => (wasReset = true)}
      />,
    );
    fireEvent.click(screen.getByLabelText("Reset timer"));
    expect(wasReset).toBe(true);
  });
});
