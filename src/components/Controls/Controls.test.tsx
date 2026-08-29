import { describe, it, expect } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { Controls } from "./Controls";

describe("Controls", () => {
  it("calls onToggle when start/pause is clicked", () => {
    let toggled = false;
    render(<Controls isRunning={false} onToggle={() => (toggled = true)} onReset={() => {}} />);
    fireEvent.click(screen.getByLabelText("Start timer"));
    expect(toggled).toBe(true);
  });

  it("calls onReset when reset is clicked", () => {
    let wasReset = false;
    render(<Controls isRunning={false} onToggle={() => {}} onReset={() => (wasReset = true)} />);
    fireEvent.click(screen.getByLabelText("Reset timer"));
    expect(wasReset).toBe(true);
  });

  it("shows Pause once running", () => {
    render(<Controls isRunning onToggle={() => {}} onReset={() => {}} />);
    expect(screen.getByLabelText("Pause timer")).toBeInTheDocument();
  });
});
